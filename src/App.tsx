import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Clients from './pages/Clients';
import Debtors from './pages/Debtors';
import Debts from './pages/Debts';
import Agreements from './pages/Agreements';
import Payments from './pages/Payments';
import LegalCases from './pages/LegalCases';

function App() {
  return (
    <Router>
      <div className="flex min-h-screen bg-gray-50">
        <Sidebar />
        <main className="flex-1 ml-64 p-8">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/clients" element={<Clients />} />
            <Route path="/debtors" element={<Debtors />} />
            <Route path="/debts" element={<Debts />} />
            <Route path="/agreements" element={<Agreements />} />
            <Route path="/payments" element={<Payments />} />
            <Route path="/legal-cases" element={<LegalCases />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}