import { z } from "zod";

const customerDetailsSchema = z.object({
  id: z.string(),
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email"),
  company: z.string().min(2, "Company name is required"),
  phoneNumber: z.string().min(10, "Valid phone number is required"),
});

const productItemSchema = z.object({
  id: z.string(),
  name: z.string().min(2, "Product name is required"),
  price: z.number().min(0, "Price must be positive"),
  stock: z.number().min(0, "Stock must be positive"),
  description: z.string(),
  quantity: z.number().min(1, "Quantity must be at least 1"),
});

// Step schemas
export const stepOneSchema = z.object({
  customer: customerDetailsSchema,
});

export const stepTwoSchema = z.object({
  items: z
    .array(productItemSchema)
    .min(1, "At least one product must be added"),
});

export const stepThreeSchema = z.object({
  paymentDue: z.string(),
  status: z.enum(["paid", "pending"]),
  isDraft: z.boolean(),
});

export const multiStepSchema = [
  stepOneSchema,
  stepTwoSchema,
  stepThreeSchema,
] as const;

// Complete form schema
export const invoiceSchema = z.object({
  customer: customerDetailsSchema,
  items: z.array(productItemSchema),
  paymentDue: z.string(),
  status: z.enum(["paid", "pending"]),
  isDraft: z.boolean(),
});

export type StepOne = z.infer<typeof stepOneSchema>;
export type StepTwo = z.infer<typeof stepTwoSchema>;
export type StepThree = z.infer<typeof stepThreeSchema>;
export type InvoiceFormData = z.infer<typeof invoiceSchema>;
