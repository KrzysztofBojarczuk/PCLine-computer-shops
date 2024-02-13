import { Country } from "@/enums/country";

export interface Shop {
  shopId: number;
  name: string;
  startDate: string;
  country: Country;
}
