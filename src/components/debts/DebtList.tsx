import React from 'react';
import { FileText, AlertCircle } from 'lucide-react';
import { Debt, Client, Debtor } from '../../types';
import { format } from 'date-fns';

interface DebtListProps {
  debts: Debt[];
  clients: Client[];
  debtors: Record<string, Debtor>;
  onEdit: (debt: Debt) => void;
  onDelete: (id: string) => void;
}

const DebtList: React.FC<DebtListProps> = ({ 
  debts, 
  clients, 
  debtors, 
  onEdit, 
  onDelete 
}) => {
  const getStatusColor = (status: Debt['status']) => {
    switch (status) {
      case 'PAID':
        return 'bg-green-100 text-green-800';
      case 'IN_PROCESS':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-red-100 text-red-800';
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  const getClient = (clientId: string) => {
    return clients.find(client => client.id === clientId);
  };

  const getDebtorNames = (debtorIds: string[]) => {
    return debtorIds
      .map(id => debtors[id]?.name)
      .filter(Boolean)
      .join(', ');
  };

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Debt Details
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Client & Debtors
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Amount
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Due Date
            </th>
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {debts.map((debt) => {
            const client = getClient(debt.clientId);
            const isOverdue = new Date(debt.dueDate) < new Date() && debt.status !== 'PAID';

            return (
              <tr key={debt.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <FileText className="h-5 w-5 text-gray-400" />
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">
                        {debt.description}
                      </div>
                      <div className="text-sm text-gray-500">
                        Created: {format(new Date(debt.createdAt), 'MMM d, yyyy')}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-gray-900">{client?.name}</div>
                  <div className="text-sm text-gray-500">
                    {getDebtorNames(debt.debtorIds)}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">
                    {formatCurrency(debt.amount)}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    {isOverdue && (
                      <AlertCircle className="h-4 w-4 text-red-500 mr-2" />
                    )}
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(debt.status)}`}>
                      {debt.status.replace('_', ' ')}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {format(new Date(debt.dueDate), 'MMM d, yyyy')}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button
                    onClick={() => onEdit(debt)}
                    className="text-indigo-600 hover:text-indigo-900 mr-4"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => onDelete(debt.id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default DebtList;