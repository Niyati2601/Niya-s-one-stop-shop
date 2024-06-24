import React from 'react'
import { GiCancel } from "react-icons/gi";
import { IoChevronBackCircle } from 'react-icons/io5';
import { Link } from 'react-router-dom';

const PaymentRejected = () => {
  return (
    <section id='payment-success'>
            <section className="bg-gray-100 min-h-screen flex justify-center items-center">
                <div className="bg-white rounded-2xl flex flex-col max-w-3xl p-5 items-center text-center shadow-lg" style={{ backgroundColor: 'rgb(239, 224, 226)' }}>
                    <GiCancel className='text-9xl text-[rgb(56,45,94)] mt-3' />
                    <h2 className="font-bold text-2xl text-[rgb(56,45,94)] mt-3">Payment Rejected</h2>
                    <p className="font-medium text-lg text-[rgb(56,45,94)] mt-3">Try again after some time!! You will be redirected to your account shortly.</p>
                    <Link to="/cart" className="mt-5">
                        <button className="flex items-center justify-center gap-2 text-white bg-[rgb(56,45,94)] hover:bg-[rgb(48,38,79)] rounded-md py-2 px-5 hover:scale-110 font-semibold duration-300">
                            <IoChevronBackCircle />Go to cart
                        </button>
                    </Link>
                </div>
            </section>
        </section>
  )
}

export default PaymentRejected