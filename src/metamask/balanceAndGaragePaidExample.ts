import detectEthereumProvider from "@metamask/detect-provider";
import { Contract } from "web3-eth-contract";
import { AbiItem } from "web3-utils";
import Web3 from "web3";
import mechIdentityProtocolConfigDev from "./config/mechIdentityProtocolConfigDev.json";
import mechIdentityProtocolABI from "./config/mechIdentityProtocolABI.json";
import authHeader from "../utils/auth-header";
import { apiRoute } from "../utils/api";

interface BlockchainObject {
  account: string;
  mipContract: Contract;
  smartPassesContract: Contract;
  web3: Web3;
  ethereum: any;
}

let web3Object: BlockchainObject;

async function getABI() {
  const abiPassesResponse = await fetch(`${apiRoute}/blender/abi`, {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      authtoken: authHeader()?.authtoken || "",
    },
  });
  const configFiles = await abiPassesResponse.json();
  return configFiles;
}

export async function connect() {
  const configFiles = await getABI();
  const abiPasses = configFiles.abiJSON;
  const CONFIG_PASSES = {
    ...configFiles.configJSON,
    CONTRACT_ADDRESS: "0xECCb9844227aac29052ea59479aAB3864a4634d7",
  };

  const ethereum: any = await detectEthereumProvider();
  const metamaskIsInstalled = ethereum && ethereum["isMetaMask"];

  if (metamaskIsInstalled) {
    const web3 = new Web3(ethereum);
    web3.setProvider(ethereum);
    try {
      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });

      const networkId = await ethereum.request({
        method: "net_version",
      });

      // WE NEED USE == because networkId have not the same type
      // eslint-disable-next-line eqeqeq
      if (networkId == mechIdentityProtocolConfigDev.NETWORK.ID) {
        const SmartContractMechIdentityProtocolObj = new web3.eth.Contract(
          mechIdentityProtocolABI as AbiItem[],
          mechIdentityProtocolConfigDev.CONTRACT_ADDRESS,
        );

        // const MIPWhitelistsObj = new web3.eth.Contract(
        //   WHITELIST_ABI,
        //   CONFIG_WHITELISTS.CONTRACT_ADDRESS
        // );

        const SmartContractPassesObj = new web3.eth.Contract(
          abiPasses,
          CONFIG_PASSES.CONTRACT_ADDRESS,
        );

        web3Object = {
          account: accounts[0],
          mipContract: SmartContractMechIdentityProtocolObj,
          smartPassesContract: SmartContractPassesObj,
          //mipWhitelistsContract: MIPWhitelistsObj,
          web3: web3,
          ethereum: ethereum,
        };
      } else {
        console.log(
          `Change network to ${mechIdentityProtocolConfigDev.NETWORK.NAME}.`,
        );
      }
    } catch (err) {
      console.log(err);
    }
  } else {
    console.log("Install Metamask.");
  }
}

export async function getWalletBalanceEth() {
  web3Object.web3.eth.getBalance(
    web3Object.account,
    function (err: any, result: any) {
      if (err) {
        console.log(err);
      } else {
        console.log(web3Object.web3.utils.fromWei(result, "ether") + " ETH");
      }
    },
  );
}

export async function isGaragePaid() {
  const userInfo = await web3Object?.mipContract.methods
    .userInfo(web3Object.account)
    .call({ from: web3Object.account });

  return userInfo?.garageOperationPaid;
}

export const startPayment = async () => {
  const sender = web3Object.account;

  try {
    const prices = await web3Object.mipContract.methods.prices().call();
    const garagePrice = prices.garagePrice;

    await web3Object.mipContract.methods.payGarageOperation().send({
      from: sender,
      value: garagePrice,
    });
  } catch (e) {
    console.log("payment fail!");
    console.log(e);
  }
};

export const ticketPay = async (seasonPassId: number) => {
  const sender = web3Object.account;
  const mintAmount = 1;
  const configFiles = await getABI();
  const CONFIG_PASSES = {
    ...configFiles.configJSON,
    CONTRACT_ADDRESS: "0xECCb9844227aac29052ea59479aAB3864a4634d7",
  };

  console.log("CONFIG_PASSES", CONFIG_PASSES);

  // -------GAS START--------
  // -------GAS START--------
  const cost = await web3Object.smartPassesContract.methods
    .getMintPrice(String(seasonPassId))
    .call({ from: sender }); // <= Change on different scenarios

  console.log("COST", cost);
  const totalCostWei = String(cost * mintAmount);

  console.log("totalCost", totalCostWei);

  // Check block gas limit
  const txnGasCost = await web3Object.smartPassesContract.methods
    .claim(seasonPassId, mintAmount)
    .estimateGas({
      to: CONFIG_PASSES.CONTRACT_ADDRESS,
      from: sender,
      value: String(totalCostWei),
    });

  let gasLimit;
  if (CONFIG_PASSES.USE_CONFIG_GAS_LIMIT) {
    gasLimit = CONFIG_PASSES.GAS_LIMIT * mintAmount;
  } else {
    gasLimit = Math.ceil(txnGasCost * 1.2);
  }
  // -------GAS END--------
  // -------GAS END--------

  try {
    await web3Object.smartPassesContract.methods
      .claim(seasonPassId, mintAmount)
      .send({
        gas: gasLimit,
        to: CONFIG_PASSES.CONTRACT_ADDRESS,
        from: sender,
        value: totalCostWei,
      });
  } catch (e) {
    console.log("payment ticket fail!");
    console.log(e);
  }
};
