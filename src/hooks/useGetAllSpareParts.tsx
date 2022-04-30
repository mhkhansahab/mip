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
    faction?: string;
  };
};

function useGetAllSpareParts(props: GetAllPartsType) {
  const { data, isLoading } = useQuery(
    ["getAllSpareParts", props],
    () =>
      axios.post<SparePartResponse>(
        `${apiRoute}/parts/getall`,
        {
          current_user: props.current_user || false,
          pagination: {
            page: props.page || 1,
            limit: 21
          },
          order: props.order || [],
          filter: {
            name: props.filter?.name || "",
            traits: {
              part: props.filter?.part || "",
              faction: props.filter?.faction || ""
            }
          }
        },
        {
          headers: authHeader(),
        }
      ),
    {
      enabled: !!props.page,
    }
  );

  return { data, isLoading };
}

export { useGetAllSpareParts };
