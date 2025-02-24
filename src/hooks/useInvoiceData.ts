import { useFormContext, useWatch } from "react-hook-form";
import type { InvoiceFormData } from "@/schemas";

export function useInvoiceData() {
  const { control } = useFormContext<InvoiceFormData>();

  // Watch items specifically for calculations
  const items = useWatch({
    control,
    name: "items",
  });

  const calculations = {
    subtotal:
      items?.reduce((acc, item) => {
        const quantity = Number(item?.quantity) || 0;
        const price = Number(item?.price) || 0;
        return acc + quantity * price;
      }, 0) || 0,

    get tax() {
      return this.subtotal * 0.1;
    },

    get total() {
      return this.subtotal + this.tax;
    },
  };

  return {
    items: items || [],
    calculations,
  };
}
