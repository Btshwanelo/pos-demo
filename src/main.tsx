import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { Provider } from 'react-redux';
import store, { persistor } from './store/index.ts';
import { PersistGate } from 'redux-persist/integration/react';
import { ToastContainer } from 'react-toastify';
import { Toaster } from '@/components/ui/sonner';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter } from 'react-router-dom';

createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      {/* <StrictMode> */}
      <ToastContainer />
      <Toaster />
        <App />
      {/* </StrictMode> */}
    </PersistGate>
  </Provider>
);
