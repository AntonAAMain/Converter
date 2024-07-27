import { useCurrenciesStore } from "./useCurrenciesStore";
import { useConverterStore } from "./useConverterStore";
import { ICurrency } from "../types/currencies";

test("fetching rates fills the rates array", async () => {
  await useCurrenciesStore.getState().fetchRates();
  expect(useCurrenciesStore.getState().rates.length).toBeGreaterThan(0);
  expect(useCurrenciesStore.getState().isError).toBe(false);

  // по итогу теста нужно, чтобы заполнились все rates и ошибка не сработала. Если эти условия не выполняются
  // значит что-то не так.
});

test("handling inputs to 0", async () => {
  await useConverterStore.getState().start();

  useConverterStore.getState().handleLeftInput("0");
  expect(parseFloat(useConverterStore.getState().leftInput)).toBe(0);
  expect(parseFloat(useConverterStore.getState().rightInput)).toBe(0);

  useConverterStore.getState().handleRightInput("0");
  expect(parseFloat(useConverterStore.getState().leftInput)).toBe(0);
  expect(parseFloat(useConverterStore.getState().rightInput)).toBe(0);

  // если я в инпут кладу 0 то и в другом инпуте тоже должно быть ноль. Если это не так, значит в другой инпут
  // вообще не было установлено никакое
});

test("handling currencies", async () => {
  await useConverterStore.getState().start();
  const oldRightInputValue = useConverterStore.getInitialState().rightInput;

  await useConverterStore.getState().handleLeftCurrency(ICurrency.AWG);
  expect(oldRightInputValue !== useConverterStore.getState().rightInput).toBe(
    true
  );

  await useConverterStore.getState().start();

  const oldLeftInputValue = useConverterStore.getInitialState().leftInput;

  await useConverterStore.getState().handleRightCurrency(ICurrency.AWG);
  expect(oldLeftInputValue !== useConverterStore.getState().leftInput).toBe(
    true
  );

  // если я меняю валюту то по логике в обязательном порядке должна поменяться цена в противоположеном инпуте
});
