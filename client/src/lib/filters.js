import { format } from "date-fns";

const formatDate = (value, f = "dd/MM/yyyy hh:mm:ss") => {
  if (!value) return;
  return format(value, f);
}

export {
  formatDate
}
