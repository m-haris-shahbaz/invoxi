"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import {
  FileText,
  Package,
  Users,
  Settings,
  ChevronDown,
  LogOut,
  User,
  HomeIcon,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const navItems = [
    { label: "Dashboard", href: "/dashboard", icon: HomeIcon },
    { label: "Invoices", href: "/dashboard/invoices", icon: FileText },
    { label: "Products", href: "/dashboard/products", icon: Package },
    { label: "Customers", href: "/dashboard/customers", icon: Users },
  ];
  const isRouteActive = (href: string) => {
    const pathname = usePathname();
    return pathname === "/" ? href === "/dashboard" : pathname === href;
  };

  return (
    <nav className="border-b bg-white">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo and Nav Items */}
          <div className="flex items-center gap-8">
            <Link href="/" className="font-bold text-xl">
              Invoxi
            </Link>
            <Separator orientation="vertical" className="h-6" />
            <div className="flex items-center gap-1">
              {navItems.map((item) => (
                <Button key={item.href} variant="ghost" asChild>
                  <Link
                    href={item.href}
                    className={`flex items-center gap-2 ${
                      isRouteActive(item.href)
                        ? "text-blue-500 font-bold"
                        : "text-gray-600"
                    }`}
                  >
                    <item.icon className="w-4 h-4" />
                    {item.label}
                  </Link>
                </Button>
              ))}
            </div>
          </div>

          {/* User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center gap-2">
                <User className="w-4 h-4" />
                <span>John Doe</span>
                <ChevronDown className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Settings className="w-4 h-4 mr-2" />
                Settings
              </DropdownMenuItem>
              <DropdownMenuItem className="text-red-600">
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </nav>
  );
}
