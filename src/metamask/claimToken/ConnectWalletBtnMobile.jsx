import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { connect } from "./redux/blockchain/blockchainActions";
import { fetchData } from "./redux/data/dataActions";
import { startWebsocket } from "./redux/websocket/websocketActions";

function ConnectWalletBtn() {
  const dispatch = useDispatch();
  const blockchain = useSelector(state => state.blockchain);
  const data = useSelector(state => state.data);
  const websocket = useSelector(state => state.websocket);

  const getData = () => {
    if (blockchain.account != null && blockchain.smartPassesContract) {
      if (!data.loaded) {
        dispatch(fetchData(blockchain.account));
      }
      if (!websocket.wssConnected && !websocket.loading) {
        dispatch(startWebsocket(blockchain.account));
      }
    }
  };
  useEffect(() => {
    getData();
  }, [blockchain.account]);

  const connectWallet = e => {
    e.preventDefault();
    dispatch(connect());
    getData();
  };

  function shortWallet(wallet) {
    return wallet.slice(0, 7) + "..." + wallet.slice(-7);
  }

  return (
    <div className="small__connect" data-aos="fade-up" data-aos-duration="800">
      <a
        href="#!"
        disabled={blockchain.account == null ? 0 : 1}
        onClick={connectWallet}
      >
        {blockchain.account == null
          ? "Connect Wallet"
          : shortWallet(blockchain.account)}
      </a>
    </div>
  );
}

export default ConnectWalletBtn;
