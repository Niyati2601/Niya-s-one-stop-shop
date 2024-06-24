import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Form } from 'react-router-dom';
import productCategory from '../helpers/productCategory';
import { toast } from 'react-toastify';
import summaryApi from '../common';
import { MdCloudUpload } from "react-icons/md";
import uploadImage from '../helpers/uploadImage';
import DisplayImage from './DisplayImage';
import { IoCloseCircle } from "react-icons/io5";

const UploadProduct = ({ onClose }) => {
    const [itemImage, setItemImage] = useState([]);
    
    
    const [fullScreenImage, setFullScreenImage] = useState("");
    const [OpenFullScreenImage, setOpenFullScreenImage] = useState(false);

    const { register, handleSubmit, reset } = useForm();
    
    const fetchAllProduct = async () => {
        const res = await fetch(summaryApi.getAllProducts.url, {
          method: summaryApi.getAllProducts.method,
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json'
          },
        });
        const responseData = await res.json();
        if (responseData.success) {
          toast.success(responseData.message)
        //   setAllProduct(responseData.data || []);
        }
        if (responseData.error) {
          toast.error(responseData.message);
        }
      }
    const onFormSubmit = async (data) => {
        data.productImage = itemImage.map((item)=> item.url)
        
        
        try {
            const res = await fetch(summaryApi.uploadProduct.url, {
                method: summaryApi.uploadProduct.method,
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
            fetchAllProduct()
            const responseData = await res.json();
            if (responseData.success) {
                toast.success(responseData.message);
                reset();
                onClose();
            } else {
                toast.error(responseData.message);
            }
        }
        catch (error) {
            toast.error('An error occurred while submitting the form.');
        }
    }

    const handleChange = (e) => {
        const {name, value} = e.target
    }

    const handleUploadProduct = async (e) => {
        const file = e.target?.files?.[0];
        
        
        if (!file) {
            // toast.error('No file selected.');
            return;
        }

        try {
            const uploadImageCloudinary = await uploadImage(file);
            setItemImage((prev) => [...prev, uploadImageCloudinary]);
        } catch (error) {
            toast.error('Error uploading image.');
        }
    }

    const handleDeleteProductImage = (index) => {
        const newProductImage = itemImage.filter((_, i) => i !== index);
        setItemImage(newProductImage);
    }


    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 w-100">
            <div className="fixed inset-0 bg-black opacity-50" onClick={onClose}></div>
            <div className="bg-white rounded-lg shadow-lg w-96 p-4 z-10" style={{ backgroundColor: 'rgb(239, 224, 226)' }}>
                <div className="flex items-center justify-between">
                    <div className="flex flex-col items-start">
                        <h4 className="mb-1 text-2xl font-bold" style={{ color: 'rgb(56, 45, 94)' }}>Upload Product</h4>
                    </div>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="mr-3 h-5 w-5 cursor-pointer"
                        onClick={onClose}
                    >
                        <path
                            fillRule="evenodd"
                            d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
                            clipRule="evenodd"
                        />
                    </svg>
                </div>
                <hr />
                <div className="mt-4">
                    <div className="grid gap-6">
                        <Form onSubmit={handleSubmit(onFormSubmit)}>
                            <div className="col">
                                <label htmlFor='productName'>Product Name:</label>
                                <input className="p-2 rounded-xl border w-full" type="text" name="productName" id="productName" placeholder="Enter Product Name" {...register("productName", { required: true })} onChange={handleChange} />
                                <label className='mt-8' htmlFor='brandName'>Brand Name:</label>
                                <input className="p-2 rounded-xl border w-full" type="text" name="brandName" id="brandName" placeholder="Enter Brand Name" {...register("brandName", { required: true })} onChange={handleChange} />
                                <label className='mt-8' htmlFor='category'>Category</label>
                                <select className="p-2 rounded-xl border w-full" type="text" name="category" id="category" placeholder="Enter Category" {...register("category", { required: true })} onChange={handleChange}>
                                    <option value="">Select Category</option>
                                    {
                                        Object.values(productCategory).map((el, index) => {
                                            return (
                                                <option className='flex' value={el.value} key={el.value + index}>{el.label}</option>
                                            )
                                        })
                                    }
                                </select>
                                <label className='mt-8' htmlFor='productImage'>Product Image</label>
                                <label htmlFor='productImageInput'>
                                    <div className='p-2 flex items-center justify-center w-full border rounded-md shadow-lg' style={{ backgroundColor: 'rgb(56, 45, 94)', opacity: '80%' }}>
                                        <div className='flex items-center flex-col gap-2'>
                                            <span className='text-5xl' style={{ color: 'rgb(239, 224, 226)' }}><MdCloudUpload /></span>
                                            <p className='text-sm' style={{ color: 'rgb(239, 224, 226)' }}>Upload Product</p>
                                            <input className="hidden" type="file" name="productImage" id="productImageInput" placeholder="Enter Product Image" onChange={handleUploadProduct}  />
                                        </div>
                                    </div>
                                </label>
                                <div className='mt-3'>
                                    {itemImage.length > 0 ? (
                                        <div className='flex items-center gap-2'>
                                            {itemImage.map((element, index) => {
                                                
                                                return (
                                                   
                                                    <div key={index} className='relative'>
                                                    <img src={element.url} alt={`Product ${index}`} className='w-20 h-20 rounded-lg'  onClick={() => {
                                                        setOpenFullScreenImage(true);
                                                        setFullScreenImage(element.url);
                                                    }} />
                                                    <div className='text-[rgb(56, 45, 94)] text-xl absolute top-0 right-0 cursor-pointer' onClick={() => handleDeleteProductImage(index)}>
                                                        <IoCloseCircle />
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                ) : (
                                    <p className='text-red-600 text-sm'>Please Upload Product image</p>
                                )}
                            </div>
                            <label className='mt-8' htmlFor='price'>Price</label>
                            <input className="p-2 rounded-xl border w-full" type="number" name="price" id="price" placeholder="Enter Price" {...register("price", { required: true })} onChange={handleUploadProduct} />
                            <label className='mt-8' htmlFor='sellingPrice'>Selling Price</label>
                            <input className="p-2 rounded-xl border w-full" type="number" name="sellingPrice" id="sellingPrice" placeholder="Enter Selling Price" {...register("sellingPrice", { required: true })} onChange={handleUploadProduct} />
                            <label className='mt-12' htmlFor='description'>Description</label>
                            <textarea className="p-2 rounded-xl border w-full resize-y" type="textarea" name="description" id="description" placeholder="Enter Description" {...register("description", { required: true })} onChange={handleUploadProduct} />
                        </div>
                        <div className="mt-6 flex justify-center space-x-2">
                            <button
                                type="submit"
                                className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
                                style={{ backgroundColor: 'rgb(56, 45, 94)' }}
                            >
                                Upload Product
                            </button>
                        </div>
                    </Form>
                </div>
            </div>
            {OpenFullScreenImage && (
                <DisplayImage onClose={() => setOpenFullScreenImage(false)} imgUrl={fullScreenImage} />
            )}
        </div>
    </div>
);
}

export default UploadProduct;

