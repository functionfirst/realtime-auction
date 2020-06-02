import { differenceInSeconds } from "date-fns";

const isInThePast = (date) => {
  return differenceInSeconds(date, new Date()) < 0;
}

export {
  isInThePast
}
