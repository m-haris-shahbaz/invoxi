export type CustomerDetails = {
  id: string;
  name: string;
  email: string;
  company: string;
  phoneNumber: string;
};

export type Product = {
  id: string;
  name: string;
  price: number;
  stock: number;
  description: string;
};

export type Invoice = {
  id: string;
  customer: CustomerDetails;
  items: (Product & { quantity: number })[];
  paymentDue: string;
  status: "paid" | "pending";
  isDraft: boolean;
  total: number;
};

export type InvoiceStore = {
  invoices: Invoice[];
  addInvoice: (invoice: Invoice) => void;
  removeInvoice: (id: string) => void;
};
