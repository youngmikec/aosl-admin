import { User } from "./user";

export type InvoiceService = {
  serviceId: string;
  name: string;
  amount: number;
  quantity: number;
  totalAmount: number;
}

export type Invoice = {
  id: string;
  code: string;
  invoiceCode: string;
  issueDate: Date;
  dueDate: Date;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  clientAddress: string;
  invoiceUrl: string;
  services: InvoiceService[];

  status: string;
  companyName: string;
  // companyAddress: string;
  companyPhone: string;
  companyEmail: string;

  subTotal: number;
  tax: number;
  discount: number; // in percentage
  totalAmount: number;
  amountPaid: number;
  balanceAmount: number;
  currency: string;
  paymentMethod: string;
  paymentGateway: string;

  notes: string;
  createdAt: Date;
  createdBy: User;
  updatedBy: User;
  updatedAt: Date;
  deleted: boolean;
  deletedAt: Date;
  deletedBy: string;
};
  