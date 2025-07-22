import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import SalesHistory from './SalesHistory';
import StockManagement from './StockManagement';
import Reports from './Reports';

export default function AdminPanel() {
  const [activeTab, setActiveTab] = useState('sales');
  const { state, dispatch } = useApp();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch({ type: 'LOGOUT' });
    navigate('/');
  };

  const tabs = [
    { id: 'sales', name: 'Billing Queue', icon: '📊' },
    // { id: 'tables', name: 'Tables', icon: '🪑' },
    { id: 'history', name: 'Order History', icon: '📋' },
    { id: 'reports', name: 'Report', icon: '📈' }
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-white rounded-2xl shadow-sm m-4 p-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => navigate('/pos')}
              className="text-gray-600 hover:text-gray-800"
            >
              ☰
            </button>
            <h1 className="text-xl font-semibold text-gray-900">Activity / {activeTab === 'sales' ? 'Billing Queue' : activeTab === 'tables' ? 'Tables' : activeTab === 'history' ? 'Order History' : 'Report'}</h1>
            <div className="flex items-center space-x-2 text-sm text-gray-500">
              <span>📅</span>
              <span>Wed, 29 May 2024</span>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-sm text-gray-600">Open Order</span>
            </div>
            <span className="text-sm text-gray-500">🕐</span>
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
                  onClick={() => navigate('/pos')}
                  className="flex items-center space-x-3 p-3 rounded-xl text-gray-600 hover:bg-gray-50 cursor-pointer transition-all"
                >
                  <span>Point of Sales</span>
                </div>
                <div className="flex items-center space-x-3 p-3 rounded-xl bg-blue-500 text-white cursor-pointer">
                  <span className="font-medium">Activity</span>
                </div>
                <div className="flex items-center space-x-3 p-3 rounded-xl text-gray-600 hover:bg-gray-50 cursor-pointer transition-all">
                  <span>Report</span>
                </div>
                <div className="flex items-center space-x-3 p-3 rounded-xl text-gray-600 hover:bg-gray-50 cursor-pointer transition-all">
          
                  <span>Inventory</span>
                </div>
                <div className="flex items-center space-x-3 p-3 rounded-xl text-gray-600 hover:bg-gray-50 cursor-pointer transition-all">
              
                  <span>Teams</span>
                </div>
                <div className="flex items-center space-x-3 p-3 rounded-xl text-gray-600 hover:bg-gray-50 cursor-pointer transition-all">
               
                  <span>Settings</span>
                </div>
              </nav>
              
           
            </div>
            
            
          </div>

          {/* Main Content */}
          <div className="col-span-9">
            {/* Tab Navigation */}
            <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
              <div className="flex space-x-2">
                {tabs.map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-medium transition-all ${
                      activeTab === tab.id
                        ? 'bg-blue-500 text-white shadow-lg'
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    {/* <span>{tab.icon}</span> */}
                    <span>{tab.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Tab Content */}
            <div className="bg-white rounded-2xl shadow-sm">
              {activeTab === 'sales' && <SalesHistory sales={state.sales} />}
              {/* {activeTab === 'tables' && <TablesManagement />} */}
              {activeTab === 'history' && <OrderHistory sales={state.sales} />}
              {activeTab === 'reports' && <Reports sales={state.sales} products={state.products} />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Tables Management Component
function TablesManagement() {
  const tables = [
    { id: 'T-01', name: 'Sharon', guests: 2, time: '09:00 AM', status: 'served', type: '2 Persons Table' },
    { id: 'T-02', name: '', guests: 0, time: '---', status: 'available', type: '2 Persons Table' },
    { id: 'T-03', name: 'Billie', guests: 2, time: '09:00 AM', status: 'served', type: '2 Persons Table' },
    { id: 'T-04', name: 'Mike', guests: 1, time: '09:00 AM', status: 'served', type: '2 Persons Table' },
    { id: 'T-05', name: '', guests: 0, time: '---', status: 'available', type: '2 Persons Table' },
    { id: 'T-06', name: '', guests: 0, time: '---', status: 'available', type: '2 Persons Table' },
    { id: 'T-07', name: '', guests: 0, time: '---', status: 'available', type: '4 Persons' },
    { id: 'T-08', name: 'Hyacinth', guests: 3, time: '01:00 PM', status: 'reserved', type: '4 Persons' },
    { id: 'T-09', name: '', guests: 0, time: '---', status: 'available', type: '4 Persons' },
    { id: 'T-10', name: 'Justin', guests: 4, time: '09:30 AM', status: 'served', type: '4 Persons' },
    { id: 'T-11', name: '', guests: 0, time: '---', status: 'available', type: 'Max 12 Persons' },
    { id: 'T-12', name: 'Clark', guests: 5, time: '10:00 AM', status: 'served', type: 'Max 12 Persons' },
    { id: 'T-13', name: 'Meera', guests: 10, time: '---', status: 'reserved', type: 'Max 12 Persons' },
    { id: 'T-14', name: '', guests: 0, time: '---', status: 'available', type: 'Max 12 Persons' },
    { id: 'T-15', name: '', guests: 0, time: '---', status: 'available', type: 'Max 12 Persons' },
    { id: 'T-16', name: 'Wendy', guests: 12, time: '---', status: 'reserved', type: 'Max 12 Persons' }
  ];

  const floorTabs = ['1st Floor', '2nd Floor', '3rd Floor'];
  const [activeFloor, setActiveFloor] = useState('1st Floor');

  const getStatusColor = (status) => {
    switch (status) {
      case 'available': return 'bg-gray-100 text-gray-600';
      case 'served': return 'bg-blue-100 text-blue-600';
      case 'reserved': return 'bg-red-100 text-red-600';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center space-x-4">
          <input
            type="text"
            placeholder="Search..."
            className="px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <span className="text-sm text-gray-600">Add Table</span>
          <button className="w-8 h-8 bg-blue-500 text-white rounded-lg flex items-center justify-center hover:bg-blue-600">
            +
          </button>
        </div>
        <div className="flex items-center space-x-2">
          <button className="p-2 hover:bg-gray-100 rounded-lg">✏️</button>
          <button className="p-2 hover:bg-gray-100 rounded-lg">🔍</button>
          <button className="p-2 hover:bg-gray-100 rounded-lg">🔽</button>
        </div>
      </div>

      {/* Floor Tabs */}
      <div className="flex space-x-2 mb-6">
        {floorTabs.map(floor => (
          <button
            key={floor}
            onClick={() => setActiveFloor(floor)}
            className={`px-6 py-2 rounded-xl transition-all ${
              activeFloor === floor
                ? 'bg-blue-500 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {floor}
          </button>
        ))}
      </div>

      {/* Table Categories */}
      <div className="space-y-6">
        <div>
          <h3 className="text-sm font-medium text-gray-600 mb-3">2 Persons Table</h3>
          <div className="grid grid-cols-6 gap-4">
            {tables.filter(table => table.type === '2 Persons Table').map(table => (
              <div key={table.id} className="bg-gray-50 rounded-xl p-4 text-center">
                <div className={`inline-block px-3 py-1 rounded-full text-xs font-medium mb-2 ${getStatusColor(table.status)}`}>
                  {table.id}
                </div>
                <div className="font-medium text-sm">{table.name || 'Available'}</div>
                <div className="text-xs text-gray-500">{table.guests > 0 ? `${table.guests} Guests` : '0 Guest'}</div>
                <div className="text-xs text-gray-500">{table.time}</div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-sm font-medium text-gray-600 mb-3">4 Persons</h3>
          <div className="grid grid-cols-6 gap-4">
            {tables.filter(table => table.type === '4 Persons').map(table => (
              <div key={table.id} className="bg-gray-50 rounded-xl p-4 text-center">
                <div className={`inline-block px-3 py-1 rounded-full text-xs font-medium mb-2 ${getStatusColor(table.status)}`}>
                  {table.id}
                </div>
                <div className="font-medium text-sm">{table.name || 'Available'}</div>
                <div className="text-xs text-gray-500">{table.guests > 0 ? `${table.guests} Guests` : '0 Guest'}</div>
                <div className="text-xs text-gray-500">{table.time}</div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-sm font-medium text-gray-600 mb-3">Max 12 Persons</h3>
          <div className="grid grid-cols-6 gap-4">
            {tables.filter(table => table.type === 'Max 12 Persons').map(table => (
              <div key={table.id} className="bg-gray-50 rounded-xl p-4 text-center">
                <div className={`inline-block px-3 py-1 rounded-full text-xs font-medium mb-2 ${getStatusColor(table.status)}`}>
                  {table.id}
                </div>
                <div className="font-medium text-sm">{table.name || 'Available'}</div>
                <div className="text-xs text-gray-500">{table.guests > 0 ? `${table.guests} Guests` : '0 Guest'}</div>
                <div className="text-xs text-gray-500">{table.time}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="flex items-center space-x-6 mt-6 pt-4 border-t">
        <span className="text-sm font-medium">Table Status:</span>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
          <span className="text-xs">Available</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
          <span className="text-xs">Served</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
          <span className="text-xs">Reserved</span>
        </div>
      </div>
    </div>
  );
}

// Order History Component  
function OrderHistory({ sales }) {
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center space-x-4">
          <input
            type="text"
            placeholder="Search..."
            className="px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600">Date</span>
            <input type="date" defaultValue="2024-05-25" className="px-3 py-1 border border-gray-200 rounded-lg text-sm" />
            <span className="text-gray-400">—</span>
            <input type="date" defaultValue="2024-05-29" className="px-3 py-1 border border-gray-200 rounded-lg text-sm" />
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <button className="bg-blue-500 text-white px-4 py-2 rounded-xl hover:bg-blue-600">
             Download
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-4 px-4 font-medium text-gray-600">#</th>
              <th className="text-left py-4 px-4 font-medium text-gray-600">Date & Time</th>
              <th className="text-left py-4 px-4 font-medium text-gray-600">Customer Name</th>
              <th className="text-left py-4 px-4 font-medium text-gray-600">Order Status</th>
              <th className="text-left py-4 px-4 font-medium text-gray-600">Total Payment</th>
              <th className="text-left py-4 px-4 font-medium text-gray-600">Order Status</th>
              <th className="text-left py-4 px-4 font-medium text-gray-600">Orders</th>
            </tr>
          </thead>
          <tbody>
            {sales.map((sale, index) => (
              <tr key={sale.id} className="border-b border-gray-100 hover:bg-gray-50">
                <td className="py-4 px-4 font-medium">00{index + 1}</td>
                <td className="py-4 px-4 text-sm text-gray-600">
                  {new Date(sale.date).toLocaleDateString()} - {new Date(sale.date).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})} AM
                </td>
                <td className="py-4 px-4">{sale.customerName}</td>
                <td className="py-4 px-4">
                  <span className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-xs font-medium">
                    Done
                  </span>
                </td>
                <td className="py-4 px-4 font-semibold">USD {sale.total.toFixed(2)}</td>
                <td className="py-4 px-4">
                  <span className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-xs font-medium">
                    Paid
                  </span>
                </td>
                <td className="py-4 px-4">
                  <button className="text-blue-500 hover:text-blue-600 text-sm font-medium">
                    Detail
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}