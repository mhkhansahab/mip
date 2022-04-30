import axios from "axios";
import { Dispatch, SetStateAction, useContext } from "react";
import { useMutation } from "react-query";
import { apiRoute, queryClient } from "../utils/api";
import authHeader from "../utils/auth-header";
import { Context } from "../utils/commonFunctions";

type MutateDataType = {
  robotId: number;
  robotData: any[] | undefined;
};

function useMoveRobotToGarage(setVisibleModal: Dispatch<SetStateAction<boolean>>) {
  const context = useContext(Context);
  const { mutate, isLoading, data } = useMutation((data: MutateDataType) => axios.post(`${apiRoute}/robots/garage`, data, { headers: authHeader()}), {
    onSuccess: () => {
      setVisibleModal(false);
      context?.setMessage("Change active robot");
      queryClient.invalidateQueries("getAllRobotsInProfile").then(() => queryClient.invalidateQueries("getAllSpareParts"));
    }
  });

  return { mutate, isLoading, data };
}

export { useMoveRobotToGarage };
