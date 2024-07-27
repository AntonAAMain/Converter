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

export const ConvertField = () => {
  return (
    <div className={cn(cls.container)}>
      <TextField label="Валюта" />

      <FormControl className={cls.formControl}>
        <InputLabel
        // id="demo-simple-select-label"
        >
          Age
        </InputLabel>
        <Select
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
