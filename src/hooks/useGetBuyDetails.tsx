import axios from "axios";
import { useContext } from "react";
import { useMutation } from "react-query";
import { apiRoute, queryClient } from "../utils/api";
import authHeader from "../utils/auth-header";
import { Context } from "../utils/commonFunctions";

type MutateDataType = {
  id: number;
};

function useGetBuyDetails() {
  const context = useContext(Context);

  const { mutate, isLoading, data } = useMutation(
    (data: MutateDataType) =>
      axios.get(`${apiRoute}/market/buy/${data.id}`, {
        headers: authHeader(),
      }),
    {
      onSuccess: () => {
        context?.setMessage("Successfully bought");
        queryClient.invalidateQueries("getAllAdminSpareParts");
      },
    },
  );

  return { mutate, isLoading, data };
}

export { useGetBuyDetails };
