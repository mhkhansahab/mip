import axios from "axios";
import { useQuery } from "react-query";
import { apiRoute } from "../utils/api";
import authHeader from "../utils/auth-header";
import { SparePart } from "../utils/commonTypes";

function useAdminPostSearchDetails(searchString: string) {
  const { data, isLoading } = useQuery(
    ["searchDetails", searchString],
    () =>
      axios.post<SparePart[]>(
        `${apiRoute}/admin/parts/search`,
        {
          search: searchString,
        },
        {
          headers: authHeader(),
        },
      ),
    {
      enabled: searchString.length > 2,
    },
  );

  return { data, isLoading };
}

export { useAdminPostSearchDetails };
