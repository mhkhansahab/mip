import axios from "axios";
import { useMutation } from "react-query";
import { apiRoute, queryClient } from "../utils/api";
import authHeader from "../utils/auth-header";

type DataAddIdType = {
  id: number;
};

function useAdminPutAddDetailMarket() {
  const { mutate, isLoading, data } = useMutation(
    (data: DataAddIdType) =>
      axios.put(`${apiRoute}/admin/market/${data.id}`, {
        headers: authHeader(),
      }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("getAllAdminSpareParts");
      },
    },
  );

  return { mutate, isLoading, data };
}

export { useAdminPutAddDetailMarket };
