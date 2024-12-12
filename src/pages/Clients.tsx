import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import ClientList from '../components/clients/ClientList';
import ClientForm from '../components/clients/ClientForm';
import { useClients } from '../hooks/useClients';
import { Client } from '../types';

const Clients = () => {
  const { clients, loading, error, createClient, updateClient, deleteClient } = useClients();
  const [showForm, setShowForm] = useState(false);
  const [editingClient, setEditingClient] = useState<Client | null>(null);

  const handleCreate = async (data: Omit<Client, 'id' | 'createdAt'>) => {
    await createClient(data);
    setShowForm(false);
  };

  const handleUpdate = async (data: Omit<Client, 'id' | 'createdAt'>) => {
    if (editingClient) {
      await updateClient(editingClient.id, data);
      setEditingClient(null);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this client?')) {
      await deleteClient(id);
    }
  };

  const handleEdit = (client: Client) => {
    setEditingClient(client);
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
        <h1 className="text-2xl font-bold">Clients</h1>
        {!showForm && (
          <button
            onClick={() => setShowForm(true)}
            className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
          >
            <Plus className="w-5 h-5" />
            Add Client
          </button>
        )}
      </div>

      {showForm ? (
        <ClientForm
          initialData={editingClient || undefined}
          onSubmit={editingClient ? handleUpdate : handleCreate}
          onCancel={() => {
            setShowForm(false);
            setEditingClient(null);
          }}
        />
      ) : (
        <ClientList
          clients={clients}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
};

export default Clients;