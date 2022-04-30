import axios from "axios";
import { useContext } from "react";
import { useMutation } from "react-query";
import { apiRoute, queryClient } from "../utils/api";
import authHeader from "../utils/auth-header";
import { Context } from "../utils/commonFunctions";

type DeleteDetailDataType = {
  partId: number;
  updateData: {
    updatePart: {
      price: number;
      sell: number;
    };
    updateTraits?: [
      {
        trait: string;
        value: string;
      },
    ];
  };
};

function useAdminPutEditDetailMarket() {
  const context = useContext(Context);

  const { mutate, isLoading, data } = useMutation(
    (data: DeleteDetailDataType) =>
      axios.put(`${apiRoute}/parts/update`, data, {
        headers: authHeader(),
      }),
    {
      onSuccess: () => {
        context?.setMessage("Edit component");
        queryClient.invalidateQueries("getAllAdminSpareParts");
      },
    },
  );

  return { mutate, isLoading, data };
}

export { useAdminPutEditDetailMarket };
