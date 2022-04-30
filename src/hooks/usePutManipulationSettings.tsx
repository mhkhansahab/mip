import axios from "axios";
import { useMutation } from "react-query";
import { apiRoute, queryClient } from "../utils/api";
import authHeader from "../utils/auth-header";

type DataManipulationSettingsType = {
  language: string;
  animation: boolean;
  sound: boolean;
};

function usePutManipulationSettings() {
  const { mutate, isLoading, data } = useMutation(
    (data: DataManipulationSettingsType) =>
      axios.put(`${apiRoute}/users/settings`, data, {
        headers: authHeader(),
      }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("getProfile");
      },
    },
  );

  return { mutate, isLoading, data };
}

export { usePutManipulationSettings };
