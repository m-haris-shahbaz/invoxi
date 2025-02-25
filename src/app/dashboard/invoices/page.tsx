"use client";
import { Button } from "@/components/ui/button";
import { Plus, Search, Filter, MoreVertical, FileText } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function InvoicesPage() {
  const invoices = [
    {
      id: "befjbhejbfe",
      customer: "John Doe",
      amount: 1299.95,
      status: "paid",
      date: "2024-01-01",
      dueDate: "2024-01-15",
      invoiceNumber: "INV-001",
      email: "john@example.com",
    },
    {
      id: "befj2hejbfe",
      customer: "Alice Smith",
      amount: 799.5,
      status: "pending",
      date: "2024-01-03",
      dueDate: "2024-01-17",
      invoiceNumber: "INV-002",
      email: "alice@example.com",
    },
  ];

  return (
    <div className="container mx-auto py-6 space-y-6">
      {/* Header Section */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold text-gray-800">Invoices</h1>
          <p className="text-gray-500 text-sm mt-1">Manage your invoices</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Plus className="w-4 h-4 mr-2" />
          New Invoice
        </Button>
      </div>

      {/* Search and Filter Section */}
      <div className="flex gap-4 items-center">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search invoices..."
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <Button variant="outline" className="gap-2">
          <Filter className="w-4 h-4" />
          Filter
        </Button>
      </div>

      {/* Invoices Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {invoices.map((invoice) => (
          <div
            key={invoice.id}
            className="bg-white rounded-lg border border-gray-200 hover:shadow-lg transition-shadow duration-200"
          >
            <div className="p-5">
              {/* Card Header */}
              <div className="flex justify-between items-start mb-4">
                <div>
                  <span className="text-xs font-medium text-gray-500">
                    {invoice.date}
                  </span>
                  <h3 className="font-semibold text-gray-800">
                    {invoice.invoiceNumber}
                  </h3>
                </div>
                <Button variant="ghost" size="icon">
                  <MoreVertical className="w-4 h-4" />
                </Button>
              </div>

              {/* Card Content */}
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-gray-400" />
                  <span className="text-sm font-medium">
                    {invoice.customer}
                  </span>
                </div>
                <div className="text-sm text-gray-500">{invoice.email}</div>
                <div className="flex justify-between items-center pt-2">
                  <span className="font-semibold text-gray-900">
                    ${invoice.amount.toFixed(2)}
                  </span>
                  <span
                    className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                      invoice.status === "paid"
                        ? "bg-green-100 text-green-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {invoice.status.charAt(0).toUpperCase() +
                      invoice.status.slice(1)}
                  </span>
                </div>
              </div>
            </div>

            {/* Card Footer */}
            <div className="border-t p-4">
              <Link href={`/dashboard/invoices/${invoice.id}`}>
                <Button variant="ghost" className="w-full text-blue-600">
                  View Details
                </Button>
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {invoices.length === 0 && (
        <div className="text-center py-12 bg-white rounded-lg border">
          <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900">No invoices yet</h3>
          <p className="text-gray-500 mt-1">
            Create your first invoice to get started
          </p>
          <Button className="mt-4">
            <Plus className="w-4 h-4 mr-2" />
            New Invoice
          </Button>
        </div>
      )}
    </div>
  );
}
