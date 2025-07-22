import React, { useState } from 'react';

export default function Reports({ sales, products }) {
  const [dateRange, setDateRange] = useState('Monthly');
  const [showGraph, setShowGraph] = useState(true);
  
  const totalSales = sales.length;
  const totalRevenue = sales.reduce((sum, sale) => sum + sale.total, 0);
  const totalCustomers = 400; // Mock data
  const netProfit = totalRevenue; // Mock calculation

  const topProducts = [
    { id: 1, image: '🥐', name: 'Buttermelt Croissant', category: 'Pastry', orders: 183 },
    { id: 2, image: '🥪', name: 'Beef Crowich', category: 'Sandwich', orders: 160 },
    { id: 3, image: '🎂', name: 'Sliced Blackforest', category: 'Cake', orders: 125 },
    { id: 4, image: '🥖', name: 'Solo Floss Bread', category: 'Bread', orders: 119 }
  ];

  return (
    <div className="p-6">
      {/* Header Controls */}
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600">Date Periode</span>
            <select 
              value={dateRange} 
              onChange={(e) => setDateRange(e.target.value)}
              className="px-3 py-1 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option>Monthly</option>
              <option>Weekly</option>
              <option>Daily</option>
            </select>
          </div>
          
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600">Show Graph</span>
            <button 
              onClick={() => setShowGraph(!showGraph)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                showGraph ? 'bg-blue-500' : 'bg-gray-200'
              }`}
            >
              <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                showGraph ? 'translate-x-6' : 'translate-x-1'
              }`} />
            </button>
          </div>
        </div>
        
        <button className="bg-blue-500 text-white px-4 py-2 rounded-xl hover:bg-blue-600 flex items-center space-x-2">
     
          <span>Download</span>
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-2xl p-6  border border-gray-100 shadow-sm">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
              <span className="text-blue-600">📊</span>
            </div>
            <span className="text-sm text-gray-600">Total Sales Amount</span>
          </div>
          <div className="text-3xl font-bold text-gray-800 mb-2">12,650.00</div>
          <div className="text-sm font-medium text-gray-500 mb-1">USD</div>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-green-600">+ USD 1,543.30</span>
            <span className="text-xs text-green-600">12.2% ↑</span>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6  border border-gray-100 shadow-sm">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center">
              <span className="text-orange-600">🍰</span>
            </div>
            <span className="text-sm text-gray-600">Total Product Sales</span>
          </div>
          <div className="text-3xl font-bold text-gray-800 mb-2">1,250</div>
          <div className="text-sm font-medium text-gray-500 mb-1">Items</div>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-green-600">+ 125 Items</span>
            <span className="text-xs text-green-600">10% ↑</span>
          </div>
        </div>

        <div className="bg-white rounded-2xl  border border-gray-100 p-6 shadow-sm">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
              <span className="text-purple-600">👥</span>
            </div>
            <span className="text-sm text-gray-600">Total Customers</span>
          </div>
          <div className="text-3xl font-bold text-gray-800 mb-2">400</div>
          <div className="text-sm font-medium text-gray-500 mb-1">Persons</div>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-red-600">- 5 Persons</span>
            <span className="text-xs text-red-600">0.02% ↓</span>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
              <span className="text-green-600">💰</span>
            </div>
            <span className="text-sm text-gray-600">Net Profit</span>
          </div>
          <div className="text-3xl font-bold text-gray-800 mb-2">12,650.00</div>
          <div className="text-sm font-medium text-gray-500 mb-1">USD</div>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-green-600">+ USD 3,792</span>
            <span className="text-xs text-green-600">0.3% ↑</span>
          </div>
        </div>
      </div>

      {/* Graph and Favorite Products */}
      <div className="grid grid-cols-2 gap-6 mb-8">
        {/* Report Graph */}
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-800">Report Graph</h3>
            <select className="px-3 py-1 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option>Total Sales Amount</option>
              <option>Total Products</option>
              <option>Total Customers</option>
            </select>
          </div>
          
          {showGraph && (
            <div className="h-64 flex items-end space-x-2 mb-4">
              {/* Simple SVG Chart */}
              <svg viewBox="0 0 400 200" className="w-full h-full">
                <path
                  d="M 20 180 Q 60 120, 100 140 T 180 100 T 260 80 T 340 120 T 380 100"
                  stroke="#2D71F8"
                  strokeWidth="3"
                  fill="none"
                />
                <path
                  d="M 20 180 Q 60 120, 100 140 T 180 100 T 260 80 T 340 120 T 380 100 L 380 200 L 20 200 Z"
                  fill="url(#gradient)"
                  fillOpacity="0.1"
                />
                <defs>
                  <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#2D71F8" />
                    <stop offset="100%" stopColor="#ffffff" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
          )}
          
          <div className="grid grid-cols-3 gap-4 pt-4 border-t">
            <div className="text-center">
              <div className="text-lg font-bold text-gray-800">12,650.00</div>
              <div className="text-sm text-gray-500">USD</div>
              <div className="text-xs text-gray-400">Amount</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-green-600">+ 1,543.30</div>
              <div className="text-sm text-gray-500">USD</div>
              <div className="text-xs text-gray-400">Growth</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-blue-600">↑ 12.2</div>
              <div className="text-sm text-gray-500">Percent (%)</div>
              <div className="text-xs text-gray-400">Growth Percentage</div>
            </div>
          </div>
        </div>

        {/* Favorite Product */}
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-800">Favorite Product</h3>
            <button className="p-2 hover:bg-gray-100 rounded-lg">🔍</button>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center space-x-3 text-sm font-medium text-gray-600 pb-2 border-b border-gray-100">
              <span className="w-10">Img</span>
              <span className="flex-1">Product Name</span>
              <span className="w-20 text-right">Total Orders</span>
            </div>
            
            {topProducts.map((product, index) => (
              <div key={product.id} className="flex items-center space-x-3">
                <span className="text-2xl w-10">{product.image}</span>
                <div className="flex-1">
                  <div className="font-medium text-gray-800">{product.name}</div>
                  <div className="text-xs text-orange-500">{product.category}</div>
                </div>
                <div className="text-right w-20">
                  <div className="font-semibold text-gray-800">{product.orders}</div>
                  <div className="text-xs text-gray-500">Times</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* All Orders Table */}
      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-semibold text-gray-800">All Orders</h3>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600">Date</span>
              <input type="date" defaultValue="2024-05-25" className="px-3 py-1 border border-gray-200 rounded-lg text-sm" />
              <span className="text-gray-400">—</span>
              <input type="date" defaultValue="2024-05-29" className="px-3 py-1 border border-gray-200 rounded-lg text-sm" />
            </div>
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
              <tr className="border-b border-gray-100 hover:bg-gray-50">
                <td className="py-4 px-4 font-medium">001</td>
                <td className="py-4 px-4 text-sm text-gray-600">25/05/2024 - 08:00 AM</td>
                <td className="py-4 px-4">George</td>
                <td className="py-4 px-4">
                  <span className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-xs font-medium">
                    Done
                  </span>
                </td>
                <td className="py-4 px-4 font-semibold">USD 35.00</td>
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
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}