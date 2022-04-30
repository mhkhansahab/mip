import {
  PET_PASS_TOTAL_SUPPLY, BODY_TICKET_TOTAL_SUPPLY,
  PREMIUM_SEASON_PASS_TOTAL_SUPPLY, PET_PASS_TOTAL_WEI_COST,
  BODY_TICKET_TOTAL_WEI_COST, PREMIUM_SEASON_PASS_WEI_COST,
  PASSPORT_TOTAL_SUPPLY, PASSPORT_WEI_COST,
} from "../../constants";

const initialState = {
  loading: false,
  error: false,
  errorMsg: "",
  loaded: false,

  userPassesLeftBody: 1,
  userPassesLeftPet: 1,
  userPassesLeftPremium: 1,
  userPassesLeftPassport: 1,
  amIWhitelisted: false,
  passesAvailableBody: false,
  passesAvailablePet: false,
  passesAvailablePremium: false,
  passesAvailablePassport: false,
  totalSupplyBody: 0,
  totalSupplyPet: 0,
  totalSupplyPremium: 0,
  totalSupplyPassport: 0,
  totalPassAmountBody: BODY_TICKET_TOTAL_SUPPLY,
  totalPassAmountPet: PET_PASS_TOTAL_SUPPLY,
  totalPassAmountPremium: PREMIUM_SEASON_PASS_TOTAL_SUPPLY,
  totalPassAmountPassport: PASSPORT_TOTAL_SUPPLY,
  getMintPriceBody: BODY_TICKET_TOTAL_WEI_COST,
  getMintPricePet: PET_PASS_TOTAL_WEI_COST,
  getMintPricePremium: PREMIUM_SEASON_PASS_WEI_COST,
  getMintPricePassport: PASSPORT_WEI_COST,
  openBody: false,
  openPet: false,
  openPremium: false,
  openPassport: false,
  goldenHeadTicketsLeft: 0,
  premiumPassTicketsOwned: 0,
  balanceOfBodyPass: 0,
  balanceOfPetPass: 0,
  tokensTotalSupply: [0, 0, 0, 0],
  contractInfo: {},
  openStatus: [false, false, false, false, false, false, false, false],
  userInfoMainContract: {
    headMipsDirectlyClaimed: 1,
    bodyMipsDirectlyClaimed: 1,
    garageOperationPaid: false,
  },
  userInfo: null,
};

const dataReducer = (state = initialState, action) => {
  switch (action.type) {
    case "CHECK_DATA_REQUEST":
      return {
        ...state,
        loading: true,
        error: false,
        errorMsg: "",
        loaded: false,
      };
    case "CHECK_DATA_SUCCESS":
      return {
        ...state,
        loading: false,
        error: false,
        errorMsg: "",
        loaded: true,

        openBody: action.payload.openBody,
        openPet: action.payload.openPet,
        openPremium: action.payload.openPremium,
        openPassport: action.payload.openPassport,
        userPassesLeftBody: action.payload.userPassesLeftBody,
        userPassesLeftPet: action.payload.userPassesLeftPet,
        userPassesLeftPremium: action.payload.userPassesLeftPremium,
        userPassesLeftPassport: action.payload.userPassesLeftPassport,
        amIWhitelisted: action.payload.amIWhitelisted,
        passesAvailableBody: action.payload.passesAvailableBody,
        passesAvailablePet: action.payload.passesAvailablePet,
        passesAvailablePremium: action.payload.passesAvailablePremium,
        passesAvailablePassport: action.payload.passesAvailablePassport,
        totalSupplyBody: action.payload.totalSupplyBody,
        totalSupplyPet: action.payload.totalSupplyPet,
        totalSupplyPremium: action.payload.totalSupplyPremium,
        totalSupplyPassport: action.payload.totalSupplyPassport,
        totalPassAmountBody: action.payload.totalPassAmountBody,
        totalPassAmountPet: action.payload.totalPassAmountPet,
        totalPassAmountPremium: action.payload.totalPassAmountPremium,
        totalPassAmountPassport: action.payload.totalPassAmountPassport,
        getMintPriceBody: action.payload.getMintPriceBody,
        getMintPricePet: action.payload.getMintPricePet,
        getMintPricePremium: action.payload.getMintPricePremium,
        getMintPricePassport: action.payload.getMintPricePassport,
        goldenHeadTicketsLeft: action.payload.goldenHeadTicketsLeft,
        premiumPassTicketsOwned: action.payload.premiumPassTicketsOwned,
        balanceOfBodyPass: action.payload.balanceOfBodyPass,
        balanceOfPetPass: action.payload.balanceOfPetPass,
        tokensTotalSupply: action.payload.tokensTotalSupply,
        contractInfo: action.payload.contractInfo,
        openStatus: action.payload.openStatus,
        userInfoMainContract: action.payload.userInfoMainContract,
        userInfo: action.payload.userInfo,
      };
    case "CHECK_DATA_FAILED":
      return {
        ...initialState,
        loading: false,
        error: true,
        errorMsg: action.payload,
        loaded: false,
      };
    default:
      return state;
  }
};

export default dataReducer;
