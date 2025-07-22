import React, { useState } from 'react';

export default function SalesHistory({ sales }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');
  
  const filters = ['All', 'Active', 'Closed'];
  const activeCount = 4; // Mock active queue count
  
  const mockSales = [
    { id: '006', customer: 'Francois', orderNumber: '#006', table: '06', date: '29 May 2024', time: '09:15 AM', amount: 20.00, status: 'active' },
    { id: '005', customer: 'Eloise', orderNumber: '#005', table: '05', date: '29 May 2024', time: '09:00 AM', amount: 19.35, status: 'closed' },
    { id: '004', customer: 'Mike', orderNumber: '#004', table: '04', date: '29 May 2024', time: '08:15 AM', amount: 25.00, status: 'active' },
    { id: '003', customer: 'Billie', orderNumber: '#003', table: '03', date: '29 May 2024', time: '08:00 AM', amount: 31.50, status: 'active' }
  ];

  const filteredSales = mockSales.filter(sale => {
    const matchesSearch = sale.customer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = activeFilter === 'All' || 
      (activeFilter === 'Active' && sale.status === 'active') ||
      (activeFilter === 'Closed' && sale.status === 'closed');
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center space-x-4">
          <input
            type="text"
            placeholder="Search..."
            className="px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          
          {/* Filter Tabs */}
          <div className="flex bg-gray-100 rounded-xl p-1">
            {filters.map(filter => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  activeFilter === filter
                    ? 'bg-blue-500 text-white shadow-sm'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>

          <div className="flex items-center space-x-2 px-3 py-2 bg-blue-50 rounded-lg">
            <span className="text-sm font-medium text-blue-600">{activeCount} Active Queue</span>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <button className="p-2 hover:bg-gray-100 rounded-lg">⋯</button>
        </div>
      </div>

      {/* Sales List */}
      <div className="space-y-4 mb-8">
        {filteredSales.map(sale => (
          <div key={sale.id} className="bg-gray-50 rounded-xl p-6">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <div className="flex items-center space-x-4 mb-2">
                  <h3 className="text-lg font-semibold text-gray-800">{sale.customer}</h3>
                  <span className="text-sm text-gray-500">Order Number: {sale.orderNumber}</span>
                </div>
                <div className="text-sm text-gray-500 mb-1">Table: {sale.table}</div>
                <div className="text-sm text-gray-500">{sale.date} • {sale.time}</div>
              </div>
              
              <div className="text-right">
                <div className="text-xl font-bold text-gray-800 mb-2">${sale.amount.toFixed(2)}</div>
                <div className="flex items-center space-x-2">
                  {sale.status === 'active' ? (
                    <button className="bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-medium hover:bg-blue-600">
                      Archive
                    </button>
                  ) : (
                    <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-sm font-medium">
                      Closed
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}