import React, { useContext, useState } from 'react'
import logo from '../assets/logo_niya1.png'
import { Link } from 'react-router-dom'
import { IoEyeSharp, IoEyeOffSharp } from 'react-icons/io5'; // Import the icons
import { useForm } from 'react-hook-form';
import summaryApi from '../common';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import Context from '../context';

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const {register, getValues, control, handleSubmit, formState: {errors}, reset} = useForm();
    const navigate = useNavigate();
    const {fetchUserDetails, getProductCount} = useContext(Context)

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };
    const onFormSubmit = async(data) => {
        try {
            const res = await fetch(summaryApi.login.url, {
                method: summaryApi.login.method,
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
    
            const responseData = await res.json();
    
            if (responseData.success) {
                toast.success(responseData.message); 
                navigate('/')
                fetchUserDetails()
                getProductCount()            
            } 
            else {
                toast.error(responseData.message);
            }
            
        } 
       
        catch (error) {
            
            toast.error('An error occurred while submitting the form.');
        }
    }
    return (
        <section id='login' >
            <section class="bg-gray-100 min-h-screen flex box-border justify-center items-center">
                <div class="bg-[#dfa674] rounded-2xl flex max-w-3xl p-5 items-center" style={{ backgroundColor: 'rgb(239, 224, 226)' }}>
                    <div class="md:w-1/2 px-8">
                        <h2 class="font-bold text-3xl text-[#002D74]">Login</h2>
                        <p class="text-sm mt-4 text-[#002D74]">If you already a member, easily log in now.</p>

                        <form action="" class="flex flex-col gap-4" onSubmit={handleSubmit(onFormSubmit)}>
                            <input class="p-2 mt-8 rounded-xl border" type="email" name="email" placeholder="Email" {...register('email')} />
                            <div className="relative flex">
                                <input
                                    className="p-2 pr-10 rounded-xl border w-full"
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    id="password"
                                    placeholder="Password"
                                    {...register('password')}
                                />
                                <button
                                    type="button"
                                    onClick={togglePasswordVisibility}
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center focus:outline-none"
                                >
                                    {showPassword ? <IoEyeOffSharp /> : <IoEyeSharp />}
                                </button>
                            </div>
                            <button class="bg-[#002D74] text-white py-2 rounded-xl hover:scale-105 duration-300 hover:bg-[#206ab1] font-medium" type="submit" style={{backgroundColor:'rgb(56, 45, 94)'}}>Login</button>
                        </form>
                        <div class="relative">
                            <div class="absolute inset-0 flex items-center">
                                <div class="w-full border-t border-gray-300" style={{ border: '1px solid #002D74'}}></div>
                            </div>
                            <div class="relative flex justify-center text-sm mt-4">
                                <span class="px-2" style={{ backgroundColor: 'rgb(239, 224, 226)', color: 'rgb(56, 45, 94)', fontWeight:500 }}>
                                    OR
                                </span>
                            </div>
                        </div>
                        <button class="bg-white border py-2 w-full rounded-xl mt-5 flex justify-center items-center text-sm hover:scale-105 duration-300 hover:bg-[#60a8bc4f] font-medium" style={{color:'rgb(56, 45, 94)'}}>
                        <svg class="mr-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="25px">
                        <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path>
                        <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path>
                        <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path>
                        <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path>
                    </svg>
                            Login with Google
                        </button>
                        <Link to={'/forgot-password'}>
                        <div class="mt-10 text-sm border-b border-gray-500 py-5 playfair tooltip font-semibold" style={{color:'rgb(56, 45, 94)'}}>Forget password?</div>
                        </Link>
                        <div class="mt-4 text-sm flex justify-between items-center container-mr">
                            <p class="mr-3 md:mr-0 " style={{color:'rgb(56, 45, 94)'}}>Don't have an account?</p>
                            <Link to={'/register'}>
                            <button class="hover:border register text-white bg-[#002D74] hover:border-gray-400 rounded-xl py-2 px-5 hover:scale-110 hover:bg-[#002c7424] font-semibold duration-300" style={{backgroundColor:'rgb(56, 45, 94)'}}>Register</button>
                            </Link></div>
                    </div>
                    <div class="md:block hidden w-1/2">
                        <img class="rounded-2xl max-h-[1600px]" src={logo} alt='login' />
                    </div>
                </div>
            </section>
            
        </section>


    )
}

export default Login