import React from "react";
import { useFormContext } from "react-hook-form";
import type { InvoiceFormData } from "@/schemas";

export default function CustomerDetails() {
  const {
    register,
    formState: { errors },
  } = useFormContext<InvoiceFormData>();

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Customer Name
        </label>
        <input
          type="text"
          {...register("customer.name")}
          className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
        />
        {errors.customer?.name && (
          <p className="text-red-500 text-sm">{errors.customer.name.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Email Address
        </label>
        <input
          type="email"
          {...register("customer.email")}
          className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
        />
        {errors.customer?.email && (
          <p className="text-red-500 text-sm">
            {errors.customer.email.message}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Company Name
        </label>
        <input
          type="text"
          {...register("customer.company")}
          className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
        />
        {errors.customer?.company && (
          <p className="text-red-500 text-sm">
            {errors.customer.company.message}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Phone Number
        </label>
        <input
          type="tel"
          {...register("customer.phoneNumber")}
          className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
        />
        {errors.customer?.phoneNumber && (
          <p className="text-red-500 text-sm">
            {errors.customer.phoneNumber.message}
          </p>
        )}
      </div>
    </div>
  );
}
