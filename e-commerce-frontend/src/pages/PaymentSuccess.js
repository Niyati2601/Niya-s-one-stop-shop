import React, { useEffect } from 'react';
import summaryApi from '../common';
import { toast } from 'react-toastify';
import { IoCheckmarkDoneCircle } from "react-icons/io5";
import { IoChevronBackCircle } from "react-icons/io5";
import { Link } from 'react-router-dom';


const PaymentSuccess = () => {
    useEffect(() => {
        clearCartOnSuccess();
    }, []);

    const clearCartOnSuccess = async () => {
        try {
            const res = await fetch(summaryApi.clearCart.url, {
                method: summaryApi.clearCart.method,
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            const responseData = await res.json();
            if (responseData.success) {
                toast.success(responseData.message);
            } else {
                toast.error(responseData.message);
            }
        } catch (error) {
            console.error('Error clearing cart:', error);
        }
    };

    return (
        <section id='payment-success'>
        <section className="bg-gray-100 min-h-screen flex justify-center items-center">
            <div className="bg-white rounded-2xl flex flex-col max-w-3xl p-5 items-center text-center shadow-lg" style={{ backgroundColor: 'rgb(239, 224, 226)' }}>
                <IoCheckmarkDoneCircle className='text-9xl text-[rgb(56,45,94)] mt-3' />
                <h2 className="font-bold text-2xl text-[rgb(56,45,94)] mt-3">Payment Successful</h2>
                <p className="font-medium text-lg text-[rgb(56,45,94)] mt-3">Thank you for your payment. You will be redirected to your account shortly.</p>
                <Link to="/" className="mt-5">
                    <button className="flex items-center justify-center gap-2 text-white bg-[rgb(56,45,94)] hover:bg-[rgb(48,38,79)] rounded-md py-2 px-5 hover:scale-110 font-semibold duration-300">
                        <IoChevronBackCircle />Continue Shopping
                    </button>
                </Link>
            </div>
        </section>
    </section>
    );
};

export default PaymentSuccess;
