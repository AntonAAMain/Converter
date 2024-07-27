"use client";

import { Button } from "@mui/material";
import { usePathname, useRouter } from "next/navigation";
import cn from "classnames";

import cls from "./Header.module.scss";

export const Header = () => {
  const pathname = usePathname();

  const isConverter = !pathname.includes("currencies");
  const isCurrencies = pathname.includes("currencies");

  return (
    <header className={cn(cls.container)}>
      <Button
        className={cls.button}
        variant={isConverter ? "contained" : "outlined"}
        color="primary"
      >
        Конвертер
      </Button>
      <Button
        className={cls.button}
        variant={isCurrencies ? "contained" : "outlined"}
        color="primary"
      >
        Текущие курсы
      </Button>
    </header>
  );
};
