import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { ArrowBigLeft, ArrowLeft, Pen, PenBoxIcon } from 'lucide-react';

export default function ProductSelection() {
  const [barcode, setBarcode] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [activeCategory, setActiveCategory] = useState('All Products');
  const [cartItems, setCartItems] = useState([]);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [showReceipt, setShowReceipt] = useState(false);
  const [completedOrder, setCompletedOrder] = useState(null);
  const [cartAnimation, setCartAnimation] = useState(false);
  const [scannerActive, setScannerActive] = useState(false);
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    phone: '',
    email: '',
    vehicleNumber: '', // Changed from idNumber to vehicleNumber for number plate store
    vehicleType: 'Car', // New field for vehicle type
    orderType: 'Walk In'
  });
  const [showCustomerModal, setShowCustomerModal] = useState(false);

  const { state, dispatch } = useApp();
  const navigate = useNavigate();

  // Updated categories for number plate store
  const categories = [
    { name: 'All Products', icon: '🏪', count: 16 },
    { name: 'Standard Plates', icon: '🏷️', count: 1 },
    { name: 'Personalized Plates', icon: '⭐', count: 1 },
    { name: 'Commercial Plates', icon: '🚛', count: 1 },
    { name: 'Motorcycle Plates', icon: '🏍️', count: 1 },
    { name: 'Temporary Plates', icon: '📝', count: 1 },
    { name: 'Replacement Plates', icon: '🔄', count: 1 },
    { name: 'Services', icon: '⚙️', count: 6 },
    { name: 'Accessories', icon: '🛠️', count: 3 },
    { name: 'Fees', icon: '💰', count: 1 }
  ];

  const paymentMethods = [
    { id: 'cash', name: 'Cash', icon: '💵', description: 'Pay with cash' },
    { id: 'card', name: 'Card', icon: '💳', description: 'Credit/Debit card' },
    { id: 'mobile', name: 'Mobile', icon: '📱', description: 'Mobile payment' },
    { id: 'check', name: 'Check', icon: '📝', description: 'Bank check payment' }
  ];

  const handleBarcodeSearch = () => {
    if (!barcode.trim()) return;
    
    setScannerActive(true);
    
    // Simulate scanner delay
    setTimeout(() => {
      const product = state.products.find(p => p.barcode.toLowerCase() === barcode.toLowerCase());
      if (product) {
        // Automatically add scanned product to cart
        const existingItem = cartItems.find(item => item.id === product.id);
        
        if (existingItem) {
          setCartItems(cartItems.map(item => 
            item.id === product.id 
              ? { ...item, qty: item.qty + 1 }
              : item
          ));
        } else {
          setCartItems([...cartItems, { ...product, qty: 1 }]);
        }
        
        // Trigger cart animation
        setCartAnimation(true);
        setTimeout(() => setCartAnimation(false), 600);
        
        // Visual feedback - briefly highlight the product
        setSelectedProduct(product);
        setTimeout(() => setSelectedProduct(null), 1000);
        
        // Clear barcode input
        setBarcode('');
        
        // Success feedback
        // showTemporaryMessage(`✅ ${product.name} added to cart`, 'success');
      } else {
        // Error feedback
        showTemporaryMessage('❌ Product not found', 'error');
      }
      
      setScannerActive(false);
    }, 500); // 500ms scanner simulation delay
  };

  const showTemporaryMessage = (message, type) => {
    // Play scanner beep sound simulation
    if (type === 'success') {
      // Success beep simulation
      playBeep(800, 100); // High pitch beep
    } else {
      // Error beep simulation  
      playBeep(300, 200); // Lower pitch beep
    }
    
    // Create a temporary message element
    const messageDiv = document.createElement('div');
    messageDiv.textContent = message;
    messageDiv.className = `fixed top-20 right-4 z-50 px-6 py-3 rounded-lg font-medium ${
      type === 'success' 
        ? 'bg-green-500 text-white border border-green-600' 
        : 'bg-red-500 text-white border border-red-600'
    } shadow-xl transform translate-x-full transition-all duration-300`;
    
    document.body.appendChild(messageDiv);
    
    // Animate in
    setTimeout(() => {
      messageDiv.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 3 seconds
    setTimeout(() => {
      messageDiv.style.transform = 'translateX(100%)';
      setTimeout(() => {
        if (document.body.contains(messageDiv)) {
          document.body.removeChild(messageDiv);
        }
      }, 300);
    }, 3000);
  };

  const playBeep = (frequency, duration) => {
    // Simple beep sound simulation using Web Audio API
    try {
      const audioContext = new (window.AudioContext || window.webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      oscillator.frequency.value = frequency;
      oscillator.type = 'square';
      
      gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration / 1000);
      
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + duration / 1000);
    } catch (error) {
      // Fallback for browsers that don't support Web Audio API
      console.log('Beep:', type === 'success' ? '✅' : '❌');
    }
  };

  const selectProduct = (product) => {
    // Automatically add to cart when product is selected
    const existingItem = cartItems.find(item => item.id === product.id);
    
    if (existingItem) {
      setCartItems(cartItems.map(item => 
        item.id === product.id 
          ? { ...item, qty: item.qty + 1 }
          : item
      ));
    } else {
      setCartItems([...cartItems, { ...product, qty: 1 }]);
    }
    
    // Visual feedback - briefly highlight the product
    setSelectedProduct(product);
    setTimeout(() => setSelectedProduct(null), 500);
  };

  const updateCartItemQuantity = (itemId, change) => {
    setCartItems(cartItems.map(item => {
      if (item.id === itemId) {
        const newQty = item.qty + change;
        return newQty > 0 ? { ...item, qty: newQty } : null;
      }
      return item;
    }).filter(Boolean));
  };

  const removeFromCart = (itemId) => {
    setCartItems(cartItems.filter(item => item.id !== itemId));
  };

  const getTotal = () => {
    return cartItems.reduce((sum, item) => sum + (item.price * item.qty), 0);
  };

  const getTax = () => {
    return getTotal() * 0.08; // 8% tax for services
  };

  const getFinalTotal = () => {
    return getTotal() + getTax();
  };

  const handlePayment = () => {
    if (cartItems.length === 0) {
      alert('Please add items to cart first');
      return;
    }
    setShowCustomerModal(true);
  };

  const proceedToPayment = () => {
    if (!customerInfo.name || !customerInfo.phone) {
      alert('Please fill in customer name and phone number');
      return;
    }
    setShowCustomerModal(false);
    setShowPaymentModal(true);
  };

  const processPayment = () => {
    if (!selectedPaymentMethod) {
      alert('Please select a payment method');
      return;
    }

    setIsProcessing(true);
    setShowPaymentModal(false);

    // Simulate payment processing
    setTimeout(() => {
      const newOrder = {
        id: Date.now(),
        customerName: customerInfo.name,
        vehicleNumber: customerInfo.vehicleNumber,
        vehicleType: customerInfo.vehicleType,
        orderType: customerInfo.orderType,
        items: cartItems,
        subtotal: getTotal(),
        tax: getTax(),
        total: getFinalTotal(),
        paymentMethod: selectedPaymentMethod,
        date: new Date().toISOString(),
        status: 'completed'
      };

      // Save to state
      dispatch({
        type: 'COMPLETE_SALE',
        payload: {
          ...newOrder,
          customerPhone: customerInfo.phone,
          cashier: state.user?.email || 'admin@example.com'
        }
      });

      setCompletedOrder(newOrder);
      setIsProcessing(false);
      setShowReceipt(true);
    }, 2000);
  };

  const startNewOrder = () => {
    setCartItems([]);
    setSelectedProduct(null);
    setCustomerInfo({ 
      name: '', 
      phone: '', 
      email: '', 
      vehicleNumber: '', 
      vehicleType: 'Car', 
      orderType: 'Walk In' 
    });
    setSelectedPaymentMethod('');
    setShowReceipt(false);
    setCompletedOrder(null);
    setShowCustomerModal(false);
  };

  const filteredProducts = activeCategory === 'All Products' 
    ? state.products 
    : state.products.filter(p => p.category === activeCategory.slice(0, -1) || p.category === activeCategory);

  // Payment Processing Modal (same as before)
  if (isProcessing) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center p-4">
        <div className="bg-white shadow-2xl p-12 text-center max-w-lg w-full">
          <div className="relative mb-8">
            <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
              <span className="text-white text-3xl">
                {selectedPaymentMethod === 'cash' ? '💵' : 
                 selectedPaymentMethod === 'card' ? '💳' : 
                 selectedPaymentMethod === 'check' ? '📝' : '📱'}
              </span>
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-32 h-32 border-4 border-blue-200 border-t-blue-500 rounded-full animate-spin"></div>
            </div>
          </div>
          <div className="space-y-4 mb-8">
            <h2 className="text-3xl font-bold text-gray-800">Processing Payment</h2>
            <p className="text-lg text-gray-600">
              Please wait while we process your <span className="font-semibold capitalize text-blue-600">{selectedPaymentMethod}</span> payment
            </p>
            <div className="bg-blue-50 rounded-2xl p-6 mt-6">
              <div className="text-sm text-blue-600 font-medium mb-1">Total Amount</div>
              <div className="text-3xl font-bold text-blue-800">${getFinalTotal().toFixed(2)}</div>
            </div>
          </div>
          <div className="flex justify-center space-x-4 mb-6">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
              <span className="text-sm text-gray-600">Connecting</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
              <span className="text-sm text-gray-400">Processing</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
              <span className="text-sm text-gray-400">Complete</span>
            </div>
          </div>
          <div className="flex items-center justify-center space-x-2 text-xs text-gray-500">
            <span>🔒</span>
            <span>Secured by SSL encryption</span>
          </div>
        </div>
      </div>
    );
  }

  // Receipt Modal (updated for number plate store)
  if (showReceipt && completedOrder) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center p-4">
        <div className="bg-white shadow-2xl p-8 max-w-lg w-full">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-green-800 mb-3">Payment Successful!</h2>            
            <div className="flex justify-center space-x-4 mt-4">
              <div className="bg-blue-50 px-3 py-1 rounded-full">
                <span className="text-xs font-medium text-blue-600">Order #{completedOrder.id.toString().slice(-4)}</span>
              </div>
              <div className="bg-green-50 px-3 py-1 rounded-full">
                <span className="text-xs font-medium text-green-600 capitalize">{completedOrder.paymentMethod}</span>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-sm p-6 mb-8 shadow-inner">
            <div className="text-center mb-6 pb-4 border-b border-gray-200">
              <div className="flex items-center justify-center space-x-2 mb-2">
                <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                  <span className="text-white text-sm">🏷️</span>
                </div>
                <h3 className="text-xl font-bold text-gray-800">Number Plate Services</h3>
              </div>
              <div className="mt-3 inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
                <span className="text-xs font-semibold">Receipt #{completedOrder.id.toString().slice(-4)}</span>
              </div>
            </div>
            
            {/* Customer Info Card */}
            <div className="bg-white rounded-xl p-4 mb-4 shadow-sm">
              <h4 className="font-semibold text-gray-800 mb-3 flex items-center">
                <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                Customer Information
              </h4>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-500">Name:</span>
                  <div className="font-medium text-gray-800">{completedOrder.customerName}</div>
                </div>
                <div>
                  <span className="text-gray-500">Vehicle #:</span>
                  <div className="font-medium text-gray-800">{completedOrder.vehicleNumber || 'N/A'}</div>
                </div>
                <div>
                  <span className="text-gray-500">Vehicle Type:</span>
                  <div className="font-medium text-gray-800">{completedOrder.vehicleType}</div>
                </div>
                <div>
                  <span className="text-gray-500">Time:</span>
                  <div className="font-medium text-gray-800">{new Date(completedOrder.date).toLocaleTimeString()}</div>
                </div>
              </div>
            </div>

            {/* Items List */}
            <div className="bg-white rounded-xl p-4 mb-4 shadow-sm">
              <h4 className="font-semibold text-gray-800 mb-3 flex items-center">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                Order Items
              </h4>
              <div className="space-y-3">
                {completedOrder.items.map((item, index) => (
                  <div key={index} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                    <div className="flex items-center space-x-3">
                      <span className="text-lg">{item.image}</span>
                      <div>
                        <div className="font-medium text-gray-800 text-sm">{item.name}</div>
                        <div className="text-xs text-gray-500">${item.price} × {item.qty}</div>
                      </div>
                    </div>
                    <div className="font-semibold text-gray-800">
                      ${(item.price * item.qty).toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Totals */}
            <div className="bg-white rounded-xl p-4 shadow-sm">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Subtotal:</span>
                  <span className="font-medium">${completedOrder.subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Tax (8%):</span>
                  <span className="font-medium">${completedOrder.tax.toFixed(2)}</span>
                </div>
                <div className="border-t pt-2">
                  <div className="flex justify-between">
                    <span className="text-lg font-bold text-gray-800">Total:</span>
                    <span className="text-lg font-bold text-green-600">${completedOrder.total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Method Badge */}
            <div className="text-center mt-4">
              <div className="inline-flex items-center space-x-2 bg-green-100 text-green-800 px-4 py-2 rounded-full">
                <span>
                  {completedOrder.paymentMethod === 'cash' ? '💵' : 
                   completedOrder.paymentMethod === 'card' ? '💳' : 
                   completedOrder.paymentMethod === 'check' ? '📝' : '📱'}
                </span>
                <span className="font-semibold text-sm capitalize">Paid via {completedOrder.paymentMethod}</span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-4">
            <button
              onClick={() => window.print()}
              className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-4 rounded-2xl font-semibold transition-all shadow-lg hover:shadow-xl flex items-center justify-center space-x-2"
            >
              <span>Print Receipt</span>
            </button>
            <button
              onClick={startNewOrder}
              className="flex-1 bg-green-500 hover:bg-green-600 text-white py-4 rounded-2xl font-semibold transition-all shadow-lg hover:shadow-xl flex items-center justify-center space-x-2"
            >
              <span>New Order</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-white rounded-2xl shadow-sm m-4 p-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <div className="flex mr-4 items-center space-x-2 cursor-pointer mr-auto" onClick={() => navigate('/pos')} >
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                <span className="text-white text-sm">🏷️</span>
              </div>
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
            <button className="text-sm text-red-500 hover:text-red-700 font-medium px-4 py-2 rounded-lg hover:bg-red-50 transition-all">
              Logout
            </button>
          </div>
        </div>
      </div>

      <div className="px-4 pb-4">
        <div className="grid grid-cols-12 gap-6">
          {/* Left Side - Categories and Products */}
          <div className="col-span-8">
            {/* Category Tabs */}
            <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
              {/* <div className="flex space-x-2 mb-6 overflow-x-auto">
                {categories.map(category => (
                  <button
                    key={category.name}
                    onClick={() => setActiveCategory(category.name)}
                    className={`flex flex-col items-center p-4 rounded-2xl min-w-[120px] transition-all ${
                      activeCategory === category.name
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    <span className="text-2xl mb-2">{category.icon}</span>
                    <span className="font-medium text-sm text-center">{category.name}</span>
                    <span className="text-xs opacity-75">{category.count} Items</span>
                  </button>
                ))}
              </div> */}

              {/* Search Bar */}
              <div className="relative mb-6">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Scan or enter barcode (e.g., SNP001, SRV001, ACC001)..."
                    className="w-full pl-12 pr-16 py-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg font-mono"
                    value={barcode}
                    onChange={(e) => setBarcode(e.target.value.toUpperCase())}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter' && barcode.trim()) {
                        handleBarcodeSearch();
                      }
                    }}
                    autoFocus
                  />
                  <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                    </svg>
                  </div>
                  <button
                    onClick={handleBarcodeSearch}
                    disabled={!barcode.trim() || scannerActive}
                    className={`absolute right-2 top-1/2 transform -translate-y-1/2 px-4 py-2 rounded-lg transition-all font-medium ${
                      scannerActive 
                        ? 'bg-blue-500 hover:bg-blue-600 text-white' 
                        : 'bg-blue-500 hover:bg-blue-600 text-white'
                    } ${!barcode.trim() ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    {scannerActive ? (
                      <div className="flex items-center space-x-1">
                        <div className="w-3 h-3 border border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Scanning</span>
                      </div>
                    ) : (
                      'Scan'
                    )}
                  </button>
                </div>
                
                {/* Scanner simulation indicator */}
                <div className="flex items-center justify-center mt-2">
                  <div className="flex items-center space-x-2 text-sm text-gray-500">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span>Scanner Ready - Enter barcode or press scan</span>
                  </div>
                </div>
                
                {/* Quick barcode examples */}
                <div className="mt-3 flex flex-wrap gap-2">
                  <span className="text-xs text-gray-500">Quick test:</span>
                  {['SNP001', 'SRV001', 'ACC001', 'PNP002'].map(code => (
                    <button
                      key={code}
                      onClick={() => {
                        setBarcode(code);
                        setTimeout(() => handleBarcodeSearch(), 100);
                      }}
                      className="px-2 py-1 bg-gray-100 hover:bg-blue-100 text-xs font-mono rounded border hover:border-blue-300 transition-colors"
                    >
                      {code}
                    </button>
                  ))}
                </div>
              </div>

              {/* Products Grid */}
              <div className="grid grid-cols-4 gap-4">
                {filteredProducts.map(product => (
                  <div 
                    key={product.id}
                    className={`p-4 border-2 rounded-xl cursor-pointer transition-all hover:shadow-lg ${
                      selectedProduct?.id === product.id 
                        ? 'border-blue-500 bg-blue-50' 
                        : 'border-gray-100 hover:border-gray-200'
                    }`}
                    onClick={() => selectProduct(product)}
                  >
                    <div className="text-center">
                      <div className="text-4xl mb-3">{product.image}</div>
                      <h3 className="font-medium text-gray-800 mb-1 text-sm">{product.name}</h3>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        product.category === 'Services' ? 'bg-blue-100 text-blue-600' :
                        product.category === 'Accessories' ? 'bg-green-100 text-green-600' :
                        product.category === 'Fees' ? 'bg-yellow-100 text-yellow-600' :
                        product.category.includes('Plates') ? 'bg-purple-100 text-purple-600' :
                        'bg-gray-100 text-gray-600'
                      }`}>
                        {product.category}
                      </span>
                      <div className="text-lg font-semibold text-gray-800 mt-2">${product.price}</div>
                      {product.description && (
                        <p className="text-xs text-gray-500 mt-1">{product.description}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Side - Order Summary */}
          <div className="col-span-4">
            <div className={`bg-white rounded-2xl shadow-sm p-6 transition-all duration-300 ${
              cartAnimation ? 'ring-4 ring-green-200 bg-green-50' : ''
            }`}>
              {/* Customer Name Display */}
              <div className="mb-6">
                <div className="flex justify-between items-center">
                  <h3 className="font-medium text-gray-800">
                    {customerInfo.name || "Customer's Name"}
                  </h3>
                  <button 
                    onClick={() => setShowCustomerModal(true)}
                    className="text-blue-500 hover:text-blue-600 p-1"
                  >
                    <PenBoxIcon />
                  </button>
                </div>
                <div className="text-sm text-gray-500 mb-3">Order Number: #{Date.now().toString().slice(-4)}</div>
                
                {/* Customer Info Summary */}
                {customerInfo.name && (
                  <div className="bg-blue-50 rounded-lg p-3 text-sm space-y-1">
                    <div><strong>Phone:</strong> {customerInfo.phone}</div>
                    {customerInfo.email && <div><strong>Email:</strong> {customerInfo.email}</div>}
                    {customerInfo.vehicleNumber && <div><strong>Vehicle #:</strong> {customerInfo.vehicleNumber}</div>}
                    <div><strong>Type:</strong> {customerInfo.vehicleType} • {customerInfo.orderType}</div>
                  </div>
                )}
              </div>

              {/* Cart Items */}
              <div className="mb-6 max-h-64 overflow-y-auto">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-medium">Order Items ({cartItems.length})</h3>
                  <div className={`transition-all duration-300 ${
                    cartAnimation ? 'scale-125 text-green-600' : ''
                  }`}>
                    🛒
                  </div>
                </div>
                {cartItems.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    <div className="text-3xl mb-3">
                      <div className={`transition-all duration-300 ${scannerActive ? 'animate-pulse text-blue-500' : ''}`}>
                        {scannerActive ? '📡' : '🛒'}
                      </div>
                    </div>
                    <p className="text-sm">
                      {scannerActive ? 'Scanning item...' : 'Scan barcode or click products to add to cart'}
                    </p>
                    {scannerActive && (
                      <div className="mt-2">
                        <div className="inline-block w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="space-y-3">
                    {cartItems.map((item, index) => (
                      <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-xl">
                        <span className="text-xl">{item.image}</span>
                        <div className="flex-1">
                          <h4 className="font-medium text-sm">{item.name}</h4>
                          <span className="text-xs text-gray-500">${item.price}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <button 
                            onClick={() => updateCartItemQuantity(item.id, -1)}
                            className="w-6 h-6 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center text-sm"
                          >
                            −
                          </button>
                          <span className="text-sm w-6 text-center">{item.qty}</span>
                          <button 
                            onClick={() => updateCartItemQuantity(item.id, 1)}
                            className="w-6 h-6 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center text-sm"
                          >
                            +
                          </button>
                          <button 
                            onClick={() => removeFromCart(item.id)}
                            className="text-red-500 hover:text-red-700 text-xs ml-2"
                          >
                            ×
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Summary */}
              <div className="border-t pt-4">
                <div className="flex justify-between mb-2 text-sm">
                  <span className="text-gray-600">Subtotal</span>
                  <span>$ {getTotal().toFixed(2)}</span>
                </div>
                <div className="flex justify-between mb-2 text-sm">
                  <span className="text-gray-600">Tax (8%)</span>
                  <span>$ {getTax().toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-lg font-semibold mb-4">
                  <span>TOTAL</span>
                  <span>$ {getFinalTotal().toFixed(2)}</span>
                </div>

                <button
                  onClick={handlePayment}
                  disabled={cartItems.length === 0}
                  className="w-full bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white py-4 rounded-2xl font-medium transition-all"
                >
                  Proceed to Payment
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Customer Details Modal */}
      {showCustomerModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-8 max-w-lg w-full mx-4 shadow-2xl">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-semibold mb-2">Customer Information</h2>
              <p className="text-gray-600">Please provide customer details for the order</p>
            </div>

            <div className="space-y-6">
              {/* Name - Required */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={customerInfo.name}
                  onChange={(e) => setCustomerInfo({...customerInfo, name: e.target.value})}
                  placeholder="Enter customer's full name"
                />
              </div>

              {/* Phone - Required */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={customerInfo.phone}
                  onChange={(e) => setCustomerInfo({...customerInfo, phone: e.target.value})}
                  placeholder="+1 (555) 123-4567"
                />
              </div>

              {/* Email - Optional */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                  <span className="text-xs text-gray-500 ml-2">(optional)</span>
                </label>
                <input
                  type="email"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={customerInfo.email}
                  onChange={(e) => setCustomerInfo({...customerInfo, email: e.target.value})}
                  placeholder="customer@example.com"
                />
              </div>

              {/* Vehicle Number */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Vehicle Number
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={customerInfo.vehicleNumber}
                  onChange={(e) => setCustomerInfo({...customerInfo, vehicleNumber: e.target.value.toUpperCase()})}
                  placeholder="e.g., ABC-123, XYZ-456"
                />
              </div>

              {/* Vehicle Type and Order Type */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Vehicle Type</label>
                  <select 
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={customerInfo.vehicleType}
                    onChange={(e) => setCustomerInfo({...customerInfo, vehicleType: e.target.value})}
                  >
                    <option value="Car">🚗 Car</option>
                    <option value="Motorcycle">🏍️ Motorcycle</option>
                    <option value="Truck">🚛 Truck</option>
                    <option value="Bus">🚌 Bus</option>
                    <option value="Van">🚐 Van</option>
                    <option value="Other">🚙 Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Order Type</label>
                  <select 
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={customerInfo.orderType}
                    onChange={(e) => setCustomerInfo({...customerInfo, orderType: e.target.value})}
                  >
                    <option value="Walk In">🚶 Walk In</option>
                    <option value="Appointment">📅 Appointment</option>
                    <option value="Express">⚡ Express</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-4 mt-8">
              <button
                onClick={() => setShowCustomerModal(false)}
                className="flex-1 px-6 py-3 border border-gray-200 rounded-xl hover:bg-gray-50 transition-all"
              >
                Cancel
              </button>
              <button
                onClick={proceedToPayment}
                className="flex-1 px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-xl transition-all font-medium"
              >
                Continue to Payment
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Payment Method Modal */}
      {showPaymentModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-8 max-w-md w-full mx-4">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-semibold mb-2">Choose Payment Method</h2>
              <p className="text-gray-600">Total: ${getFinalTotal().toFixed(2)}</p>
            </div>

            <div className="space-y-4 mb-6">
              {paymentMethods.map(method => (
                <div
                  key={method.id}
                  className={`py-2 px-4 border rounded-lg cursor-pointer transition-all ${
                    selectedPaymentMethod === method.id
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => setSelectedPaymentMethod(method.id)}
                >
                  <div className="flex items-center space-x-4">
                    <span className="text-2xl">{method.icon}</span>
                    <div className="flex-1">
                      <h3 className="font-semibold">{method.name}</h3>
                      <p className="text-sm text-gray-600">{method.description}</p>
                    </div>
                    <div className={`w-6 h-6 rounded-full border-2 ${
                      selectedPaymentMethod === method.id
                        ? 'border-blue-500 bg-blue-500'
                        : 'border-gray-300'
                    }`}>
                      {selectedPaymentMethod === method.id && (
                        <div className="w-full h-full flex items-center justify-center">
                          <div className="w-2 h-2 bg-white rounded-full"></div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex space-x-4">
              <button
                onClick={() => setShowPaymentModal(false)}
                className="flex-1 px-6 py-3 border border-gray-200 rounded-xl hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={processPayment}
                disabled={!selectedPaymentMethod}
                className="flex-1 px-6 py-3 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 text-white rounded-xl"
              >
                Process Payment
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}