import React from 'react';
import { Navigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';

export default function ProtectedRoute({ children }) {
  const { state } = useApp();
  return state.user ? children : <Navigate to="/" replace />;
}