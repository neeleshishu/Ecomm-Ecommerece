import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, increaseQuantity, decreaseQuantity } from '../store/actions';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from './CheckoutForm';

const stripePromise = loadStripe('pk_test_51NuBmuSD3Qin8XIJW3jgToCDTOS4Ilvjm8XPfBUbdczZVav5XyZNLDH1OEdbwcuIiPWwf5AYNPEWfsfZF4ED3jsa0078DeeYqa');

const ShoppingCart = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  const handleRemoveFromCart = (productId) => {
    dispatch(removeFromCart(productId));
  };

  const handleIncreaseQuantity = (productId) => {
    dispatch(increaseQuantity(productId));
  };

  const handleDecreaseQuantity = (productId) => {
    dispatch(decreaseQuantity(productId));
  };

  const total = cartItems.reduce((acc, product) => acc + product.price * product.quantity, 0);
  
  const [isCheckoutVisible, setIsCheckoutVisible] = useState(false);

  const handleCheckoutClick = () => {
    setIsCheckoutVisible(true);
  };

  return (
    <div>
      <h2 className=' text-2xl m-10'>Cart</h2>
      <div className='shopping_cart gap-5'>
        <hr />
        {cartItems && cartItems.length > 0 ? (
          cartItems.map((product) => (
            <div key={product.id} className='cart_product gap-5'>
              <div className='cart_image'>
                <img src={product.images[0]} alt=''/>
              </div>
              <div>
                <p className=' text-slate-500'>{product.category.name}</p>
                <h1 className=' text-xl'>{product.title}</h1>
              </div>
              <div>
                <h1 className=' text-xl'>$ {product.price}</h1>
              </div>
              <div>
                <button
                  className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition duration-300"
                  onClick={() => handleIncreaseQuantity(product.id)}
                >
                  +
                </button>
                <span className="mx-2">{product.quantity}</span>
                <button
                  className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition duration-300"
                  onClick={() => handleDecreaseQuantity(product.id)}
                >
                  -
                </button>
              </div>
              <div>
                <button
                  className="bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition duration-300"
                  onClick={() => handleRemoveFromCart(product.id)}
                >
                  Remove
                </button>
              </div>
              
              <hr/>
            </div>
          ))
        ) : (
          <p className='text-xl text-cyan-500 m-6'>Your cart is empty.</p>
        )}
      </div>

      {cartItems.length > 0 && (
        <div className='text-center m-10'>
          <p className='text-lg font-semibold'>Total Price: ${total.toFixed(2)}</p>
          <button
            onClick={handleCheckoutClick}
            className='bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300'
          >
            Checkout
          </button>
        </div>
      )}

      {isCheckoutVisible && (
        <div className='m-4'>
          <Elements stripe={stripePromise}>
            <CheckoutForm total={total} />
          </Elements>
        </div>
      )}
    </div>
  );
};

export default ShoppingCart;
