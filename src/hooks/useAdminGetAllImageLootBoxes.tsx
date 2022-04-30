import axios from "axios";
import { useQuery } from "react-query";
import { apiRoute } from "../utils/api";
import authHeader from "../utils/auth-header";
import { GetAllImgLootBoxType } from "../utils/commonTypes";

function useAdminGetAllImageLootBoxes() {
  const { data, isLoading } = useQuery(["getAllImageBoxAdmin"], () =>
    axios.get<GetAllImgLootBoxType>(`${apiRoute}/admin/lootboxes/getimages`, {
      headers: authHeader(),
    }),
  );

  return { data, isLoading };
}

export { useAdminGetAllImageLootBoxes };
