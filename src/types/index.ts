export interface Client {
  id: string;
  name: string;
  type: 'COMPANY' | 'CONDOMINIUM';
  address: string;
  contactEmail: string;
  contactPhone: string;
  legalRepresentative: string;
  isActive: boolean;
  createdAt: Date;
}

export interface Debtor {
  id: string;
  name: string;
  documentId: string;
  email: string;
  phone: string;
  address: string;
}

export interface Debt {
  id: string;
  clientId: string;
  debtorIds: string[];
  amount: number;
  description: string;
  status: 'PENDING' | 'IN_PROCESS' | 'PAID';
  dueDate: Date;
  createdAt: Date;
}

export interface PaymentAgreement {
  id: string;
  debtId: string;
  totalAmount: number;
  installments: number;
  interestRate: number;
  status: 'ACTIVE' | 'COMPLETED' | 'FAILED';
  startDate: Date;
  endDate: Date;
}

export interface Payment {
  id: string;
  agreementId?: string;
  debtId: string;
  amount: number;
  paymentDate: Date;
  paymentMethod: 'CASH' | 'BANK_TRANSFER' | 'CREDIT_CARD';
  status: 'COMPLETED' | 'PENDING' | 'FAILED';
}

export interface LegalCase {
  id: string;
  debtId: string;
  status: 'PENDING' | 'IN_PROGRESS' | 'RESOLVED';
  caseNumber: string;
  courtName: string;
  filingDate: Date;
  lastUpdate: Date;
  description: string;
}