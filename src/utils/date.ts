import { format } from "date-fns";
import { pl } from "date-fns/locale";
import { capitalize } from "./string";

export const formatDateToddMMMMyyyy = (date: string) => format(new Date(date), "dd MMMM yyyy", { locale: pl });
export const formatDateToddMMMM = (date: string) => format(new Date(date), "dd MMMM", { locale: pl });
export const formatToMonthAndYear = (date: string) => capitalize(format(new Date(date), "LLLL yyyy", { locale: pl }));

// For Tpay API
export const todayFormatted = () => format(new Date(), "yyyy-MM-dd");
