import axios from "axios";
import { useQuery } from "react-query";
import { apiRoute } from "../utils/api";
import { ProfileDataType } from "../utils/commonTypes";

function useGetProfile(token: string, setAuth: (a: boolean) => void) {
  const { data, isLoading } = useQuery(
    ["getProfile", token],
    () =>
      axios.get<ProfileDataType>(`${apiRoute}/users/profile`, {
        headers: { authtoken: token },
      }),
    {
      enabled: !!token,
      onError: () => {
        localStorage.clear();
        setAuth(false);
      },
      onSuccess: () => {
        setAuth(true);
      },
    },
  );

  return { data, isLoading };
}

export { useGetProfile };
