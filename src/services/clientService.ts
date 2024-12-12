import { Client } from '../types';

// Simulated database for now
let clients: Client[] = [
  {
    id: '1',
    name: 'ABC Corporation',
    type: 'COMPANY',
    address: '123 Business Ave, Suite 100',
    contactEmail: 'contact@abccorp.com',
    contactPhone: '(555) 123-4567',
    legalRepresentative: 'John Smith',
    isActive: true,
    createdAt: new Date('2024-01-15'),
  },
  {
    id: '2',
    name: 'Sunset Heights Condos',
    type: 'CONDOMINIUM',
    address: '789 Residential Blvd',
    contactEmail: 'manager@sunsetheights.com',
    contactPhone: '(555) 987-6543',
    legalRepresentative: 'Sarah Johnson',
    isActive: true,
    createdAt: new Date('2024-02-01'),
  },
];

export const getClients = async (): Promise<Client[]> => {
  return clients;
};

export const getClientById = async (id: string): Promise<Client | undefined> => {
  return clients.find(client => client.id === id);
};

export const createClient = async (client: Omit<Client, 'id' | 'createdAt'>): Promise<Client> => {
  const newClient: Client = {
    ...client,
    id: Math.random().toString(36).substr(2, 9),
    createdAt: new Date(),
  };
  clients.push(newClient);
  return newClient;
};

export const updateClient = async (id: string, updates: Partial<Client>): Promise<Client | null> => {
  const index = clients.findIndex(client => client.id === id);
  if (index === -1) return null;
  
  clients[index] = { ...clients[index], ...updates };
  return clients[index];
};

export const deleteClient = async (id: string): Promise<boolean> => {
  const initialLength = clients.length;
  clients = clients.filter(client => client.id !== id);
  return clients.length !== initialLength;
};