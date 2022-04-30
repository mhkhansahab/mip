import axios from "axios";
import { useContext } from "react";
import { useQuery } from "react-query";
import { apiRoute, queryClient } from "../utils/api";
import authHeader from "../utils/auth-header";
import { Context } from "../utils/commonFunctions";

type DataBuyMarketType = {
  userId: string;
  partId: number;
  createdAt: string;
  updatedAt: string;
};

function usePostBuyDetailMarket(partId: number | null) {
  const context = useContext(Context);

  const { data, isLoading } = useQuery(
    ["buyDetail", partId],
    () =>
      axios.post<DataBuyMarketType>(
        `${apiRoute}/parts/market/purchase`,
        {
          partId,
        },
        {
          headers: authHeader(),
        },
      ),

    {
      enabled: partId !== null,
      onSuccess: () => {
        context?.setMessage("Successfully bought");
        queryClient.invalidateQueries("getAllSpareParts");
      },
    },
  );

  return { data, isLoading };
}

export { usePostBuyDetailMarket };
