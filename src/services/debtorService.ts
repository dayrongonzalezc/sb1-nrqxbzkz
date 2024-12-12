import { Debtor } from '../types';

// Simulated database
let debtors: Debtor[] = [
  {
    id: '1',
    name: 'John Doe',
    documentId: '123-45-6789',
    email: 'john@example.com',
    phone: '(555) 123-4567',
    address: '123 Main St, Apt 4B',
  },
];

export const getDebtors = async (): Promise<Debtor[]> => {
  return debtors;
};

export const getDebtorById = async (id: string): Promise<Debtor | undefined> => {
  return debtors.find(debtor => debtor.id === id);
};

export const getDebtorsByIds = async (ids: string[]): Promise<Debtor[]> => {
  return debtors.filter(debtor => ids.includes(debtor.id));
};

export const createDebtor = async (debtor: Omit<Debtor, 'id'>): Promise<Debtor> => {
  const newDebtor: Debtor = {
    ...debtor,
    id: Math.random().toString(36).substr(2, 9),
  };
  debtors.push(newDebtor);
  return newDebtor;
};

export const updateDebtor = async (id: string, updates: Partial<Debtor>): Promise<Debtor | null> => {
  const index = debtors.findIndex(debtor => debtor.id === id);
  if (index === -1) return null;
  
  debtors[index] = { ...debtors[index], ...updates };
  return debtors[index];
};

export const deleteDebtor = async (id: string): Promise<boolean> => {
  const initialLength = debtors.length;
  debtors = debtors.filter(debtor => debtor.id !== id);
  return debtors.length !== initialLength;
};