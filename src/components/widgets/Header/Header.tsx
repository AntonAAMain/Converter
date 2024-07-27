"use client";

import { Button } from "@mui/material";
import { usePathname, useRouter } from "next/navigation";
import cn from "classnames";

import cls from "./Header.module.scss";

export const Header = () => {
  const pathname = usePathname();
  const rotuer = useRouter();

  const isConverter = !pathname.includes("currencies");
  const isCurrencies = pathname.includes("currencies");

  const converterClick = () => rotuer.push("/");
  const currenciesClick = () => rotuer.push("/currencies");

  return (
    <header className={cn(cls.container)}>
      <Button
        onClick={converterClick}
        className={cls.button}
        variant={isConverter ? "contained" : "outlined"}
        color="primary"
      >
        Конвертер
      </Button>
      <Button
        onClick={currenciesClick}
        className={cls.button}
        variant={isCurrencies ? "contained" : "outlined"}
        color="primary"
      >
        Текущие курсы
      </Button>
    </header>
  );
};
