import { useState, useEffect } from 'react';
import { Debt } from '../types';
import * as debtService from '../services/debtService';

export const useDebts = () => {
  const [debts, setDebts] = useState<Debt[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchDebts = async () => {
    try {
      setLoading(true);
      const data = await debtService.getDebts();
      setDebts(data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch debts');
    } finally {
      setLoading(false);
    }
  };

  const createDebt = async (debtData: Omit<Debt, 'id' | 'createdAt'>) => {
    try {
      const newDebt = await debtService.createDebt(debtData);
      setDebts(prev => [...prev, newDebt]);
      return newDebt;
    } catch (err) {
      setError('Failed to create debt');
      throw err;
    }
  };

  const updateDebt = async (id: string, updates: Partial<Debt>) => {
    try {
      const updatedDebt = await debtService.updateDebt(id, updates);
      if (updatedDebt) {
        setDebts(prev => 
          prev.map(debt => debt.id === id ? updatedDebt : debt)
        );
      }
      return updatedDebt;
    } catch (err) {
      setError('Failed to update debt');
      throw err;
    }
  };

  const deleteDebt = async (id: string) => {
    try {
      const success = await debtService.deleteDebt(id);
      if (success) {
        setDebts(prev => prev.filter(debt => debt.id !== id));
      }
      return success;
    } catch (err) {
      setError('Failed to delete debt');
      throw err;
    }
  };

  useEffect(() => {
    fetchDebts();
  }, []);

  return {
    debts,
    loading,
    error,
    createDebt,
    updateDebt,
    deleteDebt,
    refetch: fetchDebts,
  };
};