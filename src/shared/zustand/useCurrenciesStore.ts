import { immer } from "zustand/middleware/immer";
import { create } from "zustand";
import { apiBase } from "../http";

interface StoreState {
  rates: [string, number][];
  fetchRates: () => void;
  isLoading: boolean;

  reset: () => void;
}

export const useCurrenciesStore = create<StoreState>()(
  immer((set, get) => ({
    isLoading: true,

    reset: () => {
      set((state) => {
        state.isLoading = false;
      });
    },

    rates: [],

    fetchRates: async () => {
      try {
        const { data } = await apiBase.get(`latest/rub`);

        set((state) => {
          state.rates = Object.entries(data.conversion_rates);
          state.isLoading = false;
        });
      } catch (error) {}
    },
  }))
);
