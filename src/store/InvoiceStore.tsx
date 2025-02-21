import { InvoiceStore } from "@/types";
import { create } from "zustand";

export const useInvoiceStore = create<InvoiceStore>((set) => ({
  invoices: [],
  addInvoice: (invoice) =>
    set((state) => ({ invoices: [...state.invoices, invoice] })),
  removeInvoice: (id) =>
    set((state) => ({ invoices: state.invoices.filter((i) => i.id !== id) })),
}));
