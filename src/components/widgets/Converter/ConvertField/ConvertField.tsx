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

interface Props {
  inputValue: string;
  handleInputValue: (value: string) => void;

  selectValue: ICurrency;
  handleSelectValue: (value: ICurrency) => void;
}

export const ConvertField = ({
  inputValue,
  handleInputValue,
  selectValue,
  handleSelectValue,
}: Props) => {
  return (
    <div className={cn(cls.container)}>
      <TextField
        className={cls.textField}
        value={inputValue}
        onChange={(e) => handleInputValue(e.target.value)}
        label="Валюта"
      />

      <FormControl className={cls.formControl}>
        {/* <InputLabel
        // id="demo-simple-select-label"
        >
          Валюта
        </InputLabel> */}
        <Select
          value={selectValue}
          onChange={(e) => handleSelectValue(e.target.value as ICurrency)}
          MenuProps={{ disableScrollLock: true }}
          className={cls.select}
          //   labelId="demo-simple-select-label"
          //   id="demo-simple-select"
          //   value={age}
          //   onChange={handleChange}
        >
          <MenuItem value={ICurrency.AWG}>{ICurrency.AWG}</MenuItem>
          <MenuItem value={ICurrency.EUR}>{ICurrency.EUR}</MenuItem>
          <MenuItem value={ICurrency.RUB}>{ICurrency.RUB}</MenuItem>
          <MenuItem value={ICurrency.USD}>{ICurrency.USD}</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
};
