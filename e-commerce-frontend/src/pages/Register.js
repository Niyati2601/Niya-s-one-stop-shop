import React, { useState } from 'react';
import logo from '../assets/logo_niya1.png';
import { Link, useNavigate } from 'react-router-dom';
import { IoEyeSharp, IoEyeOffSharp } from 'react-icons/io5'; // Import the icons
import { FaCircleUser } from "react-icons/fa6";
import dummyUser from '../assets/dummy-user.png'
import { useForm } from 'react-hook-form';  
import summaryApi from '../common';
import imageTobase64 from '../helpers/imageToBase64';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Register = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [photo, setPhoto] = useState('');
    
    const navigate = useNavigate();
    
    const {register, getValues, control, handleSubmit, formState: {errors}, reset} = useForm();
    

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handlePhotoUpload = async(e) => {
        const file = e.target.files[0];
        const imagePic = await imageTobase64(file)
        
        setPhoto((prev)=>{
            return{
              ...prev,
              image : imagePic
              
            }
          })
          
        
    };
    const onFormSubmit = async (data) => {
        try {
            data.image = photo?.image
            
            const res = await fetch(summaryApi.register.url, {
                method: summaryApi.register.method,
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
    
            const responseData = await res.json();
    
            if (responseData.success) {
                toast.success(responseData.message);
                reset();
                navigate('/login');  
            } 
            else {
                toast.error(responseData.message);
            }
        } catch (error) {
            
            toast.error('An error occurred while submitting the form.');
        }
    };
    


    return (
        <section id='register'>
            <section className="bg-gray-100 min-h-screen flex box-border justify-center items-center">
                <div className="bg-[#dfa674] rounded-2xl flex max-w-3xl p-5 items-center" style={{ backgroundColor: 'rgb(239, 224, 226)' }}>
                    <div className="md:w-1/2 px-8">
                        <h2 className="font-bold text-3xl text-[#002D74]">Register</h2>
                        <p className="text-sm mt-4 text-[#002D74]">Welcome to One, stop shop!</p>

                        <form action="" className="flex flex-col gap-4" onSubmit={handleSubmit(onFormSubmit)}>
                            <div className='w-20 h-20 mx-auto relative overflow-hidden rounded-full'>
                                <div>
                                    <img src={photo.image || dummyUser} alt='login icons'  />
                                </div>
                                <form>
                                    <label>
                                        <div className='text-xs bg-opacity-80 bg-slate-200 pb-4 pt-2 cursor-pointer text-center absolute bottom-0 w-full'>
                                            Upload  Photo
                                        </div>
                                        <input type='file' className='hidden' onChange={handlePhotoUpload}/>
                                    </label>
                                </form>
                            </div>
                            <input className="p-2 mt-8 rounded-xl border" type="text" name="name" placeholder="Name" {...register("name", {required: true})} />
                            <input className="p-2 rounded-xl border" type="email" name="email" placeholder="Email" {...register("email",{required:true})} />
                            <input className="p-2 rounded-xl border" type="number" name="phone" placeholder="Phone" {...register("phone",{required:true})} />

                            <div className="relative flex">
                                <input
                                    className="p-2 pr-10 rounded-xl border w-full"
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    id="password"
                                    placeholder="Password"
                                    {...register("password", { required: true })}
                                />
                                <button
                                    type="button"
                                    onClick={togglePasswordVisibility}
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center focus:outline-none"
                                >
                                    {showPassword ? <IoEyeOffSharp /> : <IoEyeSharp />}
                                </button>
                            </div>
                            <button className="bg-[#002D74] text-white py-2 rounded-xl hover:scale-105 duration-300 hover:bg-[#206ab1] font-medium" type="submit" style={{ backgroundColor: 'rgb(56, 45, 94)' }}>Register</button>
                        </form>

                        <div className="mt-4 text-sm flex justify-between items-center container-mr">
                            <p className="mr-3 md:mr-0 " style={{ color: 'rgb(56, 45, 94)' }}>Already have an account?</p>
                            <Link to={'/login'}>
                                <button className="hover:border register text-white bg-[#002D74] hover:border-gray-400 rounded-xl py-2 px-5 hover:scale-110 hover:bg-[#002c7424] font-semibold duration-300" style={{ backgroundColor: 'rgb(56, 45, 94)' }}>Login</button>
                            </Link>
                        </div>
                    </div>
                    <div className="md:block hidden w-1/2">
                        <img className="rounded-2xl max-h-[1600px]" src={logo} alt='login' />
                    </div>
                </div>
            </section>
             
        </section>
    );
}

export default Register;
