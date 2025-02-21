"use client";
import CustomerDetails from "@/components/forms/CustomerDetails";
import FormWrapper from "@/components/forms/FormProvider";
import { multiStepSchema } from "@/schemas";
import { useState } from "react";
import { useFormContext } from "react-hook-form";
import ProductDetails from "@/components/forms/ProductDetails";
import PaymentDetails from "@/components/forms/PaymentDetails";
import { SquarePen } from "lucide-react";
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
    <div className="px-32 flex h-screen bg-gray-50">
      <FormWrapper>
        {/* Left Section - Form Steps */}
        <div className="flex flex-col w-1/2 space-y-4 border-r p-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold mb-4">Invoice Details</h2>
            <button className="border p-2 rounded-lg flex justify-center items-center">
              <SquarePen className="mr-2 w-4 h-4" />
              Save as Draft
            </button>
          </div>
          <StepNavigator />
        </div>

        {/* Right Section - Invoice Preview */}
        <div className="w-1/2 p-6">
          <InvoiceDocument />
        </div>
      </FormWrapper>
    </div>
  );
}
