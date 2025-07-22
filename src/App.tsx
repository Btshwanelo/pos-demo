import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import ProtectedRoute from './components/common/ProtectedRoute';
import LoginScreen from './components/auth/LoginScreen';
import POSHome from './components/pos/POSHome';
import ProductSelection from './components/pos/ProductSelection';
import CustomerInfo from './components/pos/CustomerInfo';
import PaymentMethod from './components/pos/PaymentMethod';
import PaymentProcessing from './components/pos/PaymentProcessing';
import Receipt from './components/pos/Receipt';
import AdminPanel from './components/admin/AdminPanel';

function App() {
  return (
    <AppProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LoginScreen />} />
          <Route path="/pos" element={
            <ProtectedRoute>
              <POSHome />
            </ProtectedRoute>
          } />
          <Route path="/pos/products" element={
            <ProtectedRoute>
              <ProductSelection />
            </ProtectedRoute>
          } />
          <Route path="/pos/customer" element={
            <ProtectedRoute>
              <CustomerInfo />
            </ProtectedRoute>
          } />
          <Route path="/pos/payment" element={
            <ProtectedRoute>
              <PaymentMethod />
            </ProtectedRoute>
          } />
          <Route path="/pos/processing" element={
            <ProtectedRoute>
              <PaymentProcessing />
            </ProtectedRoute>
          } />
          <Route path="/pos/receipt" element={
            <ProtectedRoute>
              <Receipt />
            </ProtectedRoute>
          } />
          <Route path="/admin" element={
            <ProtectedRoute>
              <AdminPanel />
            </ProtectedRoute>
          } />
        </Routes>
      </Router>
    </AppProvider>
  );
}

export default App;