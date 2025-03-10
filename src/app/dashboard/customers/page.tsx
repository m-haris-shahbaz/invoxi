"use client";
import { Button } from "@/components/ui/button";
import {
  Plus,
  Search,
  Filter,
  MoreVertical,
  Mail,
  Phone,
  Building,
} from "lucide-react";
import Link from "next/link";

export default function CustomersPage() {
  const customers = [
    {
      id: "1",
      name: "John Doe",
      email: "john@example.com",
      company: "Tech Corp",
      phone: "+1 234 567 890",
      totalInvoices: 5,
      totalSpent: 2499.95,
      status: "active",
      lastInvoice: "2024-01-15",
    },
    // Add more customer data as needed
  ];

  return (
    <div className="container mx-auto py-6 space-y-6">
      {/* Header Section */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold text-gray-800">Customers</h1>
          <p className="text-gray-500 text-sm mt-1">
            Manage your customer base
          </p>
        </div>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Add Customer
        </Button>
      </div>

      {/* Search and Filter */}
      <div className="flex gap-4 items-center">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search customers..."
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <Button variant="outline" className="gap-2">
          <Filter className="w-4 h-4" />
          Filter
        </Button>
      </div>

      {/* Customers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {customers.map((customer) => (
          <div
            key={customer.id}
            className="bg-white rounded-lg border border-gray-200 hover:shadow-lg transition-shadow duration-200"
          >
            <div className="p-5">
              <div className="flex justify-between items-start mb-4">
                <h3 className="font-semibold text-gray-800">{customer.name}</h3>
                <Button variant="ghost" size="icon">
                  <MoreVertical className="w-4 h-4" />
                </Button>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-2 text-gray-600">
                  <Building className="w-4 h-4" />
                  <span className="text-sm">{customer.company}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Mail className="w-4 h-4" />
                  <span className="text-sm">{customer.email}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Phone className="w-4 h-4" />
                  <span className="text-sm">{customer.phone}</span>
                </div>
                <div className="pt-3 border-t">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Total Invoices</span>
                    <span className="font-medium">
                      {customer.totalInvoices}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm mt-1">
                    <span className="text-gray-500">Total Spent</span>
                    <span className="font-medium">
                      ${customer.totalSpent.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t p-4">
              <Link href={`/dashboard/customers/${customer.id}`}>
                <Button variant="ghost" className="w-full text-blue-600">
                  View Details
                </Button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
