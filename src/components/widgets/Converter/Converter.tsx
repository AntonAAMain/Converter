"use client";

import cn from "classnames";

import cls from "./Converter.module.scss";
import { ConvertField } from "./ConvertField/ConvertField";
import { useEffect } from "react";

export const Converter = () => {
  //   const {} = use;

  useEffect(() => {}, []);

  return (
    <div className={cn(cls.container)}>
      <ConvertField />
      in
      <ConvertField />
    </div>
  );
};
