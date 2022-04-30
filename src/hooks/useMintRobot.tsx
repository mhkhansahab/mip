import axios from "axios";
import { useContext } from "react";
import { useMutation } from "react-query";
import {
  connect,
  isGaragePaid,
  startPayment,
} from "../metamask/balanceAndGaragePaidExample";
import { apiRoute } from "../utils/api";
import authHeader from "../utils/auth-header";
import { Context } from "../utils/commonFunctions";

type MintDataType = {
  robotId: number;
};

type MinResType = {
  status: string;
  error?: string;
};

function useMintRobot() {
  const context = useContext(Context);
  const { mutate, isLoading, data, isSuccess } = useMutation(
    (data: MintDataType) =>
      axios.put<MinResType>(`${apiRoute}/blender/mint`, data, {
        headers: authHeader(),
      }),
    {
      //IN CURRENT MOMENT I USE IT FOR TESTS
      //FUNCTION CONNECT -> FOR CONNECTING WITH METAMASK
      //I think after succesfull finishing of connect() we will use paid function.
      //I don't find reason for using getWalletBalance and isGaragePaid
      onSuccess: res => {
        connect().then(() => {
          //getWalletBalanceEth();
          startPayment().then(() => {
            isGaragePaid().then(garagePaidRes => {
              garagePaidRes
                ? context?.setMessage("Error. Already paid")
                : context?.setMessage("Successfully paid");
            });
          });
        });
        res?.data.error
          ? context?.setMessage("Error. Need to pay")
          : context?.setMessage("Successfully");
      },
    },
  );

  return { mutate, isLoading, data, isSuccess };
}

export { useMintRobot };
