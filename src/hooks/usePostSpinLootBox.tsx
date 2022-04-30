import axios from "axios";
import { useContext } from "react";
import { useMutation } from "react-query";
import { apiRoute, queryClient } from "../utils/api";
import authHeader from "../utils/auth-header";
import { Context } from "../utils/commonFunctions";
import { WinSpinData } from "../utils/commonTypes";

type MutateDataType = {
  countRaffle: number;
  lootboxId: number;
};

function usePostSpinLootBox() {
  const context = useContext(Context);

  const { mutate, isLoading, data } = useMutation(
    (data: MutateDataType) =>
      axios.post<WinSpinData>(
        `${apiRoute}/lootboxes/raffle`,
        { countRaffle: data.countRaffle, lootboxId: data.lootboxId },
        {
          headers: authHeader(),
        },
      ),
    {
      onSuccess: () => {
        if (data?.data) {
          context?.setMessage("Congratulation!");
        } else {
          context?.setMessage("Error. Sorry, please, try later");
          return;
        }
        queryClient.invalidateQueries("getProfile");
      },
      onError: () => {
        context?.setMessage("Error. Sorry, please, try later");
      },
    },
  );

  return { mutate, isLoading, data };
}

export { usePostSpinLootBox };
