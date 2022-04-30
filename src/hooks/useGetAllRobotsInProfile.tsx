import axios from "axios";
import { useQuery } from "react-query";
import { apiRoute } from "../utils/api";
import authHeader from "../utils/auth-header";
import { RobotType } from "../utils/commonTypes";

function useGetAllRobotsInProfile() {
  const { data, isLoading } = useQuery(["getAllRobotsInProfile"], () =>
    axios.get<RobotType[]>(`${apiRoute}/robots/getall`, {
      headers: authHeader(),
    }),
  );

  return { data, isLoading };
}

export { useGetAllRobotsInProfile };
