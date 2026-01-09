import React from 'react'
import Carts from '../components/sections/CartArea';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { useCart } from '@/lib/cart';

export const Cart = () => {
  const location = useLocation();
  const { addItem } = useCart();

  useEffect(() => {
    const p = (location.state as any)?.product;
    if (p) {
      // Add full product data to cart when navigating with state
      try {
        addItem({
          id: p.id,
          name: p.name,
          price: p.price,
          image: p.image,
          color: p.color ?? 'White',
          size: p.size ?? 'L',
          course: p.course ?? 'BSIT',
          qty: p.qty ?? 1,
        });
      } catch (e) {
        // ignore
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.state]);

  return (
    <div>
      <Carts />
    </div>
  )
}

export default Cart
