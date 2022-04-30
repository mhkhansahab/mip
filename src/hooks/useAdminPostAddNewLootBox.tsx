import axios from "axios";
import { useContext } from "react";
import { useMutation } from "react-query";
import { apiRoute, queryClient } from "../utils/api";
import authHeader from "../utils/auth-header";
import { Context } from "../utils/commonFunctions";

type MutateDataType = {
  name: string;
  price: number;
  rarity: string;
  loot_tokens: string;
};

function useAdminPostAddNewLootBox() {
  const context = useContext(Context);

  const { mutate, isLoading, data } = useMutation(
    (data: MutateDataType) =>
      axios.post(`${apiRoute}/lootboxes`, data, {
        headers: authHeader(),
      }),
    {
      onSuccess: () => {
        context?.setMessage("Add LootBox");
        queryClient.invalidateQueries("getAllAdminLootBoxes");
      },
    },
  );

  return { mutate, isLoading, data };
}

export { useAdminPostAddNewLootBox };
