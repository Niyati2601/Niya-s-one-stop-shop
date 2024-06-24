import React from 'react';
import summaryApi from '../common';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

const ForgotPassword = () => {
  const { register, handleSubmit, reset } = useForm();

  const onFormSubmit = async (data) => {
      const res = await fetch(summaryApi.forgotPassword.url, {
        method: summaryApi.forgotPassword.method,
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: data.email })
      });
      const result = await res.json();

      if (result.success) {
        toast.success(result.message)
        reset();
      } else {
        toast.error(result.message)
  }
}

  return (
    <section id='forgot-password'>
      <section className="bg-gray-100 min-h-screen flex justify-center items-center">
        <div className="bg-[#dfa674] rounded-2xl flex max-w-3xl p-5 items-center" style={{ backgroundColor: 'rgb(239, 224, 226)' }}>
          <div className="md:w-1/2 px-8 lg:w-full">
            <h2 className="font-bold text-2xl text-[rgb(56,45,94)] mt-3">Forgot Password</h2>
            <form className="flex flex-col mt-6" onSubmit={handleSubmit(onFormSubmit)}>
              <div className="relative flex flex-col w-full gap-2">
                <input
                  className="p-2 rounded-md border w-full form-control"
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Enter your email"
                  {...register('email', { required: true })}
                />
              </div>
              <button className="bg-[rgb(56,45,94)] text-white py-2 rounded-md hover:scale-105 duration-300 hover:bg-[#002D74] font-medium mt-6" type="submit">Send</button>
            </form>
          </div>
        </div>
      </section>
    </section>
  );
};

export default ForgotPassword;
