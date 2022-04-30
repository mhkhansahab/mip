import axios from "axios";
import { useMutation } from "react-query";
import { apiRoute, queryClient } from "../utils/api";
import authHeader from "../utils/auth-header";

type DataAddIdType = {
  wallet: string;
};

function useGetRefreshNFT() {
  const { mutate, isLoading, data } = useMutation(
    (data: DataAddIdType) =>
      axios.get(`${apiRoute}/auth/nfts/${data.wallet}`, {
        headers: authHeader(),
      }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("getAllRobotsInProfile");
      },
    },
  );

  return { mutate, isLoading, data };
}

export { useGetRefreshNFT };
