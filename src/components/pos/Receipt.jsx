import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
export default function Receipt() {
  const { state } = useApp();
  const navigate = useNavigate();
  
  // Get the most recent sale (just completed)
  const lastSale = state.sales[state.sales.length - 1];
  
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <header className="bg-white shadow-sm border-b print:hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <button 
              onClick={() => navigate('/pos')}
              className="flex items-center text-blue-600 hover:text-blue-800"
            >
              ← Back to POS
            </button>
            <h1 className="text-xl font-semibold text-gray-900">Receipt</h1>
            <div></div>
          </div>
        </div>
      </header>

      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-2xl shadow-lg p-8 print:shadow-none print:rounded-none">
          {/* Receipt Header */}
          <div className="text-center mb-8 border-b pb-6">
            <h1 className="text-2xl font-bold">🏪 Bakehouse</h1>
            <p className="text-sm text-gray-600">123 Main Street, Bakery City</p>
            <p className="text-sm text-gray-600">Phone: (555) 123-4567</p>
            <p className="text-xs text-gray-500 mt-2">Receipt #{lastSale?.id.toString().padStart(4, '0')}</p>
          </div>

          {/* Customer Info */}
          <div className="mb-6">
            <h3 className="font-semibold mb-2">Customer Information</h3>
            <div className="text-sm space-y-1">
              <div>Name: {lastSale?.customerName}</div>
              <div>Phone: {lastSale?.customerPhone}</div>
              <div>Date: {new Date(lastSale?.date).toLocaleString()}</div>
              <div>Cashier: {lastSale?.cashier}</div>
            </div>
          </div>

          {/* Items */}
          <div className="mb-6">
            <h3 className="font-semibold mb-2">Items</h3>
            <div className="border-t border-b py-2">
              {lastSale?.items.map((item, index) => (
                <div key={index} className="flex justify-between items-center py-1">
                  <div className="flex-1">
                    <div className="font-medium">{item.name}</div>
                    <div className="text-sm text-gray-600">Qty: {item.qty}</div>
                  </div>
                  <div className="text-right">
                    <div>${(item.price * item.qty).toFixed(2)}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Totals */}
          <div className="mb-6">
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span>${lastSale?.total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Tax (0%):</span>
                <span>$0.00</span>
              </div>
              <div className="flex justify-between font-bold text-lg border-t pt-2">
                <span>Total:</span>
                <span>${lastSale?.total.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Payment Info */}
          <div className="mb-8 text-center">
            <div className="inline-block bg-green-100 text-green-800 px-4 py-2 rounded-full">
              <span className="font-medium">Paid via {lastSale?.paymentMethod}</span>
            </div>
          </div>

          {/* Footer */}
          <div className="text-center text-sm text-gray-500 border-t pt-4">
            <p>Thank you for your business!</p>
            <p>Visit us again soon</p>
          </div>

          {/* Action Buttons */}
          <div className="mt-8 flex space-x-4 print:hidden">
            <button
              onClick={handlePrint}
              className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-3 px-4 rounded-lg transition-colors"
            >
              🖨️ Print Receipt
            </button>
            <button
              onClick={() => navigate('/pos')}
              className="flex-1 bg-green-500 hover:bg-green-600 text-white py-3 px-4 rounded-lg transition-colors"
            >
              📄 New Sale
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}