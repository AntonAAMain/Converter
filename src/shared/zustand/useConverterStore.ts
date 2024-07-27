import { immer } from "zustand/middleware/immer";
import { create } from "zustand";

import { ICurrency } from "../types/currencies";
import { apiBase } from "../http";

interface StoreState {
  leftInput: string;
  leftCurrency: ICurrency;

  handleLeftInput: (value: string) => void;
  handleLeftCurrency: (value: string) => void;

  rightInput: string;
  rightCurrency: ICurrency;

  handleRightInput: (value: string) => void;
  handleRightCurrency: (value: string) => void;

  start: () => void;

  course: number;

  isLoading: boolean;
  isError: boolean;

  fetchCurrencies: () => void;
  currencies: string[];

  reset: () => void;
}

export const useConverterStore = create<StoreState>()(
  immer((set, get) => ({
    isError: false,
    currencies: [ICurrency.AWG, ICurrency.EUR, ICurrency.RUB, ICurrency.USD],

    fetchCurrencies: async () => {
      try {
        set((state) => {
          state.isLoading = true;
        });

        const { data } = await apiBase.get(`latest/rub`);

        set((state) => {
          state.isLoading = false;
          state.currencies = Object.keys(data.conversion_rates);
        });
      } catch (error) {
        set((state) => {
          state.isError = true;
        });
      }
    },

    reset: () => {
      set((state) => {
        state.isLoading = true;
        state.isError = false;
        state.currencies = [
          ICurrency.AWG,
          ICurrency.EUR,
          ICurrency.RUB,
          ICurrency.USD,
        ];
      });
    },

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
      } catch (error) {
        set((state) => {
          state.isError = true;
        });
      }
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
      } catch (error) {
        set((state) => {
          state.isError = true;
        });
      }
    },
  }))
);
