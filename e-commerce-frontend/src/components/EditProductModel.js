// import React, { useState, useEffect } from 'react';
// import { useForm } from 'react-hook-form';
// import { Form } from 'react-router-dom';
// import productCategory from '../helpers/productCategory';
// import { toast } from 'react-toastify';
// import summaryApi from '../common';
// import { MdCloudUpload } from "react-icons/md";
// import uploadImage from '../helpers/uploadImage';
// import DisplayImage from './DisplayImage';
// import { IoCloseCircle } from "react-icons/io5";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
// import Slider from "react-slick";


// const EditProductModel = ({ initialData, onClose }) => {
//     
//     const [itemImage, setItemImage] = useState(initialData.productImage || []);
//     
//     const [fullScreenImage, setFullScreenImage] = useState("");
//     const [OpenFullScreenImage, setOpenFullScreenImage] = useState(false);

//     const { register, handleSubmit, formState: { errors }, reset } = useForm();

//     useEffect(() => {
//         if (initialData) {
//             reset(initialData);
//         }
//     }, [initialData, reset]);

//     const onFormSubmit = async (data) => {
//         data.productImage = itemImage

//         try {
//             const res = await fetch(summaryApi.updateProduct.url, {
//                 method: summaryApi.updateProduct.method,
//                 credentials: 'include',
//                 headers: {
//                     'Content-Type': 'application/json'
//                 },
//                 body: JSON.stringify(data)
//             });
//             const responseData = await res.json();
//             if (responseData.success) {
//                 toast.success(responseData.message);
//                 reset();
//                 onClose();
//             } else {
//                 toast.error(responseData.message);
//             }
//         } catch (error) {
//             toast.error('An error occurred while submitting the form.');
//         }
//     };

//     const handleUploadProduct = async (e) => {
//         const file = e.target?.files?.[0];

//         if (!file) {
//             toast.error('No file selected.');
//             return;
//         }

//         try {
//             const uploadImageCloudinary = await uploadImage(file);
//             setItemImage((prev) => [...prev, uploadImageCloudinary]);
//         } catch (error) {
//             toast.error('Error uploading image.');
//         }
//     };

//     const handleDeleteProductImage = (index) => {
//         const newProductImage = itemImage.filter((_, i) => i !== index);
//         setItemImage(newProductImage);
//     };

//     const sliderSettings = {
//         dots: true,
//         infinite: false,
//         speed: 500,
//         slidesToShow: 1,
//         slidesToScroll: 1
//     };
//     return (
//         <div className="fixed inset-0 flex items-center justify-center z-50 w-100">
//             <div className="fixed inset-0 bg-black opacity-50" onClick={onClose}></div>
//             <div className="bg-white rounded-lg shadow-lg w-96 p-4 z-10" style={{ backgroundColor: 'rgb(239, 224, 226)' }}>
//                 <div className="flex items-center justify-between">
//                     <div className="flex flex-col items-start">
//                         <h4 className="mb-1 text-2xl font-bold" style={{ color: 'rgb(56, 45, 94)' }}>Edit Product Details</h4>
//                     </div>
//                     <svg
//                         xmlns="http://www.w3.org/2000/svg"
//                         viewBox="0 0 24 24"
//                         fill="currentColor"
//                         className="mr-3 h-5 w-5 cursor-pointer"
//                         onClick={onClose}
//                     >
//                         <path
//                             fillRule="evenodd"
//                             d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
//                             clipRule="evenodd"
//                         />
//                     </svg>
//                 </div>
//                 <hr />
//                 <div className="mt-4">
//                     <div className="grid gap-6">
//                         <Form onSubmit={handleSubmit(onFormSubmit)}>
//                             <div className="col">
//                                 <label htmlFor='productName'>Product Name:</label>
//                                 <input className="p-2 rounded-xl border w-full" type="text" name="productName" id="productName" placeholder="Enter Product Name" {...register("productName", { required: true })} />
//                                 {errors.productName && <span className="text-red-600 text-sm">This field is required</span>}

//                                 <label className='mt-8' htmlFor='brandName'>Brand Name:</label>
//                                 <input className="p-2 rounded-xl border w-full" type="text" name="brandName" id="brandName" placeholder="Enter Brand Name" {...register("brandName", { required: true })} />
//                                 {errors.brandName && <span className="text-red-600 text-sm">This field is required</span>}

//                                 <label className='mt-8' htmlFor='category'>Category</label>
//                                 <select className="p-2 rounded-xl border w-full" type="text" name="category" id="category" placeholder="Enter Category" {...register("category", { required: true })}>
//                                     <option value="">Select Category</option>
//                                     {Object.values(productCategory).map((el, index) => (
//                                         <option value={el.value} key={el.value + index}>{el.label}</option>
//                                     ))}
//                                 </select>
//                                 {errors.category && <span className="text-red-600 text-sm">This field is required</span>}

//                                 <label className='mt-8' htmlFor='productImage'>Product Image</label>
//                                 <label htmlFor='productImageInput'>
//                                     <div className='p-2 flex items-center justify-center w-full border rounded-md shadow-lg' style={{ backgroundColor: 'rgb(56, 45, 94)', opacity: '80%' }}>
//                                         <div className='flex items-center flex-col gap-2'>
//                                             <span className='text-5xl' style={{ color: 'rgb(239, 224, 226)' }}><MdCloudUpload /></span>
//                                             <p className='text-sm' style={{ color: 'rgb(239, 224, 226)' }}>Upload Product</p>
//                                             <input className="hidden" type="file" name="productImage" id="productImageInput" onChange={handleUploadProduct} />
//                                         </div>
//                                     </div>
//                                 </label>
//                                 <div className='mt-3'>
//                                     {itemImage.length > 0 ? (
//                                         <div className='flex items-center gap-2'>
//                                             {itemImage.map((element, index) => {
//                                                 
//                                                 return (
//                                                     <div key={index} className='relative'>
//                                                         <img src={element} alt={`Product ${index}`} className='w-20 h-20 rounded-lg' onClick={() => {
//                                                             setOpenFullScreenImage(true);
//                                                             setFullScreenImage(element.url);
//                                                         }} />
//                                                         <div className='text-[rgb(56, 45, 94)] text-xl absolute top-0 right-0 cursor-pointer' onClick={() => handleDeleteProductImage(index)}>
//                                                             <IoCloseCircle />
//                                                         </div>
//                                                     </div>
//                                                 )
//                                             })}
//                                         </div>
//                                     ) : (
//                                         <p className='text-red-600 text-sm'>Please Upload Product image</p>
//                                     )}
//                                 </div>

//                                 <label className='mt-8' htmlFor='price'>Price</label>
//                                 <input className="p-2 rounded-xl border w-full" type="number" name="price" id="price" placeholder="Enter Price" {...register("price", { required: true })} />
//                                 {errors.price && <span className="text-red-600 text-sm">This field is required</span>}

//                                 <label className='mt-8' htmlFor='sellingPrice'>Selling Price</label>
//                                 <input className="p-2 rounded-xl border w-full" type="number" name="sellingPrice" id="sellingPrice" placeholder="Enter Selling Price" {...register("sellingPrice", { required: true })} />
//                                 {errors.sellingPrice && <span className="text-red-600 text-sm">This field is required</span>}

//                                 <label className='mt-12' htmlFor='description'>Description</label>
//                                 <textarea className="p-2 rounded-xl border w-full resize-y" name="description" id="description" placeholder="Enter Description" {...register("description", { required: true })}></textarea>
//                                 {errors.description && <span className="text-red-600 text-sm">This field is required</span>}
//                             </div>
//                             <div className="mt-6 flex justify-center space-x-2">
//                                 <button
//                                     type="submit"
//                                     className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
//                                     style={{ backgroundColor: 'rgb(56, 45, 94)' }}
//                                 >
//                                     Upload Product
//                                 </button>
//                             </div>
//                         </Form>
//                     </div>
//                 </div>
//             </div>
//             {OpenFullScreenImage && (
//                 <DisplayImage onClose={() => setOpenFullScreenImage(false)} imgUrl={fullScreenImage} />
//             )}
//         </div>
//     );
// };

// export default EditProductModel;

import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Form } from 'react-router-dom';
import productCategory from '../helpers/productCategory';
import { toast } from 'react-toastify';
import summaryApi from '../common';
import { MdCloudUpload } from "react-icons/md";
import uploadImage from '../helpers/uploadImage';
import DisplayImage from './DisplayImage';
import { IoCloseCircle } from "react-icons/io5";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const EditProductModel = ({ initialData, onClose }) => {
    
    const [itemImage, setItemImage] = useState(initialData.productImage || []);
    
    const [fullScreenImage, setFullScreenImage] = useState("");
    const [OpenFullScreenImage, setOpenFullScreenImage] = useState(false);

    const { register, handleSubmit, formState: { errors }, reset } = useForm();

    useEffect(() => {
        if (initialData) {
            reset(initialData);
        }
    }, [initialData, reset]);

    const onFormSubmit = async (data) => {
        data.productImage = itemImage.url;

        try {
            const res = await fetch(summaryApi.updateProduct.url, {
                method: summaryApi.updateProduct.method,
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
            const responseData = await res.json();
            if (responseData.success) {
                toast.success(responseData.message);
                reset();
                onClose();
            } else {
                toast.error(responseData.message);
            }
        } catch (error) {
            toast.error('An error occurred while submitting the form.');
        }
    };

    const handleUploadProduct = async (e) => {
        const file = e.target?.files?.[0];

        if (!file) {
            // toast.error('No file selected.');
            return;
        }

        try {
            const uploadResult = await uploadImage(file);
            setItemImage((prev) => [...prev, uploadResult.url]);
        } catch (error) {
            toast.error('Error uploading image.');
        }
    };


    const handleDeleteProductImage = (index) => {
        const newProductImage = itemImage.filter((_, i) => i !== index);
        setItemImage(newProductImage);
    };

    const sliderSettings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 2,
        slidesToScroll: 1,
        arrows: true
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 ">
            <div className="fixed inset-0 bg-black opacity-50" onClick={onClose}></div>
            <div className="bg-white rounded-lg shadow-lg w-96 p-6 z-10 max-h-fit" style={{ backgroundColor: 'rgb(239, 224, 226)' }}>
                <div className="flex items-center justify-between mb-4">
                    <h4 className="text-2xl font-bold" style={{ color: 'rgb(56, 45, 94)' }}>Edit Product Details</h4>
                    <IoCloseCircle
                        className="text-2xl text-gray-700 cursor-pointer"
                        onClick={onClose}
                    />
                </div>
                <hr />
                <Form onSubmit={handleSubmit(onFormSubmit)}>
                    <div className="mt-4">
                        <label htmlFor='productName' className="block text-gray-700">Product Name:</label>
                        <input className="p-2 rounded-xl border w-full mb-2" type="text" name="productName" id="productName" placeholder="Enter Product Name" {...register("productName", { required: true })} />
                        {errors.productName && <span className="text-red-600 text-sm">This field is required</span>}

                        <label htmlFor='brandName' className="block mt-4 text-gray-700">Brand Name:</label>
                        <input className="p-2 rounded-xl border w-full mb-2" type="text" name="brandName" id="brandName" placeholder="Enter Brand Name" {...register("brandName", { required: true })} />
                        {errors.brandName && <span className="text-red-600 text-sm">This field is required</span>}

                        <label htmlFor='category' className="block mt-4 text-gray-700">Category:</label>
                        <select className="p-2 rounded-xl border w-full mb-2" name="category" id="category" {...register("category", { required: true })}>
                            <option value="">Select Category</option>
                            {Object.values(productCategory).map((el, index) => (
                                <option value={el.value} key={el.value + index}>{el.label}</option>
                            ))}
                        </select>
                        {errors.category && <span className="text-red-600 text-sm">This field is required</span>}

                        <label htmlFor='productImage' className="block mt-4 text-gray-700">Product Image:</label>
                        <label htmlFor='productImageInput'>
                            <div className='p-2 flex items-center justify-center w-full border rounded-md shadow-lg mb-2' style={{ backgroundColor: 'rgb(56, 45, 94)', opacity: '80%' }}>
                                <div className='flex items-center flex-col gap-2'>
                                    <span className='text-5xl text-white'><MdCloudUpload /></span>
                                    <p className='text-sm text-white'>Upload Product</p>
                                    <input className="hidden" type="file" name="productImage" id="productImageInput" onChange={handleUploadProduct} />
                                </div>
                            </div>
                        </label>
                        <div className='mt-3 slider-container'>
                            {itemImage.length > 0 ? (
                                <Slider {...sliderSettings} className="rounded-lg overflow-hidden mb-4">
                                    {itemImage.map((element, index) => {
                                        
                                        return (
                                            <div key={index} className='relative'>
                                                <img src={element.url || element} alt={`Product ${index}`} className='w-20 h-20 object-cover' onClick={() => {
                                                    setOpenFullScreenImage(true);
                                                    setFullScreenImage(element);
                                                }} />
                                                <div className='text-[rgb(56, 45, 94)] text-xl absolute top-0 right-3 cursor-pointer' onClick={() => handleDeleteProductImage(index)}>
                                                    <IoCloseCircle />
                                                </div>
                                            </div>
                                        )
                                    })}
                                </Slider>
                            ) : (
                                <p className='text-red-600 text-sm'>Please Upload Product image</p>
                            )}
                        </div>

                        <label htmlFor='price' className="block mt-4 text-gray-700">Price:</label>
                        <input className="p-2 rounded-xl border w-full mb-2" type="number" name="price" id="price" placeholder="Enter Price" {...register("price", { required: true })} />
                        {errors.price && <span className="text-red-600 text-sm">This field is required</span>}

                        <label htmlFor='sellingPrice' className="block mt-4 text-gray-700">Selling Price:</label>
                        <input className="p-2 rounded-xl border w-full mb-2" type="number" name="sellingPrice" id="sellingPrice" placeholder="Enter Selling Price" {...register("sellingPrice", { required: true })} />
                        {errors.sellingPrice && <span className="text-red-600 text-sm">This field is required</span>}

                        <label htmlFor='description' className="block mt-4 text-gray-700">Description:</label>
                        <textarea rows={3} className="p-2 rounded-xl border w-full resize-y mb-4" name="description" id="description" placeholder="Enter Description" {...register("description", { required: true })}></textarea>
                        {errors.description && <span className="text-red-600 text-sm">This field is required</span>}

                        <div className="mt-6 flex justify-center space-x-2">
                            <button
                                type="submit"
                                className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
                                    style={{ backgroundColor: 'rgb(56, 45, 94)' }}
                            >
                                Edit Product
                            </button>
                        </div>
                    </div>
                </Form>
            </div>
            {OpenFullScreenImage && (
                <DisplayImage onClose={() => setOpenFullScreenImage(false)} imgUrl={fullScreenImage} />
            )}
        </div>
    );
};

export default EditProductModel;

