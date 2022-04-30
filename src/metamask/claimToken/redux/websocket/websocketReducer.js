const initialState = {
  loading: false,
  wssConnected: false,
  dataReceived: false,
  errorMsg: "",

  socket: null,
  whitelistData: {proof: [], whitelistIndex: -2},
};

const websocketReducer = (state = initialState, action) => {
  switch (action.type) {
    case "WSS_CONNECTION_REQUEST":
      return {
        ...initialState,
        loading: true,
        wssConnected: false,
        dataReceived: false,
      };
    case "WSS_CONNECTION_SUCCESS":
      return {
        ...state,
        loading: false,
        wssConnected: true,
        dataReceived: false,

        socket: action.payload.socket,
      };
    case "WSS_CHECK_DATA_SUCCESS":
      return {
        ...state,
        loading: false,
        wssConnected: true,
        dataReceived: true,

        whitelistData: action.payload.whitelistData,
      };
    case "WSS_DISCONNECTED":
      return {
        ...state,
        loading: false,
        wssConnected: false,
      };
    case "WSS_CONNECTION_FAILED":
      return {
        ...initialState,
        loading: false,
        data: false,
        errorMsg: action.payload,
      };
    default:
      return state;
  }
};

export default websocketReducer;
