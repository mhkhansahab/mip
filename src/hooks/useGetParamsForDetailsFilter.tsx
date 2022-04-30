import axios from "axios";
import { useQuery } from "react-query";
import { apiRoute } from "../utils/api";
import authHeader from "../utils/auth-header";
import { ParamsForDetailsFilter } from "../utils/commonTypes";

function useGetParamsForDetailsFilter() {
  const { data, isLoading } = useQuery(["getParamsForDetailsFilter"], () =>
    axios.get<ParamsForDetailsFilter>(`${apiRoute}/parts/params`, {
      headers: authHeader(),
    }),
  );

  return { data, isLoading };
}

export { useGetParamsForDetailsFilter };
