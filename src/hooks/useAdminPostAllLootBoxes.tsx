import axios from "axios";
import { useQuery } from "react-query";
import { apiRoute } from "../utils/api";
import authHeader from "../utils/auth-header";
import { AdminPostAllLootBoxes } from "../utils/commonTypes";

type PropsLootBoxType = {
  page: number;
  limit: number;
  minPrice: number;
  maxPrice: number;
  pageId: number;
  types?: string[] | null;
};

function useAdminPostAllLootBoxes(props: PropsLootBoxType) {
  const { data, isLoading } = useQuery(
    ["getAllAdminLootBoxes", props],
    () =>
      axios.post<AdminPostAllLootBoxes>(
        `${apiRoute}/lootboxes/getall`,
        {
          page: props.page,
          limit: props.limit,
          minPrice: props.minPrice,
          maxPrice: props.maxPrice,
          types: props.types,
        },
        {
          headers: authHeader(),
        },
      ),
    {
      enabled: !!props.pageId,
    },
  );

  return { data, isLoading };
}

export { useAdminPostAllLootBoxes };
