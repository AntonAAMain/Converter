import {
  FormControl,
  Input,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { ICurrency } from "@/shared/types/currencies";
import cn from "classnames";

import cls from "./ConvertField.module.scss";
import { useConverterStore } from "@/shared/zustand/useConverterStore";

interface Props {
  inputValue: string;
  handleInputValue: (value: string) => void;

  selectValue: ICurrency;
  handleSelectValue: (value: string) => void;
}

export const ConvertField = ({
  inputValue,
  handleInputValue,
  selectValue,
  handleSelectValue,
}: Props) => {
  const { currencies } = useConverterStore();

  return (
    <div className={cn(cls.container)}>
      <TextField
        className={cls.textField}
        value={inputValue}
        onChange={(e) => handleInputValue(e.target.value)}
        label={selectValue}
      />

      <FormControl className={cls.formControl}>
        <Select
          value={selectValue}
          onChange={(e) => handleSelectValue(e.target.value as ICurrency)}
          MenuProps={{ disableScrollLock: true }}
          className={cls.select}
        >
          {currencies.map((currency) => (
            <MenuItem key={currency} value={currency}>
              {currency}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};
