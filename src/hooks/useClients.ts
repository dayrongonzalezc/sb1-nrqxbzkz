import { useState, useEffect } from 'react';
import { Client } from '../types';
import * as clientService from '../services/clientService';

export const useClients = () => {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchClients = async () => {
    try {
      setLoading(true);
      const data = await clientService.getClients();
      setClients(data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch clients');
    } finally {
      setLoading(false);
    }
  };

  const createClient = async (clientData: Omit<Client, 'id' | 'createdAt'>) => {
    try {
      const newClient = await clientService.createClient(clientData);
      setClients(prev => [...prev, newClient]);
      return newClient;
    } catch (err) {
      setError('Failed to create client');
      throw err;
    }
  };

  const updateClient = async (id: string, updates: Partial<Client>) => {
    try {
      const updatedClient = await clientService.updateClient(id, updates);
      if (updatedClient) {
        setClients(prev => 
          prev.map(client => client.id === id ? updatedClient : client)
        );
      }
      return updatedClient;
    } catch (err) {
      setError('Failed to update client');
      throw err;
    }
  };

  const deleteClient = async (id: string) => {
    try {
      const success = await clientService.deleteClient(id);
      if (success) {
        setClients(prev => prev.filter(client => client.id !== id));
      }
      return success;
    } catch (err) {
      setError('Failed to delete client');
      throw err;
    }
  };

  useEffect(() => {
    fetchClients();
  }, []);

  return {
    clients,
    loading,
    error,
    createClient,
    updateClient,
    deleteClient,
    refetch: fetchClients,
  };
};