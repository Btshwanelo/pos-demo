import React, { useState } from 'react';

export default function SalesHistory({ sales }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');
  
  const filters = ['All', 'Active', 'Completed'];
  const activeCount = 4; // Mock active service count
  
  const mockSales = [
    { 
      id: '006', 
      customer: 'Robert Martinez', 
      orderNumber: '#006', 
      vehicleNumber: 'LMN-987', 
      vehicleType: 'Car',
      date: '29 May 2024', 
      time: '11:15 AM', 
      amount: 97.00, 
      status: 'active',
      services: ['Personalized Number Plate', 'Number Plate Frame']
    },
    { 
      id: '005', 
      customer: 'Jennifer Lee', 
      orderNumber: '#005', 
      vehicleNumber: 'PQR-654', 
      vehicleType: 'Commercial',
      date: '29 May 2024', 
      time: '10:30 AM', 
      amount: 155.00, 
      status: 'completed',
      services: ['Commercial Vehicle Plate', 'Vehicle Inspection', 'Express Registration']
    },
    { 
      id: '004', 
      customer: 'David Kim', 
      orderNumber: '#004', 
      vehicleNumber: 'STU-321', 
      vehicleType: 'Motorcycle',
      date: '29 May 2024', 
      time: '09:45 AM', 
      amount: 42.00, 
      status: 'active',
      services: ['Motorcycle Number Plate', 'Security Screws']
    },
    { 
      id: '003', 
      customer: 'Amanda Thompson', 
      orderNumber: '#003', 
      vehicleNumber: 'VWX-159', 
      vehicleType: 'Car',
      date: '29 May 2024', 
      time: '08:30 AM', 
      amount: 75.00, 
      status: 'completed',
      services: ['Standard Number Plate', 'Express Registration', 'Processing Fee']
    },
    { 
      id: '002', 
      customer: 'Carlos Rodriguez', 
      orderNumber: '#002', 
      vehicleNumber: 'YZA-753', 
      vehicleType: 'Truck',
      date: '29 May 2024', 
      time: '08:00 AM', 
      amount: 110.00, 
      status: 'active',
      services: ['Commercial Vehicle Plate', 'Title Transfer', 'Reflective Coating']
    }
  ];

  const filteredSales = mockSales.filter(sale => {
    const matchesSearch = sale.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         sale.vehicleNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         sale.orderNumber.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = activeFilter === 'All' || 
      (activeFilter === 'Active' && sale.status === 'active') ||
      (activeFilter === 'Completed' && sale.status === 'completed');
    return matchesSearch && matchesFilter;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-blue-100 text-blue-700';
      case 'completed': return 'bg-green-100 text-green-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getVehicleIcon = (vehicleType) => {
    switch (vehicleType.toLowerCase()) {
      case 'car': return '🚗';
      case 'motorcycle': return '🏍️';
      case 'truck': return '🚛';
      case 'commercial': return '🚐';
      case 'bus': return '🚌';
      default: return '🚙';
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center space-x-4">
          <input
            type="text"
            placeholder="Search by customer, vehicle, or order..."
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
            <span className="text-sm font-medium text-blue-600">{activeCount} Active Services</span>
          </div>
        </div>

        {/* <div className="flex items-center space-x-2">
          <button className="bg-green-500 text-white px-4 py-2 rounded-xl hover:bg-green-600">
            New Service Order
          </button>
          <button className="p-2 hover:bg-gray-100 rounded-lg">⋯</button>
        </div> */}
      </div>

      {/* Service Orders List */}
      <div className="space-y-4 mb-8">
        {filteredSales.map(sale => (
          <div key={sale.id} className="bg-gray-50 rounded-xl p-6">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <div className="flex items-center space-x-4 mb-3">
                  <div className="flex items-center space-x-2">
                    <span className="text-xl">{getVehicleIcon(sale.vehicleType)}</span>
                    <h3 className="text-lg font-semibold text-gray-800">{sale.customer}</h3>
                  </div>
                  <span className="text-sm text-gray-500">Order: {sale.orderNumber}</span>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(sale.status)}`}>
                    {sale.status === 'active' ? 'In Progress' : 'Completed'}
                  </span>
                </div>
                
                <div className="grid grid-cols-3 gap-4 mb-4">
                  <div>
                    <span className="text-sm text-gray-500">Vehicle:</span>
                    <div className="font-medium text-gray-800">{sale.vehicleNumber}</div>
                    <div className="text-xs text-gray-500">{sale.vehicleType}</div>
                  </div>
                  <div>
                    <span className="text-sm text-gray-500">Date & Time:</span>
                    <div className="font-medium text-gray-800">{sale.date}</div>
                    <div className="text-xs text-gray-500">{sale.time}</div>
                  </div>
                  <div>
                    <span className="text-sm text-gray-500">Total Amount:</span>
                    <div className="font-bold text-lg text-gray-800">${sale.amount.toFixed(2)}</div>
                  </div>
                </div>

                {/* <div>
                  <span className="text-sm text-gray-500 mb-2 block">Services Included:</span>
                  <div className="flex flex-wrap gap-2">
                    {sale.services.map((service, index) => (
                      <span key={index} className="bg-white border border-gray-200 text-gray-700 px-3 py-1 rounded-full text-xs font-medium">
                        {service}
                      </span>
                    ))}
                  </div>
                </div> */}
              </div>
              
              <div className="text-right ml-6">
                <div className="flex items-center space-x-2 mb-4">
                  {sale.status === 'active' ? (
                    <div className="flex space-x-2">
                      <button className="bg-blue-100 text-blue-700 px-1 py-1 rounded-xl text-sm font-medium hover:bg-green-600 transition-all">
                        Complete Service
                      </button>
                      <button className="bg-yellow-100 text-yellow-700 px-1 py-1 rounded-lg text-sm font-medium hover:bg-yellow-600 transition-all">
                        Update Status
                      </button>
                    </div>
                  ) : (
                    <div className="flex space-x-2">
                      <button className="bg-blue-100 text-blue-700 px-1 py-1 rounded-lg text-sm font-medium hover:bg-blue-600 transition-all">
                        Print Receipt
                      </button>
                      <span className="bg-gray-100 text-gray-700 px-1 py-1 rounded-lg text-sm font-medium">
                        Archived
                      </span>
                    </div>
                  )}
                </div>
                {/* <div className="flex space-x-3 text-sm">
                  <button className="text-blue-500 hover:text-blue-600 font-medium">
                    View Details
                  </button>
                  <button className="text-gray-500 hover:text-gray-700">
                    Edit Order
                  </button>
                </div> */}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Stats Summary */}
      <div className="bg-white rounded-xl p-6 border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Today's Service Summary</h3>
        <div className="grid grid-cols-4 gap-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600 mb-1">{filteredSales.length}</div>
            <div className="text-sm text-gray-600">Total Orders</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600 mb-1">
              {filteredSales.filter(s => s.status === 'completed').length}
            </div>
            <div className="text-sm text-gray-600">Completed</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-yellow-600 mb-1">
              {filteredSales.filter(s => s.status === 'active').length}
            </div>
            <div className="text-sm text-gray-600">In Progress</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-800 mb-1">
              ${filteredSales.reduce((sum, sale) => sum + sale.amount, 0).toFixed(2)}
            </div>
            <div className="text-sm text-gray-600">Revenue</div>
          </div>
        </div>
      </div>

      {/* No results message */}
      {filteredSales.length === 0 && (
        <div className="text-center py-12 bg-white rounded-xl">
          <div className="text-gray-400 text-4xl mb-4">🔍</div>
          <h3 className="text-lg font-medium text-gray-700 mb-2">No service orders found</h3>
          <p className="text-gray-500 mb-4">Try adjusting your search terms or filters</p>
          <button className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600">
            Clear Filters
          </button>
        </div>
      )}
    </div>
  );
}