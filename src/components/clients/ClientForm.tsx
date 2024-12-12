import React from 'react';
import { Client } from '../../types';

interface ClientFormProps {
  initialData?: Client;
  onSubmit: (data: Omit<Client, 'id' | 'createdAt'>) => void;
  onCancel: () => void;
}

const ClientForm: React.FC<ClientFormProps> = ({
  initialData,
  onSubmit,
  onCancel,
}) => {
  const [formData, setFormData] = React.useState({
    name: initialData?.name || '',
    type: initialData?.type || 'COMPANY',
    address: initialData?.address || '',
    contactEmail: initialData?.contactEmail || '',
    contactPhone: initialData?.contactPhone || '',
    legalRepresentative: initialData?.legalRepresentative || '',
    isActive: initialData?.isActive ?? true,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-lg shadow">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div>
          <label className="block text-sm font-medium text-gray-700">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Type</label>
          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          >
            <option value="COMPANY">Company</option>
            <option value="CONDOMINIUM">Condominium</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Address</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Contact Email</label>
          <input
            type="email"
            name="contactEmail"
            value={formData.contactEmail}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Contact Phone</label>
          <input
            type="tel"
            name="contactPhone"
            value={formData.contactPhone}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Legal Representative</label>
          <input
            type="text"
            name="legalRepresentative"
            value={formData.legalRepresentative}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            required
          />
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            name="isActive"
            checked={formData.isActive}
            onChange={handleChange}
            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
          />
          <label className="ml-2 block text-sm text-gray-900">Active</label>
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
          {initialData ? 'Update' : 'Create'} Client
        </button>
      </div>
    </form>
  );
};

export default ClientForm;