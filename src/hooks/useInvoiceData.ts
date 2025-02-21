import { useFormContext, useWatch } from "react-hook-form";
import type { InvoiceFormData } from "@/schemas";

export function useInvoiceData() {
  const { control } = useFormContext<InvoiceFormData>();

  // Watch all form fields
  const formData = useWatch({
    control,
  });

  // Calculate totals
  const subtotal =
    formData?.items?.reduce((acc, item) => {
      return acc + Number(item.price) * Number(item.quantity);
    }, 0) ?? 0;

  const tax = subtotal * 0.1; // 10% tax example
  const total = subtotal + tax;

  return {
    customer: formData?.customer ?? {},
    items: formData?.items ?? [],
    paymentDetails: {
      dueDate: formData?.paymentDue,
      status: formData?.status,
    },
    calculations: {
      subtotal,
      tax,
      total,
    },
  };
}
