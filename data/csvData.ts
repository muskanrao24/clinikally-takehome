import { LogisticsProvider, Pincode, Stock, UIProduct } from "@/types";
import pincodes from "./Pincodes.json";
import products from "./Products.json";
import stocks from "./Stock.json";
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

export function getProduct(productId: number): UIProduct {
  const p = products.find((p) => p["Product ID"] === productId.toString());
  if (!p) {
    throw new Error("Product not found");
  }
  return {
    productId: parseInt(p["Product ID"]),
    name: p["Product Name"],
    price: parseInt(p.Price),
    discount: 0,
    productImg:
      HomeProductImages[Math.floor(Math.random() * HomeProductImages.length)],
    rating: Math.floor(Math.random() * 5),
  };
}

export function getPincode(pincode: number): Pincode {
  const p = pincodes.find((p) => p.Pincode === pincode.toString());
  if (!p) {
    throw new Error("Pincode not found");
  }
  return {
    logisticsProvider: ((lp) => {
      if (lp === "Provider A") return LogisticsProvider.A;
      if (lp === "Provider B") return LogisticsProvider.B;
      return LogisticsProvider.GENERAL;
    })(p["Logistics Provider"]),
    pincode: parseInt(p.Pincode),
    tat: parseInt(p.TAT),
  };
}

export function getStock(productId: number): Stock {
  const s = stocks.find((s) => s["Product ID"] === productId.toString());
  if (!s) {
    throw new Error("Stock not found");
  }
  return {
    productId: parseInt(s["Product ID"]),
    available: s["Stock Available"] === "True",
  };
}
