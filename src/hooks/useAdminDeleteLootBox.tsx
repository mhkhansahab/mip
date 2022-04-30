import axios from "axios";
import { useContext } from "react";
import { useMutation } from "react-query";
import { apiRoute, queryClient } from "../utils/api";
import authHeader from "../utils/auth-header";
import { Context } from "../utils/commonFunctions";

type MutateDataType = {
  id: number;
};

function useAdminDeleteLootBox() {
  const context = useContext(Context);

  const { mutate, isLoading, data } = useMutation(
    (data: MutateDataType) =>
      axios.delete(`${apiRoute}/lootboxes`, {
        headers: authHeader(),
        data: { id: data.id },
      }),
    {
      onSuccess: () => {
        context?.setMessage("Delete LootBox");
        queryClient.invalidateQueries("getAllAdminLootBoxes");
      },
    },
  );

  return { mutate, isLoading, data };
}

export { useAdminDeleteLootBox };
