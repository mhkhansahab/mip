const initialState = {
  loading: false,
  account: null,
  errorMsg: "",
  
  smartPassesContract: null,
  mipWhitelistsContract: null,
  mipContract: null,
  web3: null,
};

const blockchainReducer = (state = initialState, action) => {
  switch (action.type) {
    case "CONNECTION_REQUEST":
      return {
        ...initialState,
        loading: true,
      };
    case "CONNECTION_SUCCESS":
      return {
        ...state,
        loading: false,
        
        account: action.payload.account,
        smartPassesContract: action.payload.smartPassesContract,
        mipWhitelistsContract: action.payload.mipWhitelistsContract,
        mipContract: action.payload.mipContract,
        web3: action.payload.web3,
      };
    case "CONNECTION_FAILED":
      return {
        ...initialState,
        loading: false,
        errorMsg: action.payload,
      };
    case "UPDATE_ACCOUNT":
      return {
        ...state,
        account: action.payload.account,
      };
    default:
      return state;
  }
};

export default blockchainReducer;
