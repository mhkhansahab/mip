import axios from "axios";
import { useContext } from "react";
import { useMutation } from "react-query";
import { apiRoute } from "../utils/api";
import authHeader from "../utils/auth-header";
import { Context } from "../utils/commonFunctions";

type DataAddIdType = {
  id: number;
};

function usePutAddDetailInMarket() {
  const context = useContext(Context);
  const { mutate, isLoading, data } = useMutation(
    (data: DataAddIdType) =>
      axios.put(`${apiRoute}/admin/market/${data.id}`, {
        headers: authHeader(),
      }),
    {
      onSuccess: () => context?.setMessage("Successfully put in Market"),
    },
  );

  return { mutate, isLoading, data };
}

export { usePutAddDetailInMarket };
