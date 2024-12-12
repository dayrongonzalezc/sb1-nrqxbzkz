import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import DebtorList from '../components/debtors/DebtorList';
import DebtorForm from '../components/debtors/DebtorForm';
import { useDebtors } from '../hooks/useDebtors';
import { Debtor } from '../types';

const Debtors = () => {
  const { debtors, loading, error, createDebtor, updateDebtor, deleteDebtor } = useDebtors();
  const [showForm, setShowForm] = useState(false);
  const [editingDebtor, setEditingDebtor] = useState<Debtor | null>(null);

  const handleCreate = async (data: Omit<Debtor, 'id'>) => {
    await createDebtor(data);
    setShowForm(false);
  };

  const handleUpdate = async (data: Omit<Debtor, 'id'>) => {
    if (editingDebtor) {
      await updateDebtor(editingDebtor.id, data);
      setEditingDebtor(null);
    }
    setShowForm(false);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this debtor?')) {
      await deleteDebtor(id);
    }
  };

  const handleEdit = (debtor: Debtor) => {
    setEditingDebtor(debtor);
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
        <h1 className="text-2xl font-bold">Debtors</h1>
        {!showForm && (
          <button
            onClick={() => setShowForm(true)}
            className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
          >
            <Plus className="w-5 h-5" />
            Add Debtor
          </button>
        )}
      </div>

      {showForm ? (
        <DebtorForm
          initialData={editingDebtor || undefined}
          onSubmit={editingDebtor ? handleUpdate : handleCreate}
          onCancel={() => {
            setShowForm(false);
            setEditingDebtor(null);
          }}
        />
      ) : (
        <DebtorList
          debtors={debtors}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
};

export default Debtors;