import type { Item } from "./Item";

export type Invoice = {
  logoUrl: string;
  invoiceNumber: number;
  billFrom: string;
  billTo: string;
  items: Item[];
  notes: string;
};
