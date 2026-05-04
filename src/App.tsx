import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './lib/auth-context';
import { DashboardLayout } from './components/layout/DashboardLayout';
import { Toaster } from 'sonner';
import { TooltipProvider } from '@/components/ui/tooltip';

import Dashboard from './pages/Dashboard';
import ProductsPage from './pages/ProductsPage';
import ProjectsPage from './pages/ProjectsPage';
import GRNPage from './pages/GRNPage';
import InventoryPage from './pages/InventoryPage';
import ReportsPage from './pages/ReportsPage';
import OrdersPage from './pages/OrdersPage';
import AdminPage from './pages/AdminPage';
import VendorsPage from './pages/VendorsPage';
import RequisitionPage from './pages/RequisitionPage';

export default function App() {
  return (
    <Router>
      <AuthProvider>
        <TooltipProvider>
          <DashboardLayout>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/products" element={<ProductsPage />} />
              <Route path="/projects" element={<ProjectsPage />} />
              <Route path="/vendors" element={<VendorsPage />} />
              <Route path="/requisitions" element={<RequisitionPage />} />
              <Route path="/orders" element={<OrdersPage />} />
              <Route path="/grns" element={<GRNPage />} />
              <Route path="/inventory" element={<InventoryPage />} />
              <Route path="/reports" element={<ReportsPage />} />
              <Route path="/admin" element={<AdminPage />} />
              <Route path="*" element={<div>404 Not Found</div>} />
            </Routes>
          </DashboardLayout>
          <Toaster position="top-right" />
        </TooltipProvider>
      </AuthProvider>
    </Router>
  );
}
