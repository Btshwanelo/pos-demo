import React, { useState } from 'react';

export default function StockManagement({ products }) {
  const [searchTerm, setSearchTerm] = useState('');
  
  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.barcode.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Stock Management</h2>
        <input
          type="text"
          placeholder="Search products..."
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredProducts.map(product => (
          <div key={product.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
            <div className="text-center">
              <span className="text-4xl mb-2 block">{product.image}</span>
              <h3 className="font-medium mb-1">{product.name}</h3>
              <p className="text-sm text-gray-600 mb-1">{product.barcode}</p>
              <p className="text-lg font-semibold text-blue-600 mb-2">${product.price}</p>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                product.status === 'available'
                  ? 'bg-green-100 text-green-800'
                  : 'bg-red-100 text-red-800'
              }`}>
                {product.status}
              </span>
            </div>
            <div className="mt-4">
              <button className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg transition-colors text-sm">
                Edit Product
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}