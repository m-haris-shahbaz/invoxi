"use client";
import FormWrapper from "@/components/forms/FormProvider";
import { InvoiceFormData } from "@/schemas";
import { useRef } from "react";
import { useFormContext } from "react-hook-form";
import { Save, Printer, Download, Send } from "lucide-react";
import InvoiceDocument from "@/components/pages/InvoiceDocument";
import { useReactToPrint } from "react-to-print";
import PrintableInvoice from "@/components/print/PrintableInvoice";

// Create a separate component for the content
function InvoiceContent() {
  const documentRef = useRef<HTMLDivElement>(null);
  const printRef = useRef<HTMLDivElement>(null);
  const { watch } = useFormContext<InvoiceFormData>();
  const formData = watch();

  const handlePrint = useReactToPrint({
    contentRef: printRef,
    documentTitle: "Invoice",
    pageStyle: `
      @page {
        size: A4;
        margin: 0;
      }
      @media print {
        body {
          margin: 0;
          padding: 0;
          -webkit-print-color-adjust: exact;
        }
      }
    `,
  });

  return (
    <div className="container mx-auto">
      <div className="lg:flex">
        {/* Mobile Toolbar */}
        <div className="lg:hidden p-4 space-y-4">
          <div className="flex space-x-2 overflow-x-auto pb-2">
            <button className="flex items-center gap-2 px-4 py-2 text-sm text-gray-600 bg-white rounded-md border shrink-0">
              <Save className="w-4 h-4" />
              Save
            </button>
            <button
              onClick={() => handlePrint()}
              className="flex items-center gap-2 px-4 py-2 text-sm text-gray-600 bg-white rounded-md border shrink-0"
            >
              <Printer className="w-4 h-4" />
              Print
            </button>
            <button className="flex items-center gap-2 px-4 py-2 text-sm text-gray-600 bg-white rounded-md border shrink-0">
              <Download className="w-4 h-4" />
              PDF
            </button>
            <button className="flex items-center gap-2 px-4 py-2 text-sm text-gray-600 bg-white rounded-md border shrink-0">
              <Send className="w-4 h-4" />
              Send
            </button>
          </div>
          <button className="w-full bg-gradient-to-b from-gray-700 to-gray-800 text-white px-4 py-2 rounded-md hover:bg-green-600">
            Mark as Paid
          </button>
        </div>

        {/* Desktop Sidebar */}
        <div className="hidden lg:block w-80 shrink-0 py-6 pr-6">
          <div className="space-y-4 fixed">
            <div className="bg-white p-4 w-72 border rounded-lg shadow-sm space-y-3">
              <h2 className="font-semibold text-gray-800">Tools</h2>
              <div className="space-y-2">
                <button className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-md">
                  <Save className="w-4 h-4" />
                  Save Draft
                </button>
                <button
                  onClick={() => handlePrint()}
                  className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-md"
                >
                  <Printer className="w-4 h-4" />
                  Print
                </button>
                <button className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-md">
                  <Download className="w-4 h-4" />
                  Download PDF
                </button>
                <button className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-md">
                  <Send className="w-4 h-4" />
                  Send Invoice
                </button>
              </div>
            </div>

            <div className="bg-white p-4 border rounded-lg shadow-sm">
              <h2 className="font-semibold text-gray-800 mb-3">
                Quick Actions
              </h2>
              <button className="w-full bg-gradient-to-b from-gray-700 to-gray-800 text-white px-4 py-2 rounded-md hover:bg-green-600">
                Mark as Paid
              </button>
            </div>
          </div>
        </div>

        {/* Main Content - Centered Invoice */}
        <div className="flex-1 py-6 overflow-x-auto px-2 lg:px-0">
          <div className="flex justify-center min-w-[794px]">
            <div className="transform scale-[0.90] lg:scale-80 origin-top">
              <InvoiceDocument ref={documentRef} />
            </div>
          </div>
        </div>
      </div>

      {/* Hidden print template */}
      <div className="hidden">
        <PrintableInvoice
          ref={printRef}
          data={formData}
          invoiceNumber="INV-001"
        />
      </div>
    </div>
  );
}

// Main page component
export default function Home() {
  return (
    <FormWrapper>
      <InvoiceContent />
    </FormWrapper>
  );
}
