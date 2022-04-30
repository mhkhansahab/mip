import axios from "axios";
import { useContext } from "react";
import { useMutation } from "react-query";
import { apiRoute, queryClient } from "../utils/api";
import authHeader from "../utils/auth-header";
import { Context } from "../utils/commonFunctions";

type MutateDataType = {
  robotId: number;
  manipulation: {
    type: "replace" | "remove";
    partId: number;
  };
};

function usePutRobotManipulation() {
  const context = useContext(Context);

  const { mutate, isLoading, data } = useMutation(
    (data: MutateDataType) =>
      axios.put(`${apiRoute}/robots/manipulation`, data, {
        headers: authHeader(),
      }),
    {
      onSuccess: () => {
        context?.setMessage("Change details");
        queryClient
          .invalidateQueries("getAllRobotsInProfile")
          .then(() => queryClient.invalidateQueries("getAllSpareParts"));
      },
    },
  );

  return { mutate, isLoading, data };
}

export { usePutRobotManipulation };
