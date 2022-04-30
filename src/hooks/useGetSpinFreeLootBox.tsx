import axios from "axios";
import { useQuery } from "react-query";
import { apiRoute } from "../utils/api";
import authHeader from "../utils/auth-header";
import { WinSpinData } from "../utils/commonTypes";

function useGetSpinFreeLootBox(freeLootBoxId: number) {
  const { data, isLoading } = useQuery(
    ["getAdminLootBox"],
    () =>
      axios.get<WinSpinData>(`${apiRoute}/lootboxes/${freeLootBoxId}`, {
        headers: authHeader(),
      }),
    { enabled: !!freeLootBoxId },
  );

  return { data, isLoading };
}

export { useGetSpinFreeLootBox };
