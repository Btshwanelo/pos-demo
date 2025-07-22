import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';

export default function PaymentMethod() {
  const [selectedMethod, setSelectedMethod] = useState('');
  const { state, dispatch } = useApp();
  const navigate = useNavigate();

  const paymentMethods = [
    { id: 'cash', name: 'Cash', icon: '💵', description: 'Pay with cash' },
    { id: 'card', name: 'Card', icon: '💳', description: 'Credit/Debit card' },
    { id: 'mobile', name: 'Mobile', icon: '📱', description: 'Mobile payment' }
  ];

  const handlePayment = () => {
    if (selectedMethod) {
      dispatch({ type: 'SET_PAYMENT_METHOD', payload: selectedMethod });
      navigate('/pos/processing');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <button 
              onClick={() => navigate('/pos/customer')}
              className="flex items-center text-blue-600 hover:text-blue-800"
            >
              ← Back to Customer Info
            </button>
            <h1 className="text-xl font-semibold text-gray-900">Payment Method</h1>
            <div></div>
          </div>
        </div>
      </header>

      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <div className="text-center mb-8">
            <span className="text-4xl">💳</span>
            <h2 className="text-2xl font-semibold mt-4 mb-2">Choose Payment Method</h2>
            <p className="text-gray-600">Select how the customer wants to pay</p>
          </div>

          {/* Order Summary */}
          <div className="mb-8 p-4 bg-gray-50 rounded-lg">
            <div className="flex justify-between mb-2">
              <span>Customer:</span>
              <span className="font-medium">{state.currentSale.customer.name}</span>
            </div>
            <div className="flex justify-between mb-4">
              <span>Phone:</span>
              <span className="font-medium">{state.currentSale.customer.phone}</span>
            </div>
            <div className="border-t pt-2">
              <div className="flex justify-between text-xl font-bold">
                <span>Total Amount:</span>
                <span className="text-green-600">${state.currentSale.total.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Payment Methods */}
          <div className="space-y-4 mb-8">
            {paymentMethods.map(method => (
              <div
                key={method.id}
                className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                  selectedMethod === method.id
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
                onClick={() => setSelectedMethod(method.id)}
              >
                <div className="flex items-center space-x-4">
                  <span className="text-2xl">{method.icon}</span>
                  <div className="flex-1">
                    <h3 className="font-semibold">{method.name}</h3>
                    <p className="text-sm text-gray-600">{method.description}</p>
                  </div>
                  <div className={`w-6 h-6 rounded-full border-2 ${
                    selectedMethod === method.id
                      ? 'border-blue-500 bg-blue-500'
                      : 'border-gray-300'
                  }`}>
                    {selectedMethod === method.id && (
                      <div className="w-full h-full flex items-center justify-center">
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={handlePayment}
            disabled={!selectedMethod}
            className="w-full bg-green-500 hover:bg-green-600 disabled:bg-gray-300 text-white font-medium py-3 px-4 rounded-lg transition-colors"
          >
            Process Payment →
          </button>
        </div>
      </div>
    </div>
  );
}