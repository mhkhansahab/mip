import Web3EthContract from "web3-eth-contract";
import Web3 from "web3";
import { fetchData } from "../data/dataActions";
import { startWebsocket } from "../websocket/websocketActions";
import { toast } from "react-toastify";
import { isDevelopmentBuild } from "../../functions";
import detectEthereumProvider from "@metamask/detect-provider";

const connectRequest = () => {
  return {
    type: "CONNECTION_REQUEST",
  };
};

const connectSuccess = (payload) => {
  return {
    type: "CONNECTION_SUCCESS",
    payload: payload,
  };
};

const connectFailed = (payload) => {
  return {
    type: "CONNECTION_FAILED",
    payload: payload,
  };
};

const updateAccountRequest = (payload) => {
  return {
    type: "UPDATE_ACCOUNT",
    payload: payload,
  };
};

export const connect = () => {
  return async (dispatch) => {
    dispatch(connectRequest());
    //ABI y Config PASSES
    const abiPassesResponse = await fetch("/config/mipTicketsABI.json", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    const abiPasses = await abiPassesResponse.json();

    const isDevBuild = isDevelopmentBuild();
    const configPassesResponse = await fetch(isDevBuild
      ? "/config/mipTicketsConfigDev.json"
      : "/config/mipTicketsConfigProd.json", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    const CONFIG_PASSES = await configPassesResponse.json();

    // Whitelist variables
    const abiWhitelistsResponse = await fetch("/config/mipWhitelistsABI.json", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    const WHITELIST_ABI = await abiWhitelistsResponse.json();
    const configWhitelistsResponse = await fetch(isDevBuild
      ? "/config/mipWhitelistsConfigDev.json"
      : "/config/mipWhitelistsConfigProd.json", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    const CONFIG_WHITELISTS = await configWhitelistsResponse.json();

    // MIP Contract variables
    const abiMechIdentityProtocolResponse = await fetch("/config/mechIdentityProtocolABI.json", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    const abiMechIdentityProtocol = await abiMechIdentityProtocolResponse.json();

    const configMechIdentityProtocolResponse = await fetch(isDevBuild
      ? "/config/mechIdentityProtocolConfigDev.json"
      : "/config/mechIdentityProtocolConfigProd.json", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    const CONFIGMechIdentityProtocol = await configMechIdentityProtocolResponse.json();

    // const { ethereum } = window;
    const ethereum = await detectEthereumProvider();
    const metamaskIsInstalled = ethereum && ethereum.isMetaMask;
    if (metamaskIsInstalled) {
      Web3EthContract.setProvider(ethereum);
      let web3 = new Web3(ethereum);
      try {
        const accounts = await ethereum.request({
          method: "eth_requestAccounts",
        });
        const networkId = await ethereum.request({
          method: "net_version",
        });
        if (networkId == CONFIG_PASSES.NETWORK.ID) {
          const SmartContractPassesObj = new Web3EthContract(
            abiPasses,
            CONFIG_PASSES.CONTRACT_ADDRESS
          );
          const MIPWhitelistsObj = new Web3EthContract(
            WHITELIST_ABI,
            CONFIG_WHITELISTS.CONTRACT_ADDRESS
          );
          const SmartContractMechIdentityProtocolObj = new Web3EthContract(
            abiMechIdentityProtocol,
            CONFIGMechIdentityProtocol.CONTRACT_ADDRESS
          );
          
          dispatch(
            connectSuccess({
              account: accounts[0],
              smartPassesContract: SmartContractPassesObj,
              mipWhitelistsContract: MIPWhitelistsObj,
              mipContract: SmartContractMechIdentityProtocolObj,
              web3: web3,
            })
          );
          // Add listeners start
          ethereum.on("accountsChanged", (accounts) => {
            dispatch(updateAccount(accounts[0]));
          });
          ethereum.on("chainChanged", () => {
            window.location.reload();
          });
          // Add listeners end
        } else {
          toast.info(`Change network to ${CONFIG_PASSES.NETWORK.NAME}.`);
          dispatch(connectFailed(`Change network to ${CONFIG_PASSES.NETWORK.NAME}.`));
        }
      } catch (err) {
        toast.error("Something went wrong.");
        dispatch(connectFailed("Something went wrong."));
      }
    } else {
      toast.info("Install Metamask.");
      dispatch(connectFailed("Install Metamask."));
    }
  };
};

export const updateAccount = (account) => {
  return async (dispatch) => {
    dispatch(updateAccountRequest({ account: account }));
    dispatch(fetchData(account));
    dispatch(startWebsocket(account));
  };
};
