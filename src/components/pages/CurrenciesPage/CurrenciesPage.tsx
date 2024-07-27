"use client";

import cn from "classnames";

import cls from "./CurrenciesPage.module.scss";
import { useCurrenciesStore } from "@/shared/zustand/useCurrenciesStore";
import { useEffect } from "react";

export const CurrenciesPage = () => {
  const { fetchRates, isLoading, rates, reset } = useCurrenciesStore();

  useEffect(() => {
    fetchRates();

    return reset;
  }, []);

  return (
    <div className={cn(cls.container, { [cls.container_loading]: isLoading })}>
      <div className={cls.title}>
        Отображение текущих курсов валют по отношению к RUB
      </div>

      <div className={cls.rates}>
        {rates.map((rate) => (
          <div className={cls.rate} key={rate[0]}>
            1 {rate[0]} = {(1 / rate[1]).toFixed(2)} RUB
          </div>
        ))}
      </div>
    </div>
  );
};
