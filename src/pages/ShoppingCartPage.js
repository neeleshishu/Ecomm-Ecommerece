// Shopping cart page

import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart } from '../store/actions';
import ShoppingCart from '../components/ShoppingCart';

const ShoppingCartPage = () => {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const handleRemoveFromCart = (productId) => {
    dispatch(removeFromCart(productId));
  };

  return (
    <div>
      <h1>Shopping Cart Page</h1>
      <ShoppingCart cart={cart} removeFromCart={handleRemoveFromCart} />
    </div>
  );
};

export default ShoppingCartPage;
