import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { connect } from "./redux/blockchain/blockchainActions";
import { fetchData } from "./redux/data/dataActions";
import { startWebsocket } from "./redux/websocket/websocketActions";
import { toast } from "react-toastify";
import { isDevelopmentBuild } from "./functions";
import { PREMIUM_SEASON_PASS_ID } from "./constants";

function ClaimTokenSection() {
  const dispatch = useDispatch();
  const blockchain = useSelector(state => state.blockchain);
  const data = useSelector(state => state.data);
  const websocket = useSelector(state => state.websocket);

  const mintAmount = 1;

  const [CONFIG, SET_CONFIG] = useState({
    CONTRACT_ADDRESS: "",
    SCAN_LINK: "",
    NETWORK: {
      NAME: "",
      SYMBOL: "",
      ID: 0,
    },
    NFT_NAME: "",
    SYMBOL: "",
    GAS_LIMIT: 0,
    CRITICAL_GAS_LIMIT: 400000,
    USE_CONFIG_GAS_LIMIT: true,
    MARKETPLACE: "",
    MARKETPLACE_LINK: "",
  });

  useEffect(() => {
    getConfig();
    getData();
  }, [blockchain.account]);
  const isTxnGasCostLowerThanBlockGasLimit = async operationGasCost => {
    const lastBlockGasLimit = await blockchain.web3.eth.getBlock("latest")
      .gasLimit;
    if (lastBlockGasLimit < operationGasCost) return false;
    return true;
  };

  async function getTxnGasCost(value) {
    return blockchain.smartPassesContract.methods
      .claim(PREMIUM_SEASON_PASS_ID, mintAmount)
      .estimateGas({
        to: CONFIG.CONTRACT_ADDRESS,
        from: blockchain.account,
        value: String(value),
      });
  }

  async function doTxn(gasLimit, value) {
    return await blockchain.smartPassesContract.methods
      .claim(PREMIUM_SEASON_PASS_ID, mintAmount)
      .send({
        gas: String(gasLimit),
        to: CONFIG.CONTRACT_ADDRESS,
        from: blockchain.account,
        value: String(value),
      });
  }

  const claimNFTs = async () => {
    try {
      const cost = data.getMintPricePremium; // <= Change on different scenarios

      const totalCostWei = String(cost * mintAmount);

      // Check block gas limit
      const txnGasCost = await getTxnGasCost(totalCostWei);

      if (!isTxnGasCostLowerThanBlockGasLimit(txnGasCost)) {
        toast.info(
          "Eth block gas lower than operation. Please, Wait a few minutes.",
        );
        return;
      }

      // Get gas limit from config or from Txn cost
      const useConfigGasLimit = CONFIG.USE_CONFIG_GAS_LIMIT;
      let gasLimit;
      if (useConfigGasLimit) {
        gasLimit = CONFIG.GAS_LIMIT * mintAmount;
      } else {
        gasLimit = Math.ceil(txnGasCost * 1.2);
      }

      await doTxn(gasLimit, totalCostWei);

      toast.success(`The MIP Ticket is yours! go visit Opensea.io to view it.`);
      dispatch(fetchData(blockchain.account));
    } catch (err) {
      const errorMessage = err.message ?? "";
      if (
        errorMessage !=
        "MetaMask Tx Signature: User denied transaction signature."
      ) {
      }

      if (err.code != null) {
        if (err.code == -32000) {
          toast.warn("Insufficient funds.");
        }
      }
    }
  };

  const getData = () => {
    if (blockchain.account != null && blockchain.smartPassesContract !== null) {
      if (!data.loaded) {
        dispatch(fetchData(blockchain.account));
      }
      if (!websocket.wssConnected && !websocket.loading) {
        dispatch(startWebsocket(blockchain.account));
      }
    }
  };

  const getConfig = async () => {
    const isDevBuild = isDevelopmentBuild();
    const configResponse = await fetch(
      isDevBuild
        ? "/config/mipTicketsConfigDev.json"
        : "/config/mipTicketsConfigProd.json",
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      },
    );

    const config = await configResponse.json();
    SET_CONFIG(config);
  };

  const connectWallet = e => {
    isDevelopmentBuild();
    e.preventDefault();
    dispatch(connect());
    getData();
  };

  const claimPass = e => {
    e.preventDefault();
    claimNFTs().then(() => getData());
  };

  const getButtonText = () => {
    if (blockchain.account == null) return "Connect Wallet";
    if (blockchain.account != null && data.loading) return "Loading…";
    if (data.userPassesLeftPremium == 0) return "Already Bought";
    if (!data.passesAvailablePremium) return "Sold Out";
    if (!data.openPremium) return "Sale is Closed";
    return "Buy now for 0.099 ETH ";
  };

  // const isMintAvailable = () => {
  //     return !(blockchain.account == null||data.userPassesLeftPremium == 0||!data.passesAvailablePremium||!data.openPremium);
  // };

  const onClickBtn = e => {
    if (
      blockchain.account != null &&
      (data.loading ||
        !data.passesAvailablePremium ||
        !data.openPremium ||
        data.userPassesLeftPremium == 0)
    )
      return;
    blockchain.account == null ? connectWallet(e) : claimPass(e);
  };
  return (
    <div className="pass__button">
      <a href="#!" onClick={onClickBtn}>
        {getButtonText()}
        <span>
          <img src="img/ethicon.svg" alt="ethicon" />
        </span>
      </a>
    </div>
  );
}

export default ClaimTokenSection;
