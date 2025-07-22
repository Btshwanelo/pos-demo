import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';

export default function POSHome() {
  const navigate = useNavigate();
  const { state, dispatch } = useApp();
  
  const handleLogout = () => {
    dispatch({ type: 'LOGOUT' });
    navigate('/');
  };

  const startNewSale = () => {
    dispatch({ type: 'RESET_SALE' });
    navigate('/pos/products');
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-white rounded-2xl shadow-sm m-4 p-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                <span className="text-white text-sm">📊</span>
              </div>
              <span className="text-sm text-gray-600">Point of Sales</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-500">
              <span>📅</span>
              <span>Wed, 29 May 2024</span>
              <span>—</span>
              <span>🕐</span>
              <span>07:59 AM</span>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-sm text-gray-600">Open Order</span>
            </div>
            <button
              onClick={handleLogout}
              className="text-sm text-red-500 hover:text-red-700 font-medium px-4 py-2 rounded-lg hover:bg-red-50 transition-all"
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      <div className="px-4 pb-4">
        <div className="grid grid-cols-12 gap-6">
          {/* Left Sidebar */}
          <div className="col-span-3">
            <div className="bg-white rounded-2xl shadow-sm p-4 mb-4">
              <div className="text-center mb-6">
                <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-white text-xl">👤</span>
                </div>
                <h3 className="font-medium text-gray-800">Jelly Grande</h3>
                <span className="text-sm text-gray-500">Cashier</span>
              </div>
              
              <nav className="space-y-2">
                <div 
                  onClick={startNewSale}
                  className="flex items-center space-x-3 p-3 rounded-xl bg-blue-500 text-white cursor-pointer hover:bg-blue-600 transition-all"
                >
                  <span className="font-medium">Point of Sales</span>
                </div>
                <div onClick={() => navigate('/admin')} className="flex items-center space-x-3 p-3 rounded-xl text-gray-600 hover:bg-gray-50 cursor-pointer transition-all">
                  <span>Activity</span>
                </div>
                <div onClick={() => navigate('/admin')} className="flex items-center space-x-3 p-3 rounded-xl text-gray-600 hover:bg-gray-50 cursor-pointer transition-all">
                  <span>Report</span>
                </div>
                <div className="flex items-center space-x-3 p-3 rounded-xl text-gray-600 hover:bg-gray-50 cursor-pointer transition-all">
                  <span>Inventory</span>
                </div>
                <div className="flex items-center space-x-3 p-3 rounded-xl text-gray-600 hover:bg-gray-50 cursor-pointer transition-all">
                  <span>Teams</span>
                </div>
                <div 
                  
                  className="flex items-center space-x-3 p-3 rounded-xl text-gray-600 hover:bg-gray-50 cursor-pointer transition-all"
                >
                  <span>Settings</span>
                </div>
              </nav>
              
           
            </div>
          
          </div>

          {/* Main Content Area */}
          <div className="col-span-9">
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <div className="text-center mb-12">
                <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-blue-600 rounded-3xl flex items-center justify-center mx-auto mb-6">
                  <span className="text-white text-3xl">🏪</span>
                </div>
                <h2 className="text-3xl font-semibold text-gray-800 mb-4">Welcome to Bakehouse POS</h2>
                <p className="text-lg text-gray-600 mb-8">Start a new sale or manage your store operations</p>
                
                <button
                  onClick={startNewSale}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-4 rounded-2xl font-medium text-lg transition-all shadow-lg hover:shadow-xl"
                >
                  🛒 Start New Sale
                </button>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-3 gap-6">
                <div className="text-center p-6 bg-blue-50 rounded-2xl">
                  <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center mx-auto mb-3">
                    <span className="text-white">📊</span>
                  </div>
                  <div className="text-2xl font-bold text-blue-600 mb-1">{state.sales.length}</div>
                  <div className="text-sm text-gray-600">Total Sales</div>
                </div>
                
                <div className="text-center p-6 bg-green-50 rounded-2xl">
                  <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center mx-auto mb-3">
                    <span className="text-white">💰</span>
                  </div>
                  <div className="text-2xl font-bold text-green-600 mb-1">
                    ${state.sales.reduce((sum, sale) => sum + sale.total, 0).toFixed(2)}
                  </div>
                  <div className="text-sm text-gray-600">Revenue</div>
                </div>
                
                <div className="text-center p-6 bg-orange-50 rounded-2xl">
                  <div className="w-12 h-12 bg-orange-500 rounded-xl flex items-center justify-center mx-auto mb-3">
                    <span className="text-white">📦</span>
                  </div>
                  <div className="text-2xl font-bold text-orange-600 mb-1">{state.products.length}</div>
                  <div className="text-sm text-gray-600">Products</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}