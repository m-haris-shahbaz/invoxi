import { DollarSign, Users, FileText, TrendingUp } from "lucide-react";

const stats = [
  {
    name: "Total Revenue",
    value: "$45,231.89",
    icon: DollarSign,
    change: "+20.1%",
  },
  { name: "Pending Invoices", value: "23", icon: FileText, change: "-4.5%" },
  { name: "Active Clients", value: "48", icon: Users, change: "+12.5%" },
  { name: "Growth Rate", value: "24.5%", icon: TrendingUp, change: "+8.2%" },
];

const recentInvoices = [
  {
    id: "INV001",
    client: "Acme Corp",
    amount: "$1,234.56",
    status: "Paid",
    date: "2024-01-15",
  },
  {
    id: "INV002",
    client: "Globex Inc",
    amount: "$2,345.67",
    status: "Pending",
    date: "2024-01-14",
  },
  {
    id: "INV003",
    client: "Tech Labs",
    amount: "$3,456.78",
    status: "Overdue",
    date: "2024-01-13",
  },
];

const activities = [
  {
    id: 1,
    description: "New invoice created for Acme Corp",
    time: "2 hours ago",
  },
  {
    id: 2,
    description: "Payment received from Tech Labs",
    time: "4 hours ago",
  },
  {
    id: 3,
    description: "Invoice reminder sent to Globex Inc",
    time: "6 hours ago",
  },
];

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gray-50 w-full py-6 space-y-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
        <div className="text-sm text-gray-500">Welcome back, Admin</div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.name}
            className="bg-white overflow-hidden rounded-xl border border-gray-100"
          >
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0 p-3 bg-gray-50 rounded-lg">
                  <stat.icon className="h-6 w-6 text-gray-600" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      {stat.name}
                    </dt>
                    <dd className="flex items-baseline">
                      <div className="text-2xl font-semibold text-gray-900">
                        {stat.value}
                      </div>
                      <div
                        className={`ml-2 flex items-baseline text-sm font-semibold ${
                          stat.change.startsWith("+")
                            ? "text-green-600"
                            : "text-red-600"
                        }`}
                      >
                        {stat.change}
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-2">
        {/* Recent Invoices */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">
                Recent Invoices
              </h2>
              <button className="text-sm text-blue-600 hover:text-blue-700">
                View all
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      ID
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Client
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Amount
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {recentInvoices.map((invoice) => (
                    <tr key={invoice.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3 text-sm text-gray-900">
                        {invoice.id}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-900">
                        {invoice.client}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-900">
                        {invoice.amount}
                      </td>
                      <td className="px-4 py-3 text-sm">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                            ${
                              invoice.status === "Paid"
                                ? "bg-green-100 text-green-800"
                                : invoice.status === "Pending"
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-red-100 text-red-800"
                            }`}
                        >
                          {invoice.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Activity Feed */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">
                Recent Activity
              </h2>
              <button className="text-sm text-blue-600 hover:text-blue-700">
                View all
              </button>
            </div>
            <div className="flow-root">
              <ul className="-mb-8">
                {activities.map((activity, index) => (
                  <li key={activity.id}>
                    <div className="relative pb-8">
                      {index !== activities.length - 1 && (
                        <span
                          className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200"
                          aria-hidden="true"
                        />
                      )}
                      <div className="relative flex space-x-3">
                        <div className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center">
                          <FileText className="h-4 w-4 text-white" />
                        </div>
                        <div className="min-w-0 flex-1 pt-1.5">
                          <p className="text-sm text-gray-500">
                            {activity.description}
                          </p>
                          <p className="mt-1 text-xs text-gray-400">
                            {activity.time}
                          </p>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
