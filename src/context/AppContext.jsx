import { createContext, useContext, useReducer } from 'react';

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