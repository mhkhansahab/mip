import axios from "axios";
import { useQuery } from "react-query";
import { apiRoute } from "../utils/api";
import authHeader from "../utils/auth-header";
import { AdminGetOneLootBoxType } from "../utils/commonTypes";

function useAdminGetOneBoxLoot(caseId: number) {
  const { data, isLoading } = useQuery(
    ["getAdminLootBox"],
    () =>
      axios.get<AdminGetOneLootBoxType>(`${apiRoute}/lootboxes/${caseId}`, {
        headers: authHeader(),
      }),
    { enabled: !!caseId },
  );

  return { data, isLoading };
}

export { useAdminGetOneBoxLoot };
