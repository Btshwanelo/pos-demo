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
                <span className="text-white text-sm">🏷️</span>
              </div>
              <span className="text-sm text-gray-600">Number Plate Services</span>
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
              <span className="text-sm text-gray-600">Service Available</span>
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
                <h3 className="font-medium text-gray-800">Service Agent</h3>
                <span className="text-sm text-gray-500">Number Plate Specialist</span>
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
                  <span>Reports</span>
                </div>
                <div className="flex items-center space-x-3 p-3 rounded-xl text-gray-600 hover:bg-gray-50 cursor-pointer transition-all">
                  <span>Inventory</span>
                </div>
                <div className="flex items-center space-x-3 p-3 rounded-xl text-gray-600 hover:bg-gray-50 cursor-pointer transition-all">
                  <span>Staff</span>
                </div>
                <div className="flex items-center space-x-3 p-3 rounded-xl text-gray-600 hover:bg-gray-50 cursor-pointer transition-all">
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
                  <span className="text-white text-3xl">🏷️</span>
                </div>
                <h2 className="text-3xl font-semibold text-gray-800 mb-4">Welcome to Number Plate Services</h2>
                <p className="text-lg text-gray-600 mb-8">Complete vehicle registration and number plate solutions</p>
                
                <button
                  onClick={startNewSale}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-4 rounded-2xl font-medium text-lg transition-all shadow-lg hover:shadow-xl"
                >
                  🛒 Start New Service
                </button>
              </div>

              {/* Quick Actions */}
              <div className="mt-12 bg-gray-50 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Actions</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <button 
                    onClick={startNewSale}
                    className="flex flex-col items-center p-4 bg-white rounded-lg hover:shadow-md transition-all"
                  >
                    <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center mb-2">
                      <span className="text-white text-sm">🏷️</span>
                    </div>
                    <span className="text-sm font-medium text-gray-700">New Plate Order</span>
                  </button>

                  <button 
                    onClick={startNewSale}
                    className="flex flex-col items-center p-4 bg-white rounded-lg hover:shadow-md transition-all"
                  >
                    <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center mb-2">
                      <span className="text-white text-sm">⚡</span>
                    </div>
                    <span className="text-sm font-medium text-gray-700">Express Service</span>
                  </button>

                  <button 
                    onClick={() => navigate('/admin')}
                    className="flex flex-col items-center p-4 bg-white rounded-lg hover:shadow-md transition-all"
                  >
                    <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center mb-2">
                      <span className="text-white text-sm">📋</span>
                    </div>
                    <span className="text-sm font-medium text-gray-700">View Orders</span>
                  </button>

                  <button 
                    onClick={() => navigate('/admin')}
                    className="flex flex-col items-center p-4 bg-white rounded-lg hover:shadow-md transition-all"
                  >
                    <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center mb-2">
                      <span className="text-white text-sm">📈</span>
                    </div>
                    <span className="text-sm font-medium text-gray-700">Reports</span>
                  </button>
                </div>
              </div>

              {/* Quick Stats */}
              {/* <div className="grid grid-cols-4 gap-6">
                <div className="text-center p-6 bg-blue-50 rounded-2xl">
                  <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center mx-auto mb-3">
                    <span className="text-white">📊</span>
                  </div>
                  <div className="text-2xl font-bold text-blue-600 mb-1">{state.sales.length}</div>
                  <div className="text-sm text-gray-600">Total Orders</div>
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
                    <span className="text-white">🏷️</span>
                  </div>
                  <div className="text-2xl font-bold text-orange-600 mb-1">
                    {state.products.filter(p => p.category.includes('Plates')).length}
                  </div>
                  <div className="text-sm text-gray-600">Plate Types</div>
                </div>

                <div className="text-center p-6 bg-purple-50 rounded-2xl">
                  <div className="w-12 h-12 bg-purple-500 rounded-xl flex items-center justify-center mx-auto mb-3">
                    <span className="text-white">⚙️</span>
                  </div>
                  <div className="text-2xl font-bold text-purple-600 mb-1">
                    {state.products.filter(p => p.category === 'Services').length}
                  </div>
                  <div className="text-sm text-gray-600">Services</div>
                </div>
              </div> */}

              {/* Service Categories Overview */}
              {/* <div className="mt-12">
                <h3 className="text-xl font-semibold text-gray-800 mb-6">Our Services</h3>
                <div className="grid grid-cols-3 gap-6">
                  <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6">
                    <div className="flex items-center mb-4">
                      <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center mr-3">
                        <span className="text-white text-lg">🏷️</span>
                      </div>
                      <h4 className="font-semibold text-gray-800">Number Plates</h4>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">
                      Standard, personalized, commercial, and motorcycle plates
                    </p>
                    <div className="text-xs text-blue-600 font-medium">
                      {state.products.filter(p => p.category.includes('Plates')).length} Types Available
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6">
                    <div className="flex items-center mb-4">
                      <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center mr-3">
                        <span className="text-white text-lg">⚙️</span>
                      </div>
                      <h4 className="font-semibold text-gray-800">Registration Services</h4>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">
                      Express registration, renewals, transfers, and documentation
                    </p>
                    <div className="text-xs text-green-600 font-medium">
                      {state.products.filter(p => p.category === 'Services').length} Services Available
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-6">
                    <div className="flex items-center mb-4">
                      <div className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center mr-3">
                        <span className="text-white text-lg">🛠️</span>
                      </div>
                      <h4 className="font-semibold text-gray-800">Accessories & Add-ons</h4>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">
                      Frames, security screws, reflective coatings, and more
                    </p>
                    <div className="text-xs text-orange-600 font-medium">
                      {state.products.filter(p => p.category === 'Accessories').length} Items Available
                    </div>
                  </div>
                </div>
              </div> */}

              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}