import { ImageSourcePropType } from "react-native";

export enum LogisticsProvider {
  A,
  B,
  GENERAL,
}

export interface Pincode {
  pincode: number;
  logisticsProvider: LogisticsProvider;
  tat: number;
}

export interface Product {
  productId: number;
  name: string;
  price: number;
}

export interface Stock {
  productId: number;
  available: boolean;
}

// ENHANCED TYPES FROM THE UI
export enum LabelType {
  DOCTORS_CHOICE = "Doctors Choice",
  NEW_ARRIVAL = "New Arrival",
  BEST_SELLER = "Best Seller",
}

export interface UIProduct extends Product {
  discount: number;
  rating: number;
  productImg: ImageSourcePropType;
  labelType?: LabelType;
}
