import axios from "axios";
import { useMutation } from "react-query";
import { apiRoute } from "../utils/api";
import authHeader from "../utils/auth-header";

function useUploadFileAdmin() {
  const { mutate, isLoading, isSuccess, data } = useMutation((data: any) =>
    axios.post(`${apiRoute}/admin/upload`, data, {
      headers: { ...authHeader(), "Content-Type": "multipart/form-data" },
    }),
  );

  return { mutate, isLoading, isSuccess, data };
}

export { useUploadFileAdmin };
