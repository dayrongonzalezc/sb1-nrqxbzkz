import React from 'react';
import { User, Mail, Phone, MapPin } from 'lucide-react';
import { Debtor } from '../../types';

interface DebtorListProps {
  debtors: Debtor[];
  onEdit: (debtor: Debtor) => void;
  onDelete: (id: string) => void;
}

const DebtorList: React.FC<DebtorListProps> = ({ debtors, onEdit, onDelete }) => {
  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Debtor
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Contact Info
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Document ID
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Address
            </th>
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {debtors.map((debtor) => (
            <tr key={debtor.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <User className="h-5 w-5 text-gray-400" />
                  <div className="ml-4">
                    <div className="text-sm font-medium text-gray-900">
                      {debtor.name}
                    </div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4">
                <div className="flex items-center space-x-2 text-sm text-gray-900">
                  <Mail className="h-4 w-4 text-gray-400" />
                  <span>{debtor.email}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-500 mt-1">
                  <Phone className="h-4 w-4 text-gray-400" />
                  <span>{debtor.phone}</span>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {debtor.documentId}
              </td>
              <td className="px-6 py-4">
                <div className="flex items-center space-x-2 text-sm text-gray-500">
                  <MapPin className="h-4 w-4 text-gray-400" />
                  <span>{debtor.address}</span>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <button
                  onClick={() => onEdit(debtor)}
                  className="text-indigo-600 hover:text-indigo-900 mr-4"
                >
                  Edit
                </button>
                <button
                  onClick={() => onDelete(debtor.id)}
                  className="text-red-600 hover:text-red-900"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DebtorList;