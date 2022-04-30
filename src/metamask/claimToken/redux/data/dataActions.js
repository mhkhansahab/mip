// log
import { toast } from "react-toastify";
import store from "../store";
import { GOLDEN_TICKET_ID, PET_PASS_ID, BODY_TICKET_ID, PREMIUM_SEASON_PASS_ID, PASSPORT_ID } from "../../constants";

const fetchDataRequest = () => {
  return {
    type: "CHECK_DATA_REQUEST",
  };
};

const fetchDataSuccess = (payload) => {
  return {
    type: "CHECK_DATA_SUCCESS",
    payload: payload,
  };
};

const fetchDataFailed = (payload) => {
  return {
    type: "CHECK_DATA_FAILED",
    payload: payload,
  };
};

export const fetchData = () => {
  return async (dispatch) => {
    dispatch(fetchDataRequest());
    try {
      const account = (await store.getState().blockchain.account) || "0x0";

      let openBody = await store
        .getState()
        .blockchain.smartPassesContract.methods.isSaleOpen(BODY_TICKET_ID)
        .call();
      let openPet = await store
        .getState()
        .blockchain.smartPassesContract.methods.isSaleOpen(PET_PASS_ID)
        .call();
      let openPremium = await store
        .getState()
        .blockchain.smartPassesContract.methods.isSaleOpen(PREMIUM_SEASON_PASS_ID)
        .call();
      let openPassport = await store
        .getState()
        .blockchain.smartPassesContract.methods.isSaleOpen(PASSPORT_ID)
        .call();

      let userPassesLeftBody = await store
        .getState()
        .blockchain.smartPassesContract.methods.getUserPassesLeft(BODY_TICKET_ID)
        .call(store.getState().blockchain.account != null
          ? { 'from': store.getState().blockchain.account }
          : {}
        );
      let userPassesLeftPet = await store
        .getState()
        .blockchain.smartPassesContract.methods.getUserPassesLeft(PET_PASS_ID)
        .call(store.getState().blockchain.account != null
          ? { 'from': store.getState().blockchain.account }
          : {}
        );
      let userPassesLeftPremium = await store
        .getState()
        .blockchain.smartPassesContract.methods.getUserPassesLeft(PREMIUM_SEASON_PASS_ID)
        .call(store.getState().blockchain.account != null
          ? { 'from': store.getState().blockchain.account }
          : {}
        );
      let userPassesLeftPassport = await store
        .getState()
        .blockchain.smartPassesContract.methods.getUserPassesLeft(PASSPORT_ID)
        .call(store.getState().blockchain.account != null
          ? { 'from': store.getState().blockchain.account }
          : {}
        );

      let amIWhitelisted = await store
        .getState()
        .blockchain.smartPassesContract.methods.amIWhitelisted(GOLDEN_TICKET_ID)
        .call(store.getState().blockchain.account != null
          ? { 'from': store.getState().blockchain.account }
          : {}
        );

      let passesAvailableBody = await store
        .getState()
        .blockchain.smartPassesContract.methods.arePassesAvailable(BODY_TICKET_ID)
        .call(store.getState().blockchain.account != null
          ? { 'from': store.getState().blockchain.account }
          : {}
        );
      let passesAvailablePet = await store
        .getState()
        .blockchain.smartPassesContract.methods.arePassesAvailable(PET_PASS_ID)
        .call(store.getState().blockchain.account != null
          ? { 'from': store.getState().blockchain.account }
          : {}
        );
      let passesAvailablePremium = await store
        .getState()
        .blockchain.smartPassesContract.methods.arePassesAvailable(PREMIUM_SEASON_PASS_ID)
        .call(store.getState().blockchain.account != null
          ? { 'from': store.getState().blockchain.account }
          : {}
        );
      let passesAvailablePassport = await store
        .getState()
        .blockchain.smartPassesContract.methods.arePassesAvailable(PASSPORT_ID)
        .call(store.getState().blockchain.account != null
          ? { 'from': store.getState().blockchain.account }
          : {}
        );

      let totalSupplyBody = await store
        .getState()
        .blockchain.smartPassesContract.methods.totalSupply(BODY_TICKET_ID)
        .call();
      let totalSupplyPet = await store
        .getState()
        .blockchain.smartPassesContract.methods.totalSupply(PET_PASS_ID)
        .call();
      let totalSupplyPremium = await store
        .getState()
        .blockchain.smartPassesContract.methods.totalSupply(PREMIUM_SEASON_PASS_ID)
        .call();
      let totalSupplyPassport = await store
        .getState()
        .blockchain.smartPassesContract.methods.totalSupply(PASSPORT_ID)
        .call();

      let totalPassAmountBody = await store
        .getState()
        .blockchain.smartPassesContract.methods.getTotalPassAmount(BODY_TICKET_ID)
        .call();
      let totalPassAmountPet = await store
        .getState()
        .blockchain.smartPassesContract.methods.getTotalPassAmount(PET_PASS_ID)
        .call();
      let totalPassAmountPremium = await store
        .getState()
        .blockchain.smartPassesContract.methods.getTotalPassAmount(PREMIUM_SEASON_PASS_ID)
        .call();
      let totalPassAmountPassport = await store
        .getState()
        .blockchain.smartPassesContract.methods.getTotalPassAmount(PASSPORT_ID)
        .call();
      let getMintPriceBody = await store
        .getState()
        .blockchain.smartPassesContract.methods.getMintPrice(BODY_TICKET_ID)
        .call();
      let getMintPricePet = await store
        .getState()
        .blockchain.smartPassesContract.methods.getMintPrice(PET_PASS_ID)
        .call();
      let getMintPricePremium = await store
        .getState()
        .blockchain.smartPassesContract.methods.getMintPrice(PREMIUM_SEASON_PASS_ID)
        .call();
      let getMintPricePassport = await store
        .getState()
        .blockchain.smartPassesContract.methods.getMintPrice(PASSPORT_ID)
        .call();
      let goldenHeadTicketsLeft = await store
        .getState()
        .blockchain.smartPassesContract.methods.balanceOf(account, GOLDEN_TICKET_ID)
        .call({ 'from': account });
      let premiumPassTicketsOwned = await store
        .getState()
        .blockchain.smartPassesContract.methods.balanceOf(account, PREMIUM_SEASON_PASS_ID)
        .call({ 'from': account });
      let balanceOfBodyPass = await store
        .getState()
        .blockchain.smartPassesContract.methods.balanceOf(account, BODY_TICKET_ID)
        .call({ 'from': account });
      let balanceOfPetPass = await store
        .getState()
        .blockchain.smartPassesContract.methods.balanceOf(account, PET_PASS_ID)
        .call({ 'from': account });

      /* MIP Main Contract */
      let tokensTotalSupply = await store
        .getState()
        .blockchain.mipContract.methods.tokensTotalSupply()
        .call({ 'from': account });
      let contractInfo = await store
        .getState()
        .blockchain.mipContract.methods.contractInfo()
        .call({ 'from': account });
      let openStatus = await store
        .getState()
        .blockchain.mipContract.methods.getOpenStatus()
        .call({ 'from': account });
      let userInfoMainContract = await store
        .getState()
        .blockchain.mipContract.methods.userInfo(account)
        .call({ 'from': account });

      /* MIP Whitelists Contract */
      let userInfo = await store
        .getState()
        .blockchain.mipWhitelistsContract.methods.userInfo(account)
        .call({ 'from': account });

      dispatch(
        fetchDataSuccess({
          openBody,
          openPet,
          openPremium,
          openPassport,
          userPassesLeftBody,
          userPassesLeftPet,
          userPassesLeftPremium,
          userPassesLeftPassport,
          amIWhitelisted,
          passesAvailableBody,
          passesAvailablePet,
          passesAvailablePremium,
          passesAvailablePassport,
          totalSupplyBody,
          totalSupplyPet,
          totalSupplyPremium,
          totalSupplyPassport,
          totalPassAmountBody,
          totalPassAmountPet,
          totalPassAmountPremium,
          totalPassAmountPassport,
          getMintPriceBody,
          getMintPricePet,
          getMintPricePremium,
          getMintPricePassport,
          goldenHeadTicketsLeft,
          premiumPassTicketsOwned,
          balanceOfBodyPass,
          balanceOfPetPass,
          tokensTotalSupply,
          contractInfo,
          openStatus,
          userInfoMainContract,
          userInfo,
        })
      );
    } catch (err) {
      toast.error("Could not load data from contract.");
      dispatch(fetchDataFailed("Could not load data from contract."));
    }
  };
};
