import axios from "axios";
import { useMutation } from "react-query";
import { apiRoute } from "../utils/api";

type MutateDataType = {
  address: string;
  message: string;
  signature: string;
};

function useRegisterNewUser() {
  const { mutate, isLoading, isSuccess, data } = useMutation(
    (data: MutateDataType) => axios.post(`${apiRoute}/auth/register`, data),
  );

  return { mutate, isLoading, isSuccess, data };
}

export { useRegisterNewUser };
