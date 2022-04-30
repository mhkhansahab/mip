import axios from "axios";
import { useQuery } from "react-query";
import { apiRoute } from "../utils/api";
import authHeader from "../utils/auth-header";
import { PartsRobot } from "../utils/commonTypes";

function useAdminGetOneDetailsEdit(idDetail: number) {
  const { data, isLoading } = useQuery(
    ["getAdminDetail", idDetail],
    () =>
      axios.get<PartsRobot>(`${apiRoute}/admin/market/${idDetail}`, {
        headers: authHeader(),
      }),
    { enabled: !!idDetail },
  );

  return { data, isLoading };
}

export { useAdminGetOneDetailsEdit };
