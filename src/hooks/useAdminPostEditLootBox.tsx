import axios from "axios";
import { useContext } from "react";
import { useMutation } from "react-query";
import { apiRoute, queryClient } from "../utils/api";
import authHeader from "../utils/auth-header";
import { Context } from "../utils/commonFunctions";

type EditBoxDataType = {
  boxId: number;
  updateData: {
    mainInfo: {
      name: string;
      price: number;
      rarity: "Gray" | "Green" | "Blue" | "Purple" | "Red" | "Yellow";
      loot_tokens: string;
    };
  };
};

function useAdminPostEditLootBox() {
  const context = useContext(Context);

  const { mutate, isLoading, data } = useMutation(
    (data: EditBoxDataType) =>
      axios.put(`${apiRoute}/lootboxes`, data, {
        headers: authHeader(),
      }),
    {
      onSuccess: () => {
        context?.setMessage("Edit LootBox");
        queryClient.invalidateQueries("getAllAdminLootBoxes");
      },
    },
  );

  return { mutate, isLoading, data };
}

export { useAdminPostEditLootBox };
