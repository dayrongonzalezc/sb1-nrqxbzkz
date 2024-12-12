import React, { useState, useEffect } from 'react';
import { Debt, Client, Debtor } from '../../types';
import * as clientService from '../../services/clientService';
import * as debtorService from '../../services/debtorService';

interface DebtFormProps {
  initialData?: Debt;
  onSubmit: (data: Omit<Debt, 'id' | 'createdAt'>) => void;
  onCancel: () => void;
}

const DebtForm: React.FC<DebtFormProps> = ({
  initialData,
  onSubmit,
  onCancel,
}) => {
  const [clients, setClients] = useState<Client[]>([]);
  const [debtors, setDebtors] = useState<Debtor[]>([]);
  const [formData, setFormData] = useState({
    clientId: initialData?.clientId || '',
    debtorIds: initialData?.debtorIds || [],
    amount: initialData?.amount || 0,
    description: initialData?.description || '',
    status: initialData?.status || 'PENDING',
    dueDate: initialData?.dueDate ? new Date(initialData.dueDate).toISOString().split('T')[0] : '',
  });

  useEffect(() => {
    const fetchData = async () => {
      const [clientsData, debtorsData] = await Promise.all([
        clientService.getClients(),
        debtorService.getDebtors(),
      ]);
      setClients(clientsData);
      setDebtors(debtorsData);
    };
    fetchData();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      amount: Number(formData.amount),
      dueDate: new Date(formData.dueDate),
    });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    if (type === 'select-multiple') {
      const select = e.target as HTMLSelectElement;
      const values = Array.from(select.selectedOptions).map(option => option.value);
      setFormData(prev => ({ ...prev, [name]: values }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-lg shadow">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div>
          <label className="block text-sm font-medium text-gray-700">Client</label>
          <select
            name="clientId"
            value={formData.clientId}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            required
          >
            <option value="">Select a client</option>
            {clients.map(client => (
              <option key={client.id} value={client.id}>
                {client.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Debtors</label>
          <select
            name="debtorIds"
            multiple
            value={formData.debtorIds}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            required
          >
            {debtors.map(debtor => (
              <option key={debtor.id} value={debtor.id}>
                {debtor.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Amount</label>
          <input
            type="number"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            min="0"
            step="0.01"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Due Date</label>
          <input
            type="date"
            name="dueDate"
            value={formData.dueDate}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Status</label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          >
            <option value="PENDING">Pending</option>
            <option value="IN_PROCESS">In Process</option>
            <option value="PAID">Paid</option>
          </select>
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={3}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            required
          />
        </div>
      </div>

      <div className="flex justify-end space-x-4">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
        >
          {initialData ? 'Update' : 'Create'} Debt
        </button>
      </div>
    </form>
  );
};

export default DebtForm;