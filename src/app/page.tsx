"use client";
import CustomerDetails from "@/components/forms/CustomerDetails";
import FormWrapper from "@/components/forms/FormProvider";
import { multiStepSchema } from "@/schemas";
import { useState } from "react";
import { useFormContext } from "react-hook-form";
import ProductDetails from "@/components/forms/ProductDetails";
import PaymentDetails from "@/components/forms/PaymentDetails";
import { SquarePen, Save, Printer, Download, Send } from "lucide-react";
import InvoiceDocument from "@/components/pages/InvoiceDocument";

function StepNavigator({}) {
  const steps = [
    {
      id: 0,
      title: "Customer Details",
      fields: [
        "customer.name",
        "customer.email",
        "customer.phoneNumber",
        "customer.company",
      ],
    },
    {
      id: 1,
      title: "Product Details",
      fields: ["items"],
    },
    {
      id: 2,
      title: "Payment Details",
      fields: ["paymentDue", "status", "isDraft"],
    },
  ];
  const [currentStep, setCurrentStep] = useState(0);
  const {
    trigger,
    formState: { errors },
  } = useFormContext();

  const handleNext = async () => {
    const fields = steps[currentStep].fields;
    const isValid = await trigger(fields);
    if (isValid) {
      setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
    }
  };

  const handlePrevious = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  };

  return (
    <div className="space-y-6">
      {currentStep === 0 && <CustomerDetails />}
      {currentStep === 1 && <ProductDetails />}
      {currentStep === 2 && <PaymentDetails />}

      <div className="flex justify-between pt-4">
        <button
          onClick={handlePrevious}
          disabled={currentStep === 0}
          className="px-4 py-2 w-1/3 border rounded-lg disabled:opacity-50"
        >
          Previous
        </button>
        <button
          onClick={handleNext}
          disabled={currentStep === steps.length - 1}
          className="px-4 py-2 w-1/2 font-semibold bg-gradient-to-b from-green-400 to-green-600 text-white rounded-lg disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <FormWrapper>
        <div className="flex gap-6 px-4 py-6 max-w-[1400px] mx-auto">
          <div className="w-64 space-y-4">
            <div className="bg-white p-4 border rounded-lg shadow-sm space-y-3">
              <h2 className="font-semibold text-gray-800">Tools</h2>
              <div className="space-y-2">
                <button className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-md">
                  <Save className="w-4 h-4" />
                  Save Draft
                </button>
                <button className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-md">
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
              <button className="w-full bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600">
                Mark as Paid
              </button>
            </div>
          </div>

          {/* Document Container */}
          <div className="flex-1 flex justify-center">
            <div className="inline-block">
              <InvoiceDocument />
            </div>
          </div>
        </div>
      </FormWrapper>
    </div>
  );
}
