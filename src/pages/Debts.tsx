import React, { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import DebtList from '../components/debts/DebtList';
import DebtForm from '../components/debts/DebtForm';
import { useDebts } from '../hooks/useDebts';
import { Debt, Client, Debtor } from '../types';
import * as clientService from '../services/clientService';
import * as debtorService from '../services/debtorService';

const Debts = () => {
  const { debts, loading, error, createDebt, updateDebt, deleteDebt } = useDebts();
  const [showForm, setShowForm] = useState(false);
  const [editingDebt, setEditingDebt] = useState<Debt | null>(null);
  const [clients, setClients] = useState<Client[]>([]);
  const [debtors, setDebtors] = useState<Record<string, Debtor>>({});

  useEffect(() => {
    const fetchData = async () => {
      const [clientsData, debtorsData] = await Promise.all([
        clientService.getClients(),
        debtorService.getDebtors(),
      ]);
      setClients(clientsData);
      const debtorsMap = debtorsData.reduce((acc, debtor) => {
        acc[debtor.id] = debtor;
        return acc;
      }, {} as Record<string, Debtor>);
      setDebtors(debtorsMap);
    };
    fetchData();
  }, []);

  const handleCreate = async (data: Omit<Debt, 'id' | 'createdAt'>) => {
    await createDebt(data);
    setShowForm(false);
  };

  const handleUpdate = async (data: Omit<Debt, 'id' | 'createdAt'>) => {
    if (editingDebt) {
      await updateDebt(editingDebt.id, data);
      setEditingDebt(null);
    }
    setShowForm(false);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this debt?')) {
      await deleteDebt(id);
    }
  };

  const handleEdit = (debt: Debt) => {
    setEditingDebt(debt);
    setShowForm(true);
  };

  if (loading) {
    return <div className="flex justify-center items-center h-64">Loading...</div>;
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
        {error}
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Debts</h1>
        {!showForm && (
          <button
            onClick={() => setShowForm(true)}
            className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
          >
            <Plus className="w-5 h-5" />
            Add Debt
          </button>
        )}
      </div>

      {showForm ? (
        <DebtForm
          initialData={editingDebt || undefined}
          onSubmit={editingDebt ? handleUpdate : handleCreate}
          onCancel={() => {
            setShowForm(false);
            setEditingDebt(null);
          }}
        />
      ) : (
        <DebtList
          debts={debts}
          clients={clients}
          debtors={debtors}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
};

export default Debts;