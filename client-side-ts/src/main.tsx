import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router';
import './index.css';
import router from './router';
import { CartProvider } from '@/lib/cart';
import { TransactionsProvider } from '@/lib/transactions';
import { Toaster } from '@/components/ui/sonner';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <TransactionsProvider>
      <CartProvider>
        <RouterProvider router={router} />
        <Toaster />
      </CartProvider>
    </TransactionsProvider>
  </StrictMode>
);
