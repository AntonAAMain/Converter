"use client";

import { useConverterStore } from "@/shared/zustand/useConverterStore";
import { ConvertField } from "./ConvertField/ConvertField";
import { useEffect, useState } from "react";
import cn from "classnames";

import cls from "./Converter.module.scss";
import { ErrorText } from "../ErrorText/ErrorText";
import { Button } from "@mui/material";

export const Converter = () => {
  const {
    start,
    handleLeftCurrency,
    handleLeftInput,
    handleRightCurrency,
    handleRightInput,
    rightCurrency,
    rightInput,
    leftCurrency,
    leftInput,
    isLoading,
    reset,
    isError,
    fetchCurrencies,
  } = useConverterStore();

  useEffect(() => {
    start();

    return reset;
  }, []);

  const [isCurrenciesFetched, setIsCurrenciesFetched] =
    useState<boolean>(false);

  const getMoreCurrencies = () => {
    setIsCurrenciesFetched(true);
    fetchCurrencies();
  };

  return (
    <>
      {!isError && (
        <div
          className={cn(cls.container, { [cls.container_loading]: isLoading })}
        >
          <div className={cls.fields}>
            <ConvertField
              inputValue={leftInput}
              handleInputValue={handleLeftInput}
              selectValue={leftCurrency}
              handleSelectValue={handleLeftCurrency}
            />
            in
            <ConvertField
              inputValue={rightInput}
              handleInputValue={handleRightInput}
              selectValue={rightCurrency}
              handleSelectValue={handleRightCurrency}
            />
          </div>

          <Button
            onClick={getMoreCurrencies}
            className={cn(cls.downloadBtn, {
              [cls.downloadBtn_hidden]: isCurrenciesFetched,
            })}
            variant="contained"
            color="secondary"
          >
            Загрузить больше валют
          </Button>
        </div>
      )}

      {isError && <ErrorText />}
    </>
  );
};
