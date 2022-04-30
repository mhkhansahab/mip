import axios from "axios";
import { useMutation } from "react-query";
import { apiRoute } from "../utils/api";
import authHeader from "../utils/auth-header";

type MutateDataType = {
  data:
    | {
        Key: string;
        Size: number;
      }[]
    | undefined;
};

type ValidateImageResponse = {
  Key: string;
  Size: number;
  approved: boolean;
  traitError: string;
  exist: boolean;
};

function useValidateAdminImages() {
  const { mutate, isLoading, isSuccess, data } = useMutation(
    (data: MutateDataType) =>
      axios.post<ValidateImageResponse[]>(`${apiRoute}/images/validate`, data, {
        headers: authHeader(),
      }),
  );

  return { mutate, isLoading, isSuccess, data };
}

export { useValidateAdminImages };
