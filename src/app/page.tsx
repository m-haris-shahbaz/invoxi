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
    <div className="flex gap-6 px-4 py-6 max-w-[1400px] mx-auto">
      {/* Toolbar */}
      <div className="w-64 space-y-4">
        <div className="bg-white p-4 border rounded-lg shadow-sm space-y-3">
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
          <h2 className="font-semibold text-gray-800 mb-3">Quick Actions</h2>
          <button className="w-full bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600">
            Mark as Paid
          </button>
        </div>
      </div>

      {/* Document Container */}
      <div className="flex-1 flex justify-center">
        <div className="inline-block">
          <InvoiceDocument ref={documentRef} />
        </div>
      </div>

      {/* Print template - Hidden but rendered */}
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
    <div className="min-h-screen bg-gray-50">
      <FormWrapper>
        <InvoiceContent />
      </FormWrapper>
    </div>
  );
}
