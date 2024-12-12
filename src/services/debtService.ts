import { Debt } from '../types';

// Simulated database
let debts: Debt[] = [
  {
    id: '1',
    clientId: '1',
    debtorIds: ['1'],
    amount: 5000,
    description: 'Outstanding invoice payment',
    status: 'PENDING',
    dueDate: new Date('2024-04-15'),
    createdAt: new Date('2024-03-01'),
  },
];

export const getDebts = async (): Promise<Debt[]> => {
  return debts;
};

export const getDebtById = async (id: string): Promise<Debt | undefined> => {
  return debts.find(debt => debt.id === id);
};

export const createDebt = async (debt: Omit<Debt, 'id' | 'createdAt'>): Promise<Debt> => {
  const newDebt: Debt = {
    ...debt,
    id: Math.random().toString(36).substr(2, 9),
    createdAt: new Date(),
  };
  debts.push(newDebt);
  return newDebt;
};

export const updateDebt = async (id: string, updates: Partial<Debt>): Promise<Debt | null> => {
  const index = debts.findIndex(debt => debt.id === id);
  if (index === -1) return null;
  
  debts[index] = { ...debts[index], ...updates };
  return debts[index];
};

export const deleteDebt = async (id: string): Promise<boolean> => {
  const initialLength = debts.length;
  debts = debts.filter(debt => debt.id !== id);
  return debts.length !== initialLength;
};