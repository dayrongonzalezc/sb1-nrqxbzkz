import { useState, useEffect } from 'react';
import { Debtor } from '../types';
import * as debtorService from '../services/debtorService';

export const useDebtors = () => {
  const [debtors, setDebtors] = useState<Debtor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchDebtors = async () => {
    try {
      setLoading(true);
      const data = await debtorService.getDebtors();
      setDebtors(data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch debtors');
    } finally {
      setLoading(false);
    }
  };

  const createDebtor = async (debtorData: Omit<Debtor, 'id'>) => {
    try {
      const newDebtor = await debtorService.createDebtor(debtorData);
      setDebtors(prev => [...prev, newDebtor]);
      return newDebtor;
    } catch (err) {
      setError('Failed to create debtor');
      throw err;
    }
  };

  const updateDebtor = async (id: string, updates: Partial<Debtor>) => {
    try {
      const updatedDebtor = await debtorService.updateDebtor(id, updates);
      if (updatedDebtor) {
        setDebtors(prev => 
          prev.map(debtor => debtor.id === id ? updatedDebtor : debtor)
        );
      }
      return updatedDebtor;
    } catch (err) {
      setError('Failed to update debtor');
      throw err;
    }
  };

  const deleteDebtor = async (id: string) => {
    try {
      const success = await debtorService.deleteDebtor(id);
      if (success) {
        setDebtors(prev => prev.filter(debtor => debtor.id !== id));
      }
      return success;
    } catch (err) {
      setError('Failed to delete debtor');
      throw err;
    }
  };

  useEffect(() => {
    fetchDebtors();
  }, []);

  return {
    debtors,
    loading,
    error,
    createDebtor,
    updateDebtor,
    deleteDebtor,
    refetch: fetchDebtors,
  };
};