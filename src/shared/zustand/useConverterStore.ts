import { immer } from "zustand/middleware/immer";
import { create } from "zustand";

import { ICurrency } from "../types/currencies";
import { apiBase } from "../http";

interface StoreState {
  leftInput: string;
  leftCurrency: ICurrency;

  handleLeftInput: (value: string) => void;
  handleLeftCurrency: (value: ICurrency) => void;

  rightInput: string;
  rightCurrency: ICurrency;

  handleRightInput: (value: string) => void;
  handleRightCurrency: (value: ICurrency) => void;

  start: () => void;

  course: number;

  isLoading: boolean;
}

export const useConverterStore = create<StoreState>()(
  immer((set, get) => ({
    isLoading: true,
    course: 0,

    leftInput: "0",
    leftCurrency: null,

    rightCurrency: null,
    rightInput: "0",

    handleLeftCurrency: async (value: ICurrency) => {
      try {
        const { data } = await apiBase.get(
          `pair/${value}/${get().rightCurrency}`
        );

        const conversionRate = data.conversion_rate;

        set((state) => {
          state.course = data.conversion_rate;
          state.leftCurrency = value;
          state.rightInput =
            get().leftInput === ""
              ? "0"
              : (parseFloat(get().leftInput) * conversionRate).toFixed(2);
        });
      } catch (error) {}
    },

    handleLeftInput: (value: string) => {
      set((state) => {
        state.leftInput = value;
        state.rightInput =
          value === "" ? "0" : (parseFloat(value) * get().course).toFixed(2);
      });
    },

    handleRightCurrency: async (value: ICurrency) => {
      try {
        const { data } = await apiBase.get(
          `pair/${get().leftCurrency}/${value}`
        );

        const conversionRate = data.conversion_rate;

        set((state) => {
          state.course = data.conversion_rate;
          state.rightCurrency = value;
          state.leftInput =
            get().rightInput === ""
              ? "0"
              : (parseFloat(get().rightInput) / conversionRate).toFixed(2);
        });
      } catch (error) {}
    },

    handleRightInput: (value: string) => {
      set((state) => {
        state.rightInput = value;
        state.leftInput =
          value === "" ? "0" : (parseFloat(value) / get().course).toFixed(2);
      });
    },

    start: async () => {
      try {
        const { data } = await apiBase.get("pair/usd/rub");

        const conversionRate = data.conversion_rate;
        set((state) => {
          state.course = conversionRate;
          state.leftCurrency = ICurrency.USD;
          state.rightCurrency = ICurrency.RUB;
          state.leftInput = "1";
          state.rightInput = (1 * conversionRate).toFixed(2);
          state.isLoading = false;
        });
      } catch (error) {}
    },
  }))
);
