import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';

export default function PaymentProcessing() {
  const [processing, setProcessing] = useState(true);
  const [success, setSuccess] = useState(false);
  const { state, dispatch } = useApp();
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setProcessing(false);
      setSuccess(true);
      dispatch({ type: 'COMPLETE_SALE' });
    }, 3000);

    return () => clearTimeout(timer);
  }, [dispatch]);

  if (processing) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="bg-white rounded-2xl shadow-lg p-12 text-center max-w-md w-full mx-4">
          <div className="animate-spin w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-6"></div>
          <h2 className="text-2xl font-semibold mb-2">Processing Payment</h2>
          <p className="text-gray-600 mb-4">Please wait while we process your {state.currentSale.paymentMethod} payment...</p>
          <div className="text-sm text-gray-500">
            Amount: ${state.currentSale.total.toFixed(2)}
          </div>
        </div>
      </div>
    );
  }

  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 flex items-center justify-center">
        <div className="bg-white rounded-2xl shadow-lg p-12 text-center max-w-md w-full mx-4">
          <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-white text-2xl">✓</span>
          </div>
          <h2 className="text-2xl font-semibold text-green-800 mb-2">Payment Successful!</h2>
          <p className="text-gray-600 mb-6">Transaction completed successfully</p>
          <div className="space-y-2 mb-8">
            <div className="flex justify-between text-sm">
              <span>Amount:</span>
              <span className="font-medium">${state.currentSale.total.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Method:</span>
              <span className="font-medium capitalize">{state.currentSale.paymentMethod}</span>
            </div>
          </div>
          <div className="flex space-x-4">
            <button
              onClick={() => navigate('/pos/receipt')}
              className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-3 px-4 rounded-lg transition-colors"
            >
              View Receipt
            </button>
            <button
              onClick={() => navigate('/pos')}
              className="flex-1 bg-green-500 hover:bg-green-600 text-white py-3 px-4 rounded-lg transition-colors"
            >
              New Sale
            </button>
          </div>
        </div>
      </div>
    );
  }
}