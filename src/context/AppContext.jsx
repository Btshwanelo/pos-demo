import { createContext, useContext, useReducer } from 'react';

const AppContext = createContext();

const initialState = {
  user: null,
  products: [
    // Standard Number Plates
    { 
      id: 1, 
      barcode: 'SNP001', 
      name: 'Standard Number Plate', 
      price: 25.00, 
      category: 'Standard Plates', 
      status: 'available', 
      image: '🏷️',
      description: 'Standard vehicle registration plate'
    },
    { 
      id: 2, 
      barcode: 'PNP002', 
      name: 'Personalized Number Plate', 
      price: 85.00, 
      category: 'Personalized Plates', 
      status: 'available', 
      image: '⭐',
      description: 'Custom personalized number plate'
    },
    { 
      id: 3, 
      barcode: 'CNP003', 
      name: 'Commercial Vehicle Plate', 
      price: 35.00, 
      category: 'Commercial Plates', 
      status: 'available', 
      image: '🚛',
      description: 'Commercial vehicle registration plate'
    },
    { 
      id: 4, 
      barcode: 'MNP004', 
      name: 'Motorcycle Number Plate', 
      price: 20.00, 
      category: 'Motorcycle Plates', 
      status: 'available', 
      image: '🏍️',
      description: 'Motorcycle registration plate'
    },
    { 
      id: 5, 
      barcode: 'TNP005', 
      name: 'Temporary Number Plate', 
      price: 15.00, 
      category: 'Temporary Plates', 
      status: 'available', 
      image: '📝',
      description: 'Temporary registration plate'
    },
    { 
      id: 6, 
      barcode: 'RNP006', 
      name: 'Replacement Number Plate', 
      price: 30.00, 
      category: 'Replacement Plates', 
      status: 'available', 
      image: '🔄',
      description: 'Replacement for damaged/lost plates'
    },
    
    // Services
    { 
      id: 7, 
      barcode: 'SRV001', 
      name: 'Express Registration', 
      price: 50.00, 
      category: 'Services', 
      status: 'available', 
      image: '⚡',
      description: 'Express vehicle registration service'
    },
    { 
      id: 8, 
      barcode: 'SRV002', 
      name: 'Vehicle Inspection', 
      price: 75.00, 
      category: 'Services', 
      status: 'available', 
      image: '🔍',
      description: 'Complete vehicle inspection service'
    },
    { 
      id: 9, 
      barcode: 'SRV003', 
      name: 'Documentation Processing', 
      price: 25.00, 
      category: 'Services', 
      status: 'available', 
      image: '📄',
      description: 'Document processing and verification'
    },
    { 
      id: 10, 
      barcode: 'SRV004', 
      name: 'Title Transfer', 
      price: 40.00, 
      category: 'Services', 
      status: 'available', 
      image: '📋',
      description: 'Vehicle title transfer service'
    },
    { 
      id: 11, 
      barcode: 'SRV005', 
      name: 'Registration Renewal', 
      price: 35.00, 
      category: 'Services', 
      status: 'available', 
      image: '🔄',
      description: 'Vehicle registration renewal'
    },
    { 
      id: 12, 
      barcode: 'SRV006', 
      name: 'Duplicate Documents', 
      price: 20.00, 
      category: 'Services', 
      status: 'available', 
      image: '📑',
      description: 'Issue duplicate registration documents'
    },
    
    // Accessories & Add-ons
    { 
      id: 13, 
      barcode: 'ACC001', 
      name: 'Number Plate Frame', 
      price: 12.00, 
      category: 'Accessories', 
      status: 'available', 
      image: '🖼️',
      description: 'Decorative number plate frame'
    },
    { 
      id: 14, 
      barcode: 'ACC002', 
      name: 'Security Screws', 
      price: 8.00, 
      category: 'Accessories', 
      status: 'available', 
      image: '🔩',
      description: 'Anti-theft security screws for plates'
    },
    { 
      id: 15, 
      barcode: 'ACC003', 
      name: 'Reflective Coating', 
      price: 15.00, 
      category: 'Accessories', 
      status: 'available', 
      image: '✨',
      description: 'High-visibility reflective coating'
    },
    { 
      id: 16, 
      barcode: 'FEE001', 
      name: 'Processing Fee', 
      price: 10.00, 
      category: 'Fees', 
      status: 'available', 
      image: '💰',
      description: 'Government processing fee'
    }
  ],
  sales: [
    { 
      id: 1, 
      customerName: 'John Smith', 
      customerPhone: '+1234567890', 
      items: [
        { id: 1, name: 'Standard Number Plate', price: 25.00, qty: 1 },
        { id: 7, name: 'Express Registration', price: 50.00, qty: 1 }
      ], 
      total: 75.00, 
      paymentMethod: 'Card', 
      date: '2024-07-22T10:30:00Z', 
      cashier: 'admin' 
    },
    { 
      id: 2, 
      customerName: 'Maria Rodriguez', 
      customerPhone: '+0987654321', 
      items: [
        { id: 2, name: 'Personalized Number Plate', price: 85.00, qty: 1 },
        { id: 13, name: 'Number Plate Frame', price: 12.00, qty: 2 }
      ], 
      total: 109.00, 
      paymentMethod: 'Cash', 
      date: '2024-07-22T11:15:00Z', 
      cashier: 'admin' 
    }
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

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(appReducer, initialState);
  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
}