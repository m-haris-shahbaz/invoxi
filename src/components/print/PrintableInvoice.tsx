"use client";
import { InvoiceFormData } from "@/schemas";
import { format } from "date-fns";
import { forwardRef } from "react";

interface PrintableInvoiceProps {
  data: InvoiceFormData;
  invoiceNumber: string;
}

const PrintableInvoice = forwardRef<HTMLDivElement, PrintableInvoiceProps>(
  ({ data, invoiceNumber }, ref) => {
    const subtotal = data.items?.reduce(
      (acc, item) => acc + (item.quantity || 0) * (item.price || 0),
      0
    );
    const tax = subtotal * 0.1;
    const total = subtotal + tax;

    const customer = data?.customer || {
      name: "[Customer Name]",
      company: "[Company Name]",
      email: "[Email]",
      phoneNumber: "[Phone]",
    };

    return (
      <div
        ref={ref}
        className="bg-white p-8"
        style={{ width: "210mm", minHeight: "297mm" }}
      >
        {/* Header */}
        <div className="flex justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold">INVOICE</h1>
            <p className="text-gray-600 mt-1">#{invoiceNumber}</p>
          </div>
          <div className="text-right">
            <p>Issue Date: {format(new Date(), "dd MMM yyyy")}</p>
            {data.paymentDue && (
              <p>
                Due Date: {format(new Date(data.paymentDue), "dd MMM yyyy")}
              </p>
            )}
          </div>
        </div>

        {/* Addresses */}
        <div className="flex justify-between mb-8">
          <div>
            <h3 className="font-bold mb-2">From:</h3>
            <p>Your Company Name</p>
            <p>123 Business Street</p>
            <p>City, Country</p>
          </div>
          <div className="text-right">
            <h3 className="font-bold mb-2">Bill To:</h3>
            <p>{customer.name}</p>
            <p>{customer.company}</p>
            <p>{customer.email}</p>
            <p>{customer.phoneNumber}</p>
          </div>
        </div>

        {/* Items */}
        <table className="w-full mb-8">
          <thead>
            <tr className="border-b-2 border-gray-300">
              <th className="text-left py-2">Item</th>
              <th className="text-right py-2">Quantity</th>
              <th className="text-right py-2">Price</th>
              <th className="text-right py-2">Total</th>
            </tr>
          </thead>
          <tbody>
            {data.items.map((item, index) => (
              <tr key={item.id} className="border-b">
                <td className="py-2">
                  <p className="font-medium">{item.name}</p>
                  <p className="text-sm text-gray-600">{item.description}</p>
                </td>
                <td className="text-right py-2">{item.quantity}</td>
                <td className="text-right py-2">${item.price}</td>
                <td className="text-right py-2">
                  ${(item.quantity * item.price).toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Totals */}
        <div className="flex justify-end">
          <div className="w-64">
            <div className="flex justify-between py-2">
              <span>Subtotal:</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between py-2 border-b">
              <span>Tax (10%):</span>
              <span>${tax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between py-2 font-bold text-lg">
              <span>Total:</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 pt-8 border-t">
          <div className="flex justify-between items-center">
            <div>
              <p className="font-medium">Payment Status:</p>
              <p className="text-lg font-bold text-green-600">
                {data.status.toUpperCase()}
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-600">
                Thank you for your business
              </p>
              <p className="text-sm text-gray-600">contact@yourcompany.com</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
);

PrintableInvoice.displayName = "PrintableInvoice";
export default PrintableInvoice;
