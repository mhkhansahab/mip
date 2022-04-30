import axios from "axios";
import { useQuery } from "react-query";
import { apiRoute } from "../utils/api";
import authHeader from "../utils/auth-header";
import { SparePartResponse } from "../utils/commonTypes";

type GetAllPartsType = {
  current_user?: boolean;
  page: number;
  order?: string[];
  filter?: {
    name?: string;
    part?: string;
    rarity?: string;
    faction?: string;
  };
  isMarket?: 1 | 0;
};

function useAdminGetAllSpareParts(props: GetAllPartsType) {
  const { data, isLoading } = useQuery(
    ["getAllAdminSpareParts", props],
    () =>
      axios.post<SparePartResponse>(
        `${apiRoute}/admin/market`,
        {
          current_user: props.current_user || false,
          pagination: {
            page: props.page || 1,
            limit: 21,
          },
          order: props.order || [],
          filter: {
            name: props.filter?.name || "",
            rarity: props.filter?.rarity || "",
            traits: {
              part: props.filter?.part || "",
              faction: props.filter?.faction || "",
            },
          },
          isMarket: props.isMarket,
          // filter: props.filter || {
          //   name: "",
          // },
        },
        {
          headers: authHeader(),
        },
      ),
    {
      enabled: !!props.page,
    },
  );

  return { data, isLoading };
}

export { useAdminGetAllSpareParts };
