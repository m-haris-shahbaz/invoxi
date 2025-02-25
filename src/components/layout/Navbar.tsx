"use client";
import React, { useEffect, useState } from "react";
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
  Menu,
  X,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { useAuth } from "@/context/AuthContext";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user } = useAuth();
  const pathname = usePathname();

  const navItems = [
    { label: "Dashboard", href: "/dashboard", icon: HomeIcon },
    { label: "Invoices", href: "/dashboard/invoices", icon: FileText },
    { label: "Products", href: "/dashboard/products", icon: Package },
    { label: "Customers", href: "/dashboard/customers", icon: Users },
  ];

  const isRouteActive = (href: string) => {
    return pathname === "/" ? href === "/dashboard" : pathname === href;
  };

  return (
    <nav className="border-b bg-white">
      <div className="container mx-auto px-4 py-3">
        {/* Top Bar */}
        <div className="flex items-center justify-between w-full">
          {/* Logo */}
          <Link href="/" className="font-bold text-xl">
            Invoxi
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
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

          {/* Right Section */}
          <div className="flex items-center gap-2">
            {/* Desktop User Menu */}
            <div className="hidden lg:block">
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

            {/* Mobile Menu Button */}
            <Button
              variant={"ghost"}
              className="lg:hidden p-2 hover:bg-gray-100 rounded-md"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <div className="lg:hidden mt-4 pb-4">
            <div className="flex flex-col space-y-2">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-2 px-4 py-2 rounded-md ${
                    isRouteActive(item.href)
                      ? "bg-blue-50 text-blue-500 font-bold"
                      : "text-gray-600 hover:bg-gray-50"
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <item.icon className="w-4 h-4" />
                  {item.label}
                </Link>
              ))}
              <Separator className="my-2" />
              <div className="px-4 py-2 text-sm text-gray-600">
                Signed in as <span className="font-medium">John Doe</span>
              </div>
              <Link
                href="/settings"
                className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-md"
              >
                <Settings className="w-4 h-4" />
                Settings
              </Link>
              <button className="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-md w-full text-left">
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
