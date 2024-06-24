import React from 'react';
import { loadStripe } from '@stripe/stripe-js';
import summaryApi from '../common';

const stripePromise = loadStripe(process.env.STRIPE_PUBLISHABLE_KEY);

const CheckoutProduct = ({ userId }) => {
    const handleCheckout = async () => {
        const stripe = await stripePromise;

        const res = await fetch(summaryApi.createCheckoutSession.url, {
            method: summaryApi.createCheckoutSession.method,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ userId }) // Send the userId
        });

        const session = await res.json();

        if (session.url) {
            window.location.href = session.url;
        } else {
            console.error('Checkout session creation failed');
        }
    };

    return (
        <div className='mt-10 p-5'>
        <button onClick={handleCheckout}>
            Checkout
        </button>
        </div>
    );
};

export default CheckoutProduct;
