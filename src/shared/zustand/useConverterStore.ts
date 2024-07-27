import { immer } from "zustand/middleware/immer";
import { create } from "zustand";

import { ICurrency } from "../types/currencies";
import { apiBase } from "../http";

interface StoreState {
  leftInput: string;
  leftCurrency: ICurrency | null;

  rightInput: string;
  rightCurrency: ICurrency | null;

  start: () => void;

  course: number;
}

export const useConverterStore = create<StoreState>()(
  immer((set, get) => ({
    course: 0,

    leftInput: "0",
    leftCurrency: null,

    rightCurrency: null,
    rightInput: "0",

    start: async () => {
      try {
        const { data } = await apiBase.get("pair/usd/rub");

        console.log("data is - ", data);
      } catch (error) {}
    },
  }))
);
