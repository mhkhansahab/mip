import { toast } from "react-toastify";
// import store from "../store";
// import { io } from "socket.io-client";
// import { getWhitelistStatus } from "./../../functions";

const connectRequest = () => {
  return {
    type: "WSS_CONNECTION_REQUEST",
  };
};

const connectSuccess = (payload) => {
  return {
    type: "WSS_CONNECTION_SUCCESS",
    payload: payload,
  };
};

const fetchWhitelistDataSucceed = (payload) => {
  return {
    type: "WSS_CHECK_DATA_SUCCESS",
    payload: payload,
  };
};

// const disconnected = (payload) => {
//   return {
//     type: "WSS_DISCONNECTED",
//     payload: payload,
//   };
// };

const connectFailed = (payload) => {
  return {
    type: "WSS_CONNECTION_FAILED",
    payload: payload,
  };
};



export const startWebsocket = (/*account*/) => {
  return async (dispatch) => {
    dispatch(connectRequest());


   

    dispatch(
      connectSuccess({
        socket: null,
      })
    );

    try {
      dispatch(
        fetchWhitelistDataSucceed({
          // whitelistData: getWhitelistStatus(account),
        })
      );



      // const socket = await socketConnection(account);

      // socket.on("whitelist", (_whitelistData) => {
      //   dispatch(
      //     fetchWhitelistDataSucceed({
      //       whitelistData: _whitelistData,
      //     })
      //   );
      // });

      // socket.on("connect", () => {
      //   if (!websocket.dataReceived) {
      //     dispatch(
      //       connectSuccess({
      //         socket: socket,
      //       })
      //     );
      //   }
      // });

      // socket.on("disconnect", () => {
      //   
      //   dispatch(
      //     disconnected()
      //   );
      // });
    } catch (err) {
      toast.error("Something went wrong.");
      dispatch(connectFailed("Something went wrong."));
    }
  }
};

// async function socketConnection(wallet) {
//   const serverConfig = await fetch("/config/serverConfig.json", {
//     headers: {
//       "Content-Type": "application/json",
//       Accept: "application/json",
//     },
//   });
//   const SERVER_CONFIG = await serverConfig.json();

//   const socket = io(SERVER_CONFIG.WSS_URI, {
//     auth: {
//       username: "piolino",
//       password: "piolidino",
//     },
//     // cors: {
//     //   origin: WSS_URI,
//     // },
//     // transports: ["websocket"],
//     query: {
//       wallet: wallet,
//     }
//   });

//   return socket;
// }

// async function closeSocket(socket) {
//   socket.close();
// }