import axios from "axios";
import { useContext } from "react";
import { useMutation } from "react-query";
import { apiRoute, queryClient } from "../utils/api";
import authHeader from "../utils/auth-header";
import { Context } from "../utils/commonFunctions";

type DeleteDetailDataType = {
  boxId: number;

  updateData: {
    mainInfo?: {
      name: string;
      loot_tokens: number;
      price: number;
      rarity: "Gray" | "Green" | "Blue" | "Purple" | "Red" | "Yellow";
      active_status: boolean;
    };
    updatePart?: number[];
    updateImages?: number[];
    updateOdds?: {
      part_id: number;
      odds: number;
    }[];
  };
};

function useAdminPutManipylationDetail() {
  const context = useContext(Context);

  const { mutate, isLoading, data } = useMutation(
    (data: DeleteDetailDataType) =>
      axios.put(`${apiRoute}/lootboxes`, data, {
        headers: authHeader(),
      }),
    {
      onSuccess: () => {
        context?.setMessage("Update parts");
        queryClient.invalidateQueries("getAdminLootBox");
      },
    },
  );

  return { mutate, isLoading, data };
}

export { useAdminPutManipylationDetail };
