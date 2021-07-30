import { capitalizeFirstCharInString } from "../screens/App";

export const capitalizeAllAfterDash = (string) => {
  let ar = string.split("-");
  ar[1] = ar[1].toUpperCase();

  return capitalizeFirstCharInString(ar.join().replaceAll(/,/g, "-"));
};
