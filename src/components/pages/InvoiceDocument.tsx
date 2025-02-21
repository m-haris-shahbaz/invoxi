"use client";
import { useInvoiceData } from "@/hooks/useInvoiceData";
import { format } from "date-fns";

export default function InvoiceDocument() {
  const { customer, items, paymentDetails, calculations } = useInvoiceData();

  return (
    <div className="border border-gray-200 bg-white rounded-lg p-8 min-h-[600px] shadow-sm">
      {/* Header */}
      <div className="flex justify-between items-start mb-8">
        <div>
          <h3 className="text-2xl font-bold text-gray-800">INVOICE</h3>
          <p className="text-gray-500 mt-1">
            INV-
            {Math.floor(Math.random() * 1000)
              .toString()
              .padStart(3, "0")}
          </p>
        </div>
        <div className="text-right">
          <p className="text-gray-600">
            Issue Date: {format(new Date(), "dd MMM yyyy")}
          </p>
          {paymentDetails.dueDate && (
            <p className="text-gray-600">
              Due Date:{" "}
              {format(new Date(paymentDetails.dueDate), "dd MMM yyyy")}
            </p>
          )}
        </div>
      </div>

      {/* Company & Customer Info */}
      <div className="flex justify-between mb-8">
        <div className="w-1/2">
          <h4 className="font-semibold text-gray-700 mb-2">From</h4>
          <div className="text-gray-600">
            <p className="font-medium">Your Company Name</p>
            <p>123 Business Street</p>
            <p>City, Country</p>
            <p>contact@company.com</p>
          </div>
        </div>
        <div className="w-1/2">
          <h4 className="font-semibold text-gray-700 mb-2">Bill To</h4>
          <div className="text-gray-600">
            <p className="font-medium">{customer.name || "[Customer Name]"}</p>
            <p>{customer.company || "[Company]"}</p>
            <p>{customer.email || "[Email]"}</p>
            <p>{customer.phoneNumber || "[Phone]"}</p>
          </div>
        </div>
      </div>

      {/* Items Table */}
      <div className="mb-8">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-300">
              <th className="py-2 text-left text-gray-600">Item</th>
              <th className="py-2 text-right text-gray-600">Qty</th>
              <th className="py-2 text-right text-gray-600">Price</th>
              <th className="py-2 text-right text-gray-600">Total</th>
            </tr>
          </thead>
          <tbody>
            {items.length > 0 ? (
              items.map((item, index) => (
                <tr key={item.id} className="border-b border-gray-100">
                  <td className="py-3">
                    <p className="font-medium text-gray-800">{item.name}</p>
                    <p className="text-sm text-gray-500">{item.description}</p>
                  </td>
                  <td className="py-3 text-right">{item.quantity}</td>
                  <td className="py-3 text-right">${item.price?.toFixed(2)}</td>
                  <td className="py-3 text-right">
                    ${(item.quantity! * item.price!).toFixed(2)}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="py-3 text-center text-gray-500">
                  No items added yet
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Totals */}
      <div className="border-t border-gray-200 pt-4">
        <div className="w-1/2 ml-auto space-y-2">
          <div className="flex justify-between text-gray-600">
            <span>Subtotal:</span>
            <span>${calculations.subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-gray-600">
            <span>Tax (10%):</span>
            <span>${calculations.tax.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-lg font-bold text-gray-800 pt-2 border-t border-gray-200">
            <span>Total:</span>
            <span>${calculations.total.toFixed(2)}</span>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-8 pt-8 border-t border-gray-200">
        <div className="text-gray-500 text-sm">
          <p className="font-medium mb-1">
            Payment Status:
            <span
              className={`ml-2 px-2 py-1 rounded-full text-xs ${
                paymentDetails.status === "paid"
                  ? "bg-green-100 text-green-800"
                  : "bg-yellow-100 text-yellow-800"
              }`}
            >
              {paymentDetails.status?.toUpperCase()}
            </span>
          </p>
          <p>Thank you for your business!</p>
        </div>
      </div>
    </div>
  );
}
