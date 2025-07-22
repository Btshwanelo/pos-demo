import React, { useState } from 'react';

export default function Reports({ sales, products }) {
  const [dateRange, setDateRange] = useState('Monthly');
  const [showGraph, setShowGraph] = useState(true);
  
  const totalServices = sales.length;
  const totalRevenue = sales.reduce((sum, sale) => sum + sale.total, 0);
  const totalCustomers = 250; // Mock data
  const netProfit = totalRevenue * 0.65; // Mock calculation - 65% profit margin

  const topServices = [
    { id: 1, image: '🏷️', name: 'Standard Number Plate', category: 'Number Plates', orders: 89 },
    { id: 2, image: '⚡', name: 'Express Registration', category: 'Services', orders: 76 },
    { id: 3, image: '⭐', name: 'Personalized Number Plate', category: 'Number Plates', orders: 54 },
    { id: 4, image: '🔍', name: 'Vehicle Inspection', category: 'Services', orders: 42 },
    { id: 5, image: '🚛', name: 'Commercial Vehicle Plate', category: 'Number Plates', orders: 38 }
  ];

  return (
    <div className="p-6">
      {/* Header Controls */}
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600">Report Period</span>
            <select 
              value={dateRange} 
              onChange={(e) => setDateRange(e.target.value)}
              className="px-3 py-1 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option>Monthly</option>
              <option>Weekly</option>
              <option>Daily</option>
              <option>Quarterly</option>
              <option>Yearly</option>
            </select>
          </div>
          
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600">Show Analytics Graph</span>
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
         
          <span>Export Report</span>
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
              <span className="text-blue-600">💰</span>
            </div>
            <span className="text-sm text-gray-600">Total Service Revenue</span>
          </div>
          <div className="text-3xl font-bold text-gray-800 mb-2">{totalRevenue.toFixed(2)}</div>
          <div className="text-sm font-medium text-gray-500 mb-1">USD</div>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-green-600">+ USD 2,340.50</span>
            <span className="text-xs text-green-600">18.5% ↑</span>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center">
              <span className="text-orange-600">⚙️</span>
            </div>
            <span className="text-sm text-gray-600">Total Services Provided</span>
          </div>
          <div className="text-3xl font-bold text-gray-800 mb-2">{totalServices}</div>
          <div className="text-sm font-medium text-gray-500 mb-1">Services</div>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-green-600">+ 23 Services</span>
            <span className="text-xs text-green-600">15% ↑</span>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
              <span className="text-purple-600">👥</span>
            </div>
            <span className="text-sm text-gray-600">Total Customers Served</span>
          </div>
          <div className="text-3xl font-bold text-gray-800 mb-2">{totalCustomers}</div>
          <div className="text-sm font-medium text-gray-500 mb-1">Customers</div>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-green-600">+ 45 Customers</span>
            <span className="text-xs text-green-600">22% ↑</span>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
              <span className="text-green-600">📈</span>
            </div>
            <span className="text-sm text-gray-600">Net Profit</span>
          </div>
          <div className="text-3xl font-bold text-gray-800 mb-2">{netProfit.toFixed(2)}</div>
          <div className="text-sm font-medium text-gray-500 mb-1">USD</div>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-green-600">+ USD 1,521.30</span>
            <span className="text-xs text-green-600">25.8% ↑</span>
          </div>
        </div>
      </div>

      {/* Graph and Popular Services */}
      <div className="grid grid-cols-2 gap-6 mb-8">
        {/* Revenue Analytics Graph */}
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-800">Revenue Analytics</h3>
            <select className="px-3 py-1 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option>Total Revenue</option>
              <option>Service Revenue</option>
              <option>Product Revenue</option>
            </select>
          </div>
          
          {showGraph && (
            <div className="h-64 flex items-end space-x-2 mb-4">
              {/* Simple SVG Chart */}
              <svg viewBox="0 0 400 200" className="w-full h-full">
                <path
                  d="M 20 180 Q 60 140, 100 120 T 180 90 T 260 70 T 340 100 T 380 85"
                  stroke="#2D71F8"
                  strokeWidth="3"
                  fill="none"
                />
                <path
                  d="M 20 180 Q 60 140, 100 120 T 180 90 T 260 70 T 340 100 T 380 85 L 380 200 L 20 200 Z"
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
              <div className="text-lg font-bold text-gray-800">{totalRevenue.toFixed(2)}</div>
              <div className="text-sm text-gray-500">USD</div>
              <div className="text-xs text-gray-400">Total Revenue</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-green-600">+ 2,340.50</div>
              <div className="text-sm text-gray-500">USD</div>
              <div className="text-xs text-gray-400">Growth</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-blue-600">↑ 18.5</div>
              <div className="text-sm text-gray-500">Percent (%)</div>
              <div className="text-xs text-gray-400">Growth Rate</div>
            </div>
          </div>
        </div>

        {/* Popular Services */}
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-800">Most Popular Services</h3>
            <button className="p-2 hover:bg-gray-100 rounded-lg">🔍</button>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center space-x-3 text-sm font-medium text-gray-600 pb-2 border-b border-gray-100">
              <span className="w-10">Icon</span>
              <span className="flex-1">Service Name</span>
              <span className="w-20 text-right">Orders</span>
            </div>
            
            {topServices.map((service, index) => (
              <div key={service.id} className="flex items-center space-x-3">
                <span className="text-2xl w-10">{service.image}</span>
                <div className="flex-1">
                  <div className="font-medium text-gray-800">{service.name}</div>
                  <div className="text-xs text-blue-500">{service.category}</div>
                </div>
                <div className="text-right w-20">
                  <div className="font-semibold text-gray-800">{service.orders}</div>
                  <div className="text-xs text-gray-500">Orders</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Service Categories Performance */}
      <div className="bg-white rounded-2xl p-6 shadow-sm mb-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-6">Service Categories Performance</h3>
        
        <div className="grid grid-cols-4 gap-6">
          <div className="text-center p-4 bg-purple-50 rounded-xl">
            <div className="text-2xl mb-2">🏷️</div>
            <div className="text-lg font-bold text-purple-600 mb-1">145</div>
            <div className="text-sm text-gray-600 mb-2">Number Plates</div>
            <div className="text-xs text-purple-600">65% of total</div>
          </div>
          
          <div className="text-center p-4 bg-blue-50 rounded-xl">
            <div className="text-2xl mb-2">⚙️</div>
            <div className="text-lg font-bold text-blue-600 mb-1">89</div>
            <div className="text-sm text-gray-600 mb-2">Registration Services</div>
            <div className="text-xs text-blue-600">25% of total</div>
          </div>
          
          <div className="text-center p-4 bg-green-50 rounded-xl">
            <div className="text-2xl mb-2">🛠️</div>
            <div className="text-lg font-bold text-green-600 mb-1">32</div>
            <div className="text-sm text-gray-600 mb-2">Accessories</div>
            <div className="text-xs text-green-600">8% of total</div>
          </div>
          
          <div className="text-center p-4 bg-yellow-50 rounded-xl">
            <div className="text-2xl mb-2">💰</div>
            <div className="text-lg font-bold text-yellow-600 mb-1">58</div>
            <div className="text-sm text-gray-600 mb-2">Processing Fees</div>
            <div className="text-xs text-yellow-600">2% of total</div>
          </div>
        </div>
      </div>

      {/* Recent Transactions Table */}
      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-semibold text-gray-800">Recent Service Transactions</h3>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600">Date Range:</span>
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
                <th className="text-left py-4 px-4 font-medium text-gray-600">Vehicle Info</th>
                <th className="text-left py-4 px-4 font-medium text-gray-600">Service Type</th>
                <th className="text-left py-4 px-4 font-medium text-gray-600">Service Status</th>
                <th className="text-left py-4 px-4 font-medium text-gray-600">Total Amount</th>
                <th className="text-left py-4 px-4 font-medium text-gray-600">Payment Status</th>
                <th className="text-left py-4 px-4 font-medium text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-100 hover:bg-gray-50">
                <td className="py-4 px-4 font-medium">001</td>
                <td className="py-4 px-4 text-sm text-gray-600">25/05/2024 - 08:00 AM</td>
                <td className="py-4 px-4">Sarah Johnson</td>
                <td className="py-4 px-4 text-sm">
                  <div>ABC-123</div>
                  <div className="text-gray-500">Car</div>
                </td>
                <td className="py-4 px-4 text-sm">
                  <span className="bg-purple-100 text-purple-600 px-2 py-1 rounded-full text-xs">
                    Personalized Plate
                  </span>
                </td>
                <td className="py-4 px-4">
                  <span className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-xs font-medium">
                    Completed
                  </span>
                </td>
                <td className="py-4 px-4 font-semibold">$85.00</td>
                <td className="py-4 px-4">
                  <span className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-xs font-medium">
                    Paid
                  </span>
                </td>
                <td className="py-4 px-4">
                  <button className="text-blue-500 hover:text-blue-600 text-sm font-medium">
                    View Details
                  </button>
                </td>
              </tr>
              <tr className="border-b border-gray-100 hover:bg-gray-50">
                <td className="py-4 px-4 font-medium">002</td>
                <td className="py-4 px-4 text-sm text-gray-600">25/05/2024 - 09:30 AM</td>
                <td className="py-4 px-4">Michael Chen</td>
                <td className="py-4 px-4 text-sm">
                  <div>XYZ-789</div>
                  <div className="text-gray-500">Motorcycle</div>
                </td>
                <td className="py-4 px-4 text-sm">
                  <span className="bg-blue-100 text-blue-600 px-2 py-1 rounded-full text-xs">
                    Express Registration
                  </span>
                </td>
                <td className="py-4 px-4">
                  <span className="bg-yellow-100 text-yellow-600 px-3 py-1 rounded-full text-xs font-medium">
                    In Progress
                  </span>
                </td>
                <td className="py-4 px-4 font-semibold">$70.00</td>
                <td className="py-4 px-4">
                  <span className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-xs font-medium">
                    Paid
                  </span>
                </td>
                <td className="py-4 px-4">
                  <button className="text-blue-500 hover:text-blue-600 text-sm font-medium">
                    View Details
                  </button>
                </td>
              </tr>
              <tr className="border-b border-gray-100 hover:bg-gray-50">
                <td className="py-4 px-4 font-medium">003</td>
                <td className="py-4 px-4 text-sm text-gray-600">25/05/2024 - 11:15 AM</td>
                <td className="py-4 px-4">Lisa Rodriguez</td>
                <td className="py-4 px-4 text-sm">
                  <div>DEF-456</div>
                  <div className="text-gray-500">Commercial</div>
                </td>
                <td className="py-4 px-4 text-sm">
                  <span className="bg-orange-100 text-orange-600 px-2 py-1 rounded-full text-xs">
                    Vehicle Inspection
                  </span>
                </td>
                <td className="py-4 px-4">
                  <span className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-xs font-medium">
                    Completed
                  </span>
                </td>
                <td className="py-4 px-4 font-semibold">$120.00</td>
                <td className="py-4 px-4">
                  <span className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-xs font-medium">
                    Paid
                  </span>
                </td>
                <td className="py-4 px-4">
                  <button className="text-blue-500 hover:text-blue-600 text-sm font-medium">
                    View Details
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