import axios from "axios";
import { useQuery } from "react-query";
import { apiRoute } from "../utils/api";
import authHeader from "../utils/auth-header";
import { SeasonPass } from "../utils/commonTypes";

function useGetSeasonPass() {
  const { data, isLoading } = useQuery(["seasonpass"], () =>
    axios.get<SeasonPass>(`${apiRoute}/lootboxes/bonuses`, {
      headers: authHeader(),
    }),
  );

  return { data, isLoading };
}

export { useGetSeasonPass };
