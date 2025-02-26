"use client";

import React, { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";

interface Company {
  id: number;
  name: string;
}

interface CompanySelectorProps {
  companies: Company[];
  selectedCompany?: Company;
  onCompanyChange: (company: Company) => void;
}

export default function CompanySelector({
  companies,
  selectedCompany,
  onCompanyChange,
}: CompanySelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Default to first company if none selected
  const current = selectedCompany || companies[0];

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  // Select company and close dropdown
  const selectCompany = (company: Company) => {
    onCompanyChange(company);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        className="flex items-center justify-between w-64 px-4 py-2 text-sm text-gray-700 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <span className="block truncate">{current.name}</span>
        <ChevronDown
          className={`w-4 h-4 ml-2 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isOpen && (
        <div className="absolute z-10 w-full mt-1 bg-white rounded-md shadow-lg">
          <ul className="py-1 text-sm text-gray-700" role="listbox">
            {companies.map((company) => (
              <li
                key={company.id}
                className={`px-4 py-2 cursor-pointer hover:bg-gray-100 ${
                  current.id === company.id ? "bg-blue-50 text-blue-700" : ""
                }`}
                role="option"
                aria-selected={current.id === company.id}
                onClick={() => selectCompany(company)}
              >
                {company.name}
              </li>
            ))}
            <li
              className="border-t border-gray-100 px-4 py-2 cursor-pointer text-blue-600 hover:bg-blue-50 flex items-center"
              onClick={() => setIsOpen(false)}
            >
              <span className="text-lg mr-1">+</span> Add new company
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
