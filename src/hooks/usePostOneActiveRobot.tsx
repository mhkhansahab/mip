import axios from "axios";
import { useQuery } from "react-query";
import { apiRoute } from "../utils/api";
import authHeader from "../utils/auth-header";
import { GetOneRobot } from "../utils/commonTypes";

function usePostOneActiveRobot(robotId: number | null) {
  const { data, isLoading } = useQuery(
    ["getOneRobot", robotId],
    () =>
      axios.post<GetOneRobot>(
        `${apiRoute}/robots/getone`,
        {
          robotId,
        },
        {
          headers: authHeader(),
        },
      ),
    {
      enabled: robotId !== null,
    },
  );

  return { data, isLoading };
}

export { usePostOneActiveRobot };
