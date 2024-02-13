import { Country } from "../enums/country";

export interface ShopCreate {
    name: string;
    startDate: Date;
    country: Country;
}
