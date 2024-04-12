import React, {useState, useEffect} from 'react';
import {loadStripe} from '@stripe/stripe-js';
import {Elements} from '@stripe/react-stripe-js';
import {useSelector} from 'react-redux';

import CheckoutForm from '../features/stripe/CheckoutForm';
import '../css/stripe.css';
import {selectCurrentOrder} from '../features/order/orderSlice';

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is your test publishable API key.
const stripePromise = loadStripe(
  'pk_test_51P4QJASCTvkzcyZhbUbDmWyysiACHt5qWSkkQjFm9flXimos19sXYXZgXusBxYKtGrtZiOjsxqyi6N1Fpl0Jh7oN00FcaXD6v1'
);

export default function CardPaymentPage() {
  const [clientSecret, setClientSecret] = useState('');
  const currentOrder = useSelector(selectCurrentOrder);
  console.log(currentOrder.totalAmount);

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    fetch('http://localhost:8080/create-payment-intent', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({totalAmount: currentOrder.totalAmount}),
      meta: {
        order_id: currentOrder.id,
      },
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, [currentOrder]);

  const appearance = {
    theme: 'stripe',
  };
  const options = {
    clientSecret,
    appearance,
  };

  return (
    <div className="Stripe">
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      )}
    </div>
  );
}
