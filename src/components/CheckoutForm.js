import React from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

const CheckoutForm = ({ total }) => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    // Create a payment method using the card element
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement),
    });

    if (error) {
      console.error(error);
    } else {
      // Handle successful payment here
      console.log('Payment succeeded:', paymentMethod);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className='mb-4'>
        <label htmlFor='card-element' className='block text-lg font-semibold'>
          Card Details
        </label>
        <CardElement
          id='card-element'
          options={{
            style: {
              base: {
                fontSize: '16px',
                color: '#424770',
                '::placeholder': {
                  color: '#aab7c4',
                },
              },
              invalid: {
                color: '#9e2146',
              },
            },
          }}
        />
      </div>

      <button
        type='submit'
        className='bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300'
      >
        Pay ${total.toFixed(2)}
      </button>
    </form>
  );
};

export default CheckoutForm;
