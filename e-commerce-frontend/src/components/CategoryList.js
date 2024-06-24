import React, { useEffect, useState } from 'react';
import summaryApi from '../common';
import { Link } from 'react-router-dom';

const CategoryList = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);

    const categoryLoading = new Array(13).fill(null)

    const fetchProductsByCategory = async () => {
        setLoading(true);
        const response = await fetch(summaryApi.getCategoryProduct.url);
        const data = await response.json();
        setLoading(false);
        setCategories(data?.data);
    };

    useEffect(() => {
        fetchProductsByCategory();
    }, []);

    return (
        <div className='flex justify-center p-5 mt-5 mx-5 rounded-md shadow-2xl'style={{ backgroundColor: 'rgb(239, 224, 226)', color: 'rgb(56, 45, 94)' }}>
            <div className='flex space-x-8 overflow-x-auto scrollbar-none'>
                {loading ? (
                    categoryLoading.map((el,index)=>{
                        return (
                            
                                <div className='w-16 h-16 sm:w-24 sm:h-24 md:w-20 md:h-20 lg:w-20 lg:h-20 xl:w-20 xl:h-20 rounded-md bg-white p-2 overflow-hidden animate-pulse'>
                                   
                                </div>
                               
                        );
                    })
            

                ) : (
                    categories?.map((category) => {
                        const productImage = category?.products?.[0]?.productImage?.[0];
                        return (
                            <Link to={'/product-category/'+ category?.category} key={category._id} className='flex flex-col items-center text-center cursor-pointer'>
                                <div className='w-16 h-16 sm:w-24 sm:h-24 md:w-20 md:h-20 lg:w-20 lg:h-20 xl:w-20 xl:h-20 rounded-md bg-white p-2'>
                                    {productImage && (
                                        <img src={productImage} alt={category.category} className='w-full h-full object-contain' />
                                    )}
                                </div>
                                <h2 className="mt-2 text-xs sm:text-sm md:text-base lg:text-base xl:text-base font-base capitalize">{category.category}</h2>
                            </Link>
                        );
                    })
                )}
            </div>
        </div>
    );
};

export default CategoryList;
