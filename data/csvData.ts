import { LogisticsProvider, Pincode, UIProduct } from "@/types";
import pincodes from "./Pincodes.json";
import products from "./Products.json";
import { HomeProductImages } from "./assets";

export function getPincodes(from: number, to: number): Pincode[] {
  return pincodes.slice(from, to).map((p) => ({
    logisticsProvider: ((lp) => {
      if (lp === "A") return LogisticsProvider.A;
      if (lp === "B") return LogisticsProvider.B;
      return LogisticsProvider.GENERAL;
    })(p["Logistics Provider"]),
    pincode: parseInt(p.Pincode),
    tat: parseInt(p.TAT),
  }));
}

export function getProducts(from: number, to: number): UIProduct[] {
  return products.slice(from, to).map((p) => ({
    productId: parseInt(p["Product ID"]),
    name: p["Product Name"],
    price: parseInt(p.Price),
    discount: 0,
    productImg:
      HomeProductImages[Math.floor(Math.random() * HomeProductImages.length)],
    rating: Math.floor(Math.random() * 5),
  }));
}
