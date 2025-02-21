"use client";
import CustomerDetails from "@/components/forms/CustomerDetails";
import FormWrapper from "@/components/forms/FormProvider";
import { multiStepSchema } from "@/schemas";
import { useState } from "react";
import { useFormContext } from "react-hook-form";

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
      {/* Add other step components here */}

      <div className="flex justify-between pt-4">
        <button
          onClick={handlePrevious}
          disabled={currentStep === 0}
          className="px-4 py-2 bg-gray-200 rounded-lg disabled:opacity-50"
        >
          Previous
        </button>
        <button
          onClick={handleNext}
          disabled={currentStep === steps.length - 1}
          className="px-4 py-2 bg-green-500 text-white rounded-lg disabled:opacity-50"
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
          <h2 className="text-xl font-semibold mb-4">Invoice Details</h2>
          <StepNavigator />
        </div>

        {/* Right Section - Invoice Preview */}
        <div className="w-1/2 p-6">
          <div className="border border-gray-200 bg-white rounded-lg p-6 min-h-[600px]">
            <h3 className="text-2xl font-bold mb-6">INVOICE</h3>
            <div className="space-y-4">
              <div className="border-b pb-4">
                <p className="text-gray-600">Invoice #: INV-001</p>
                <p className="text-gray-600">
                  Date: {new Date().toLocaleDateString()}
                </p>
              </div>
              <div className="border-b pb-4">
                <p className="font-semibold mb-2">Bill To:</p>
                <p className="text-gray-600">[Customer Name]</p>
                <p className="text-gray-600">[Customer Email]</p>
              </div>
              <div className="border-b pb-4">
                <p className="font-semibold mb-2">Description:</p>
                <p className="text-gray-600">[Description will appear here]</p>
              </div>
              <div className="text-right">
                <p className="font-semibold">Total Amount:</p>
                <p className="text-2xl font-bold text-green-600">$0.00</p>
              </div>
            </div>
          </div>
        </div>
      </FormWrapper>
    </div>
  );
}
