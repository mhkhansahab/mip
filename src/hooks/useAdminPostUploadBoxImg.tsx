import axios from "axios";
import { useContext } from "react";
import { useMutation } from "react-query";
import { apiRoute } from "../utils/api";
import authHeader from "../utils/auth-header";
import { Context } from "../utils/commonFunctions";

export type formDataType = {
  lastModified: number;
  lastModifiedDate: any;
  name: string;
  size: number;
  type: string;
  webkitRelativePath: string;
}[];

function useAdminPostUploadBoxImg() {
  const context = useContext(Context);

  const { mutate, isLoading, data } = useMutation(
    (data: FormData | []) =>
      axios.post(`${apiRoute}/admin/lootboxes/upload`, data, {
        headers: { ...authHeader(), "Content-Type": "multipart/form-data" },
      }),
    {
      onSuccess: () => {
        context?.setMessage("Upload files");
      },
    },
  );

  return { mutate, isLoading, data };
}

export { useAdminPostUploadBoxImg };
