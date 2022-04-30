import axios from "axios";
import { useQuery } from "react-query";
import { apiRoute } from "../utils/api";
import authHeader from "../utils/auth-header";
import { HistoryUser } from "../utils/commonTypes";

function useGetHistoryUsers() {
  const { data, isLoading } = useQuery(["historyUsers"], () =>
    axios.get<HistoryUser>(`${apiRoute}/market/history`, {
      headers: authHeader(),
    }),
  );

  return { data, isLoading };
}

export { useGetHistoryUsers };
