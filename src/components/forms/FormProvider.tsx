import { invoiceSchema, multiStepSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";

export default function FormWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const methods = useForm({
    resolver: zodResolver(invoiceSchema),
    mode: "onChange",
    defaultValues: {
      customer: {
        id: crypto.randomUUID(),
        name: "",
        email: "",
        company: "",
        phoneNumber: "",
      },
      items: [],
      paymentDue: "",
      status: "pending",
      isDraft: false,
    },
  });

  return <FormProvider {...methods}>{children}</FormProvider>;
}
