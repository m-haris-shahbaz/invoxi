import { InvoiceFormData } from "@/schemas";
import { useFormContext } from "react-hook-form";

export default function PaymentDetails() {
  const {
    register,
    formState: { errors },
  } = useFormContext<InvoiceFormData>();

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Payment Due Date
        </label>
        <input
          type="date"
          {...register("paymentDue")}
          className="w-full p-2 border rounded-lg"
        />
        {errors.paymentDue && (
          <p className="text-red-500 text-sm">{errors.paymentDue.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Status
        </label>
        <select
          {...register("status")}
          className="w-full p-2 border rounded-lg"
        >
          <option value="pending">Pending</option>
          <option value="paid">Paid</option>
        </select>
        {errors.status && (
          <p className="text-red-500 text-sm">{errors.status.message}</p>
        )}
      </div>

      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          {...register("isDraft")}
          className="rounded border-gray-300"
        />
        <label className="text-sm font-medium text-gray-700">
          Save as Draft
        </label>
      </div>
    </div>
  );
}
