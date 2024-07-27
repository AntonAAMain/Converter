"use client";

import { useConverterStore } from "@/shared/zustand/useConverterStore";
import { ConvertField } from "./ConvertField/ConvertField";
import { useEffect } from "react";
import cn from "classnames";

import cls from "./Converter.module.scss";

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
  } = useConverterStore();

  useEffect(() => {
    start();
  }, []);

  return (
    <div className={cn(cls.container)}>
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
  );
};
