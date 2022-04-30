import axios from "axios";
import { useContext } from "react";
import { useMutation } from "react-query";
import { apiRoute, queryClient } from "../utils/api";
import authHeader from "../utils/auth-header";
import { Context } from "../utils/commonFunctions";

type MutateDataType = {
  id: number;
  idRob: number;
};

function useGetSellDetails() {
  const context = useContext(Context);

  const { mutate, isLoading, data } = useMutation(
    (data: MutateDataType) =>
      axios.get(`${apiRoute}/market/sell/${data.id}/${data.idRob}`, {
        headers: authHeader(),
      }),
    {
      onSuccess: () => {
        context?.setMessage("Successfully sold");
        queryClient
          .invalidateQueries("getAllRobotsInProfile")
          .then(() => queryClient.invalidateQueries("getAllSpareParts"));
      },
    },
  );

  return { mutate, isLoading, data };
}

export { useGetSellDetails };
