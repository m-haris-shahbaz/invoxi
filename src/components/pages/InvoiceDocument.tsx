"use client";
import { useInvoiceData } from "@/hooks/useInvoiceData";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import { InvoiceFormData } from "@/schemas";
import { Trash2 } from "lucide-react";

export default function InvoiceDocument() {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext<InvoiceFormData>();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "items",
  });
  const [invoiceNumber] = useState(`INV-${Date.now().toString().slice(-3)}`);
  const [issueDate] = useState<Date>(new Date());
  const { calculations } = useInvoiceData();

  return (
    <div
      className="border border-gray-200 bg-white rounded-lg p-8 shadow-sm"
      style={{ width: "794px", height: "1123px" }}
    >
      {/* Header */}
      <div className="flex justify-between items-start mb-8">
        <div>
          <h3 className="text-2xl font-bold text-gray-800">INVOICE</h3>
          <p className="text-gray-500 mt-1">{invoiceNumber}</p>
        </div>
        <div className="text-right space-y-2">
          <p className="text-gray-600">
            Issue Date: {format(issueDate, "dd MMM yyyy")}
          </p>
          <div>
            <label className="block text-sm text-gray-600">Due Date</label>
            <input
              type="date"
              {...register("paymentDue")}
              className="border rounded p-1 text-sm"
            />
          </div>
        </div>
      </div>

      {/* Company & Customer Info */}
      <div className="flex justify-between mb-8 gap-8">
        <div className="w-1/2 space-y-4">
          <h4 className="font-semibold text-gray-700">From</h4>
          <div className="space-y-2">
            <input
              type="text"
              placeholder="Your Company"
              className="w-full p-2 border rounded"
            />
            <textarea
              placeholder="Company Address"
              rows={3}
              className="w-full p-2 border rounded max-h-[140px]"
            />
          </div>
        </div>
        <div className="w-1/2 space-y-4">
          <h4 className="font-semibold text-gray-700">Bill To</h4>
          <div className="space-y-2">
            <input
              type="text"
              {...register("customer.name")}
              placeholder="Customer Name"
              className="w-full p-2 border rounded"
            />
            <input
              type="text"
              {...register("customer.company")}
              placeholder="Company Name"
              className="w-full p-2 border rounded"
            />
            <input
              type="email"
              {...register("customer.email")}
              placeholder="Email"
              className="w-full p-2 border rounded"
            />
            <input
              type="tel"
              {...register("customer.phoneNumber")}
              placeholder="Phone"
              className="w-full p-2 border rounded"
            />
          </div>
        </div>
      </div>

      {/* Items Section */}
      <div className="mb-8">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-300">
              <th className="py-2 text-left text-gray-600">Item</th>
              <th className="py-2 text-right text-gray-600 w-24">Qty</th>
              <th className="py-2 text-right text-gray-600 w-32">Price</th>
              <th className="py-2 text-right text-gray-600 w-32">Total</th>
              <th className="py-2 w-16"></th>
            </tr>
          </thead>
          <tbody>
            {fields.map((field, index) => (
              <tr key={field.id} className="border-b border-gray-100">
                <td className="py-2">
                  <div className="space-y-1">
                    <input
                      type="text"
                      {...register(`items.${index}.name`)}
                      placeholder="Item name"
                      className="w-full p-2 border rounded"
                    />
                    {errors.items?.[index]?.name && (
                      <p className="text-red-500 text-xs">
                        {errors.items[index]?.name?.message}
                      </p>
                    )}
                    <input
                      type="text"
                      {...register(`items.${index}.description`)}
                      placeholder="Description"
                      className="w-full p-2 border rounded text-sm"
                    />
                  </div>
                </td>
                <td className="py-2">
                  <input
                    type="number"
                    {...register(`items.${index}.quantity`, {
                      valueAsNumber: true,
                    })}
                    placeholder="0"
                    className="w-full p-2 border rounded text-right"
                  />
                  {errors.items?.[index]?.quantity && (
                    <p className="text-red-500 text-xs">
                      {errors.items[index]?.quantity?.message}
                    </p>
                  )}
                </td>
                <td className="py-2">
                  <input
                    type="number"
                    {...register(`items.${index}.price`, {
                      valueAsNumber: true,
                    })}
                    placeholder="0.00"
                    className="w-full p-2 border rounded text-right"
                  />
                  {errors.items?.[index]?.price && (
                    <p className="text-red-500 text-xs">
                      {errors.items[index]?.price?.message}
                    </p>
                  )}
                </td>
                <td className="py-2 text-right">
                  ${((field.quantity || 0) * (field.price || 0)).toFixed(2)}
                </td>
                <td className="py-2">
                  <button
                    type="button"
                    onClick={() => remove(index)}
                    className="p-1 text-red-500 hover:bg-red-50 rounded"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button
          type="button"
          onClick={() =>
            append({
              id: crypto.randomUUID(),
              name: "",
              price: 0,
              stock: 0,
              description: "",
              quantity: 1,
            })
          }
          className="mt-4 text-green-600 font-medium hover:text-green-700"
        >
          + Add Item
        </button>
      </div>

      {/* Footer Options */}
      <div className="mt-8 pt-8 border-t border-gray-200 flex justify-between items-start">
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <label className="text-sm text-gray-600">Status:</label>
            <select {...register("status")} className="border rounded p-1">
              <option value="pending">Pending</option>
              <option value="paid">Paid</option>
            </select>
          </div>
          <div className="flex items-center space-x-2">
            <input type="checkbox" {...register("isDraft")} />
            <label className="text-sm text-gray-600">Save as Draft</label>
          </div>
        </div>
        <div className="w-1/3 space-y-2 text-right">
          <div className="flex justify-between text-gray-600">
            <span>Subtotal:</span>
            <span>${calculations.subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-gray-600">
            <span>Tax (10%):</span>
            <span>${calculations.tax.toFixed(2)}</span>
          </div>
          <div className="flex justify-between font-bold text-lg">
            <span>Total:</span>
            <span>${calculations.total.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
