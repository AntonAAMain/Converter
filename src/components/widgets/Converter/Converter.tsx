"use client";

import { useConverterStore } from "@/shared/zustand/useConverterStore";
import { ConvertField } from "./ConvertField/ConvertField";
import { useEffect } from "react";
import cn from "classnames";

import cls from "./Converter.module.scss";
import { ErrorText } from "../ErrorText/ErrorText";

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
  } = useConverterStore();

  useEffect(() => {
    start();

    return reset;
  }, []);

  return (
    <>
      {!isError && (
        <div
          className={cn(cls.container, { [cls.container_loading]: isLoading })}
        >
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
      )}

      {isError && <ErrorText />}
    </>
  );
};
