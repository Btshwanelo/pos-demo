import React, { createContext, useContext, useReducer, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';

// Context and State Management
const AppContext = createContext();

const initialState = {
  user: null,
  products: [
    { id: 1, barcode: 'GP123ABC', name: 'Beef Crowich', price: 5.50, category: 'Sandwich', status: 'available', image: '🥪' },
    { id: 2, barcode: 'CA999XYZ', name: 'Buttermelt Croissant', price: 4.00, category: 'Pastry', status: 'available', image: '🥐' },
    { id: 3, barcode: 'DN456DEF', name: 'Cereal Cream Donut', price: 2.45, category: 'Donut', status: 'available', image: '🍩' },
    { id: 4, barcode: 'CK789GHI', name: 'Cheesy Cheesecake', price: 3.75, category: 'Cake', status: 'available', image: '🍰' },
    { id: 5, barcode: 'BR234JKL', name: 'Cheezy Sourdough', price: 4.50, category: 'Bread', status: 'available', image: '🍞' },
    { id: 6, barcode: 'TR567MNO', name: 'Egg Tart', price: 3.25, category: 'Tart', status: 'available', image: '🥧' },
    { id: 7, barcode: 'BF890PQR', name: 'Sliced Black Forest', price: 5.00, category: 'Cake', status: 'available', image: '🎂' },
    { id: 8, barcode: 'FL123STU', name: 'Solo Floss Bread', price: 4.50, category: 'Bread', status: 'available', image: '🥖' }
  ],
  sales: [
    { id: 1, customerName: 'John Doe', customerPhone: '+1234567890', items: [{ id: 1, name: 'Beef Crowich', price: 5.50, qty: 1 }], total: 5.50, paymentMethod: 'Card', date: '2024-07-22T10:30:00Z', cashier: 'admin' },
    { id: 2, customerName: 'Jane Smith', customerPhone: '+0987654321', items: [{ id: 2, name: 'Buttermelt Croissant', price: 4.00, qty: 2 }], total: 8.00, paymentMethod: 'Cash', date: '2024-07-22T11:15:00Z', cashier: 'admin' }
  ],
  currentSale: {
    items: [],
    customer: { name: '', phone: '' },
    paymentMethod: '',
    total: 0
  }
};

function appReducer(state, action) {
  switch (action.type) {
    case 'LOGIN':
      return { ...state, user: action.payload };
    case 'LOGOUT':
      return { ...state, user: null };
    case 'ADD_TO_CART':
      const newItems = [...state.currentSale.items, action.payload];
      const newTotal = newItems.reduce((sum, item) => sum + (item.price * item.qty), 0);
      return {
        ...state,
        currentSale: {
          ...state.currentSale,
          items: newItems,
          total: newTotal
        }
      };
    case 'SET_CUSTOMER':
      return {
        ...state,
        currentSale: {
          ...state.currentSale,
          customer: action.payload
        }
      };
    case 'SET_PAYMENT_METHOD':
      return {
        ...state,
        currentSale: {
          ...state.currentSale,
          paymentMethod: action.payload
        }
      };
    case 'COMPLETE_SALE':
      const newSale = {
        id: state.sales.length + 1,
        ...state.currentSale,
        date: new Date().toISOString(),
        cashier: state.user.email
      };
      return {
        ...state,
        sales: [...state.sales, newSale],
        currentSale: { items: [], customer: { name: '', phone: '' }, paymentMethod: '', total: 0 }
      };
    case 'RESET_SALE':
      return {
        ...state,
        currentSale: { items: [], customer: { name: '', phone: '' }, paymentMethod: '', total: 0 }
      };
    default:
      return state;
  }
}

function AppProvider({ children }) {
  const [state, dispatch] = useReducer(appReducer, initialState);
  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}

function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
}

// Login Component
function LoginScreen() {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const { dispatch } = useApp();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      if (credentials.email === 'admin@example.com' && credentials.password === '123456') {
        dispatch({ type: 'LOGIN', payload: { email: credentials.email, role: 'admin' } });
        navigate('/pos');
      } else {
        alert('Invalid credentials. Use admin@example.com / 123456');
      }
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-white text-2xl">🏪</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-800">POS Admin Login</h1>
          <p className="text-gray-600 mt-2">Enter your credentials to continue</p>
        </div>
        
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
            <input
              type="email"
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={credentials.email}
              onChange={(e) => setCredentials(prev => ({ ...prev, email: e.target.value }))}
              placeholder="admin@example.com"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
            <input
              type="password"
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={credentials.password}
              onChange={(e) => setCredentials(prev => ({ ...prev, password: e.target.value }))}
              placeholder="123456"
            />
          </div>
          
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 px-4 rounded-lg transition-colors disabled:opacity-50"
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
        
        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <p className="text-sm text-gray-600 text-center">
            Demo credentials:<br />
            Email: <strong>admin@example.com</strong><br />
            Password: <strong>123456</strong>
          </p>
        </div>
      </div>
    </div>
  );
}

// POS Home Component
function POSHome() {
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <span className="text-2xl mr-3">🏪</span>
              <h1 className="text-xl font-semibold text-gray-900">Bakehouse POS</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">Welcome, {state.user?.email}</span>
              <button
                onClick={handleLogout}
                className="text-sm text-red-600 hover:text-red-800 font-medium"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Point of Sale Dashboard</h2>
          <p className="text-lg text-gray-600">Choose an action to continue</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-shadow cursor-pointer" onClick={startNewSale}>
            <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-white text-2xl">🛒</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 text-center mb-3">New Sale</h3>
            <p className="text-gray-600 text-center mb-6">Start a new customer transaction</p>
            <div className="text-center">
              <span className="inline-block bg-green-100 text-green-800 text-sm font-medium px-4 py-2 rounded-full">
                Click to Start
              </span>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-shadow cursor-pointer" onClick={() => navigate('/admin')}>
            <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-white text-2xl">📊</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 text-center mb-3">Admin Panel</h3>
            <p className="text-gray-600 text-center mb-6">View sales, reports, and manage stock</p>
            <div className="text-center">
              <span className="inline-block bg-blue-100 text-blue-800 text-sm font-medium px-4 py-2 rounded-full">
                View Reports
              </span>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-white text-2xl">📈</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 text-center mb-3">Today's Summary</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Total Sales:</span>
                <span className="font-semibold">{state.sales.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Revenue:</span>
                <span className="font-semibold">${state.sales.reduce((sum, sale) => sum + sale.total, 0).toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Products:</span>
                <span className="font-semibold">{state.products.length}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Product Selection Component
function ProductSelection() {
  const [barcode, setBarcode] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const { state, dispatch } = useApp();
  const navigate = useNavigate();

  const handleBarcodeSearch = () => {
    const product = state.products.find(p => p.barcode.toLowerCase() === barcode.toLowerCase());
    if (product) {
      setSelectedProduct(product);
    } else {
      alert('Product not found! Try: GP123ABC, CA999XYZ, DN456DEF');
    }
  };

  const selectProduct = (product) => {
    setSelectedProduct(product);
  };

  const addToCart = () => {
    if (selectedProduct) {
      dispatch({ 
        type: 'ADD_TO_CART', 
        payload: { ...selectedProduct, qty: 1 }
      });
      navigate('/pos/customer');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <button 
              onClick={() => navigate('/pos')}
              className="flex items-center text-blue-600 hover:text-blue-800"
            >
              ← Back to POS
            </button>
            <h1 className="text-xl font-semibold text-gray-900">Select Product</h1>
            <div></div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Barcode Input */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <h2 className="text-lg font-semibold mb-4">Enter Barcode</h2>
          <div className="flex gap-4">
            <input
              type="text"
              placeholder="Enter barcode (e.g., GP123ABC)"
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={barcode}
              onChange={(e) => setBarcode(e.target.value.toUpperCase())}
            />
            <button
              onClick={handleBarcodeSearch}
              className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              Search
            </button>
          </div>
        </div>

        {/* Product Grid */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <h2 className="text-lg font-semibold mb-4">Available Products</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {state.products.map(product => (
              <div 
                key={product.id}
                className={`p-4 border rounded-lg cursor-pointer transition-all ${
                  selectedProduct?.id === product.id 
                    ? 'border-blue-500 bg-blue-50' 
                    : 'border-gray-200 hover:border-gray-300'
                }`}
                onClick={() => selectProduct(product)}
              >
                <div className="text-3xl mb-2 text-center">{product.image}</div>
                <h3 className="font-medium text-center">{product.name}</h3>
                <p className="text-sm text-gray-600 text-center">{product.barcode}</p>
                <p className="text-lg font-semibold text-center text-blue-600">${product.price}</p>
                <p className="text-xs text-gray-500 text-center">{product.category}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Selected Product */}
        {selectedProduct && (
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-lg font-semibold mb-4">Selected Product</h2>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <span className="text-4xl">{selectedProduct.image}</span>
                <div>
                  <h3 className="text-xl font-semibold">{selectedProduct.name}</h3>
                  <p className="text-gray-600">Barcode: {selectedProduct.barcode}</p>
                  <p className="text-gray-600">Category: {selectedProduct.category}</p>
                  <p className="text-2xl font-bold text-green-600">${selectedProduct.price}</p>
                </div>
              </div>
              <button
                onClick={addToCart}
                className="px-8 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors font-medium"
              >
                Add to Cart → Customer Info
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// Customer Info Component
function CustomerInfo() {
  const [customer, setCustomer] = useState({ name: '', phone: '' });
  const { state, dispatch } = useApp();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (customer.name && customer.phone) {
      dispatch({ type: 'SET_CUSTOMER', payload: customer });
      navigate('/pos/payment');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <button 
              onClick={() => navigate('/pos/products')}
              className="flex items-center text-blue-600 hover:text-blue-800"
            >
              ← Back to Products
            </button>
            <h1 className="text-xl font-semibold text-gray-900">Customer Information</h1>
            <div></div>
          </div>
        </div>
      </header>

      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <div className="text-center mb-8">
            <span className="text-4xl">👤</span>
            <h2 className="text-2xl font-semibold mt-4 mb-2">Customer Details</h2>
            <p className="text-gray-600">Please enter customer information</p>
          </div>

          {/* Order Summary */}
          <div className="mb-8 p-4 bg-gray-50 rounded-lg">
            <h3 className="font-semibold mb-2">Order Summary</h3>
            {state.currentSale.items.map((item, index) => (
              <div key={index} className="flex justify-between items-center">
                <span>{item.name}</span>
                <span>${item.price}</span>
              </div>
            ))}
            <div className="border-t pt-2 mt-2 font-semibold">
              <div className="flex justify-between">
                <span>Total:</span>
                <span>${state.currentSale.total.toFixed(2)}</span>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Customer Name *</label>
              <input
                type="text"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={customer.name}
                onChange={(e) => setCustomer(prev => ({ ...prev, name: e.target.value }))}
                placeholder="Enter customer name"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number *</label>
              <input
                type="tel"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={customer.phone}
                onChange={(e) => setCustomer(prev => ({ ...prev, phone: e.target.value }))}
                placeholder="Enter phone number"
              />
            </div>
            
            <button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 px-4 rounded-lg transition-colors"
            >
              Continue to Payment →
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

// Payment Method Component
function PaymentMethod() {
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

// Payment Processing Component
function PaymentProcessing() {
  const [processing, setProcessing] = useState(true);
  const [success, setSuccess] = useState(false);
  const { state, dispatch } = useApp();
  const navigate = useNavigate();

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setProcessing(false);
      setSuccess(true);
      dispatch({ type: 'COMPLETE_SALE' });
    }, 3000);

    return () => clearTimeout(timer);
  }, [dispatch]);

  if (processing) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="bg-white rounded-2xl shadow-lg p-12 text-center max-w-md w-full mx-4">
          <div className="animate-spin w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-6"></div>
          <h2 className="text-2xl font-semibold mb-2">Processing Payment</h2>
          <p className="text-gray-600 mb-4">Please wait while we process your {state.currentSale.paymentMethod} payment...</p>
          <div className="text-sm text-gray-500">
            Amount: ${state.currentSale.total.toFixed(2)}
          </div>
        </div>
      </div>
    );
  }

  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 flex items-center justify-center">
        <div className="bg-white rounded-2xl shadow-lg p-12 text-center max-w-md w-full mx-4">
          <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-white text-2xl">✓</span>
          </div>
          <h2 className="text-2xl font-semibold text-green-800 mb-2">Payment Successful!</h2>
          <p className="text-gray-600 mb-6">Transaction completed successfully</p>
          <div className="space-y-2 mb-8">
            <div className="flex justify-between text-sm">
              <span>Amount:</span>
              <span className="font-medium">${state.currentSale.total.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Method:</span>
              <span className="font-medium capitalize">{state.currentSale.paymentMethod}</span>
            </div>
          </div>
          <div className="flex space-x-4">
            <button
              onClick={() => navigate('/pos/receipt')}
              className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-3 px-4 rounded-lg transition-colors"
            >
              View Receipt
            </button>
            <button
              onClick={() => navigate('/pos')}
              className="flex-1 bg-green-500 hover:bg-green-600 text-white py-3 px-4 rounded-lg transition-colors"
            >
              New Sale
            </button>
          </div>
        </div>
      </div>
    );
  }
}

// Receipt Component
function Receipt() {
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

// Admin Panel Component
function AdminPanel() {
  const [activeTab, setActiveTab] = useState('sales');
  const { state, dispatch } = useApp();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch({ type: 'LOGOUT' });
    navigate('/');
  };

  const tabs = [
    { id: 'sales', name: 'Sales History', icon: '📊' },
    { id: 'products', name: 'Stock Management', icon: '📦' },
    { id: 'reports', name: 'Reports', icon: '📈' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => navigate('/pos')}
                className="text-blue-600 hover:text-blue-800"
              >
                ← Back to POS
              </button>
              <h1 className="text-xl font-semibold text-gray-900">Admin Panel</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">Admin: {state.user?.email}</span>
              <button
                onClick={handleLogout}
                className="text-sm text-red-600 hover:text-red-800 font-medium"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tab Navigation */}
        <div className="bg-white rounded-lg shadow-sm border mb-8">
          <div className="flex">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 px-6 py-4 text-center font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'bg-blue-500 text-white'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                } ${tab.id === tabs[0].id ? 'rounded-l-lg' : ''} ${
                  tab.id === tabs[tabs.length - 1].id ? 'rounded-r-lg' : ''
                }`}
              >
                <span className="mr-2">{tab.icon}</span>
                {tab.name}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === 'sales' && <SalesHistory sales={state.sales} />}
        {activeTab === 'products' && <StockManagement products={state.products} />}
        {activeTab === 'reports' && <Reports sales={state.sales} products={state.products} />}
      </div>
    </div>
  );
}

// Sales History Component
function SalesHistory({ sales }) {
  const [filter, setFilter] = useState('all');
  
  const filteredSales = sales.filter(sale => {
    if (filter === 'today') {
      const today = new Date().toDateString();
      return new Date(sale.date).toDateString() === today;
    }
    return true;
  });

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Sales History</h2>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="all">All Sales</option>
          <option value="today">Today Only</option>
        </select>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="text-left py-3 px-4">Sale ID</th>
              <th className="text-left py-3 px-4">Customer</th>
              <th className="text-left py-3 px-4">Items</th>
              <th className="text-left py-3 px-4">Total</th>
              <th className="text-left py-3 px-4">Payment</th>
              <th className="text-left py-3 px-4">Date</th>
              <th className="text-left py-3 px-4">Cashier</th>
            </tr>
          </thead>
          <tbody>
            {filteredSales.map(sale => (
              <tr key={sale.id} className="border-b hover:bg-gray-50">
                <td className="py-3 px-4 font-medium">#{sale.id.toString().padStart(4, '0')}</td>
                <td className="py-3 px-4">
                  <div>
                    <div className="font-medium">{sale.customerName}</div>
                    <div className="text-sm text-gray-600">{sale.customerPhone}</div>
                  </div>
                </td>
                <td className="py-3 px-4">
                  <div className="text-sm">
                    {sale.items.map(item => (
                      <div key={item.id}>{item.name} x{item.qty}</div>
                    ))}
                  </div>
                </td>
                <td className="py-3 px-4 font-medium text-green-600">${sale.total.toFixed(2)}</td>
                <td className="py-3 px-4">
                  <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-sm capitalize">
                    {sale.paymentMethod}
                  </span>
                </td>
                <td className="py-3 px-4 text-sm text-gray-600">
                  {new Date(sale.date).toLocaleString()}
                </td>
                <td className="py-3 px-4 text-sm">{sale.cashier}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {filteredSales.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          No sales found for the selected filter.
        </div>
      )}
    </div>
  );
}

// Stock Management Component
function StockManagement({ products }) {
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

// Reports Component
function Reports({ sales, products }) {
  const totalSales = sales.length;
  const totalRevenue = sales.reduce((sum, sale) => sum + sale.total, 0);
  const avgSale = totalRevenue / totalSales || 0;
  
  const paymentMethodStats = sales.reduce((acc, sale) => {
    acc[sale.paymentMethod] = (acc[sale.paymentMethod] || 0) + 1;
    return acc;
  }, {});

  const topProducts = products.map(product => {
    const sales = Math.floor(Math.random() * 100); // Mock sales data
    return { ...product, sales };
  }).sort((a, b) => b.sales - a.sales).slice(0, 5);

  return (
    <div className="space-y-8">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
          <div className="text-3xl mb-2">📊</div>
          <div className="text-2xl font-bold text-blue-600">{totalSales}</div>
          <div className="text-sm text-gray-600">Total Sales</div>
        </div>
        <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
          <div className="text-3xl mb-2">💰</div>
          <div className="text-2xl font-bold text-green-600">${totalRevenue.toFixed(2)}</div>
          <div className="text-sm text-gray-600">Total Revenue</div>
        </div>
        <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
          <div className="text-3xl mb-2">📈</div>
          <div className="text-2xl font-bold text-purple-600">${avgSale.toFixed(2)}</div>
          <div className="text-sm text-gray-600">Average Sale</div>
        </div>
        <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
          <div className="text-3xl mb-2">📦</div>
          <div className="text-2xl font-bold text-orange-600">{products.length}</div>
          <div className="text-sm text-gray-600">Products</div>
        </div>
      </div>

      {/* Payment Methods & Top Products */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h3 className="text-lg font-semibold mb-4">Payment Methods</h3>
          <div className="space-y-3">
            {Object.entries(paymentMethodStats).map(([method, count]) => (
              <div key={method} className="flex justify-between items-center">
                <span className="capitalize">{method}</span>
                <div className="flex items-center">
                  <div className="w-32 bg-gray-200 rounded-full h-2 mr-3">
                    <div
                      className="bg-blue-500 h-2 rounded-full"
                      style={{ width: `${(count / totalSales) * 100}%` }}
                    ></div>
                  </div>
                  <span className="font-medium">{count}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h3 className="text-lg font-semibold mb-4">Top Products</h3>
          <div className="space-y-3">
            {topProducts.map((product, index) => (
              <div key={product.id} className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-sm font-medium">
                  {index + 1}
                </div>
                <span className="text-xl">{product.image}</span>
                <div className="flex-1">
                  <div className="font-medium">{product.name}</div>
                  <div className="text-sm text-gray-600">${product.price}</div>
                </div>
                <div className="text-sm font-medium text-blue-600">
                  {product.sales} sold
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// Protected Route Component
function ProtectedRoute({ children }) {
  const { state } = useApp();
  return state.user ? children : <Navigate to="/" replace />;
}

// Main App Component
function App() {
  return (
    <AppProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LoginScreen />} />
          <Route path="/pos" element={
            <ProtectedRoute>
              <POSHome />
            </ProtectedRoute>
          } />
          <Route path="/pos/products" element={
            <ProtectedRoute>
              <ProductSelection />
            </ProtectedRoute>
          } />
          <Route path="/pos/customer" element={
            <ProtectedRoute>
              <CustomerInfo />
            </ProtectedRoute>
          } />
          <Route path="/pos/payment" element={
            <ProtectedRoute>
              <PaymentMethod />
            </ProtectedRoute>
          } />
          <Route path="/pos/processing" element={
            <ProtectedRoute>
              <PaymentProcessing />
            </ProtectedRoute>
          } />
          <Route path="/pos/receipt" element={
            <ProtectedRoute>
              <Receipt />
            </ProtectedRoute>
          } />
          <Route path="/admin" element={
            <ProtectedRoute>
              <AdminPanel />
            </ProtectedRoute>
          } />
        </Routes>
      </Router>
    </AppProvider>
  );
}

export default App;