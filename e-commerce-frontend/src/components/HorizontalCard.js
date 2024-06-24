import React, { useContext, useEffect, useState } from 'react';
import summaryApi from '../common';
import Slider from 'react-slick'; // Import slider component
import displayINRCurrency from '../helpers/DisplayCurrency'

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from 'react-router-dom';
import addToCart from '../helpers/addToCart';
import Context from '../context';

const NextArrow = ({ onClick }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="feather feather-chevron-right"
        style={{ cursor: 'pointer', position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', zIndex: '1', color: 'rgb(56, 45, 94)' }}
        onClick={onClick}
    >
        <polyline points="9 18 15 12 9 6" />
    </svg>
);

const PrevArrow = ({ onClick }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="feather feather-chevron-left"
        style={{ cursor: 'pointer', position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: 'rgb(56, 45, 94)', zIndex: '1' }}
        onClick={onClick}
    >
        <polyline points="15 18 9 12 15 6" />
    </svg>
);

const HorizontalCard = ({ category, heading }) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const {getProductCount} = useContext(Context)


    const handleAddToCart = async(e,id) => {
       await addToCart(e,id)
        getProductCount()
    }

    const fetchProductsCategoryWise = async (category) => {
        try {
            const res = await fetch(`${summaryApi.getCategoryWiseProduct.url}/${category}`, {
                method: summaryApi.getCategoryWiseProduct.method,
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const data = await res.json();
            
            if (data.success) {
                setProducts(data.data);
            }
        } catch (error) {
            
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (category) {
            fetchProductsCategoryWise(category);
        }
    }, [category]);

    // Slider settings
    const sliderSettings = {
        infinite: true,
        speed: 500,
        slidesToShow: 6,
        slidesToScroll: 1,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    infinite: true,
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    initialSlide: 1
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };

    const loadingList = new Array(6).fill(null);

    return (
        <div className="p-5">
            <h2 className="text-2xl font-bold mb-5" style={{ color: 'rgb(56, 45, 94)' }}>{heading}</h2>
            <Slider {...sliderSettings}>
                {loading ? (
                    loadingList.map((_, index) => (
                        <div key={index} className="px-2 pb-2">
                            <div className="bg-white p-4 rounded-md shadow-md h-full flex flex-row flex-wrap animate-pulse">
                                <div className="w-24 h-24 flex-shrink-0 bg-slate-200 rounded-md mb-4"></div>
                                <div className='ml-4 flex-1'>
                                    <h3 className="text-lg font-semibold text-gray-800 bg-slate-200 h-6 w-3/4 rounded mb-2"></h3>
                                    <p className='text-sm text-gray-600 bg-slate-200 h-4 w-1/2 rounded mb-2'></p>
                                    <p className='text-red-600 font-medium bg-slate-200 h-4 w-1/4 rounded mb-2'></p>
                                    <p className='text-slate-500 line-through bg-slate-200 h-4 w-1/4 rounded mb-4'></p>
                                    <button
                                        className="p-2 mt-1 bg-slate-200 rounded-md h-8 w-20"
                                    ></button>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    products.map(product => {
                        
                        return (
                            <Link to={'/product/'+product._id} key={product._id} className="px-2 pb-2">
                                <div className="bg-white p-4 rounded-md shadow-md h-full flex-row md:flex-wrap lg:flex">
                                    <div className="w-24 h-24 flex-shrink-0">
                                        <img src={product.productImage[0]} alt={product.productName} className="object-cover h-full w-full rounded-md mb-4" />
                                    </div>
                                    <div className='ml-4 overflow-auto'>
                                        <h3 className="text-lg font-semibold text-gray-800 line-clamp-1" style={{ color: 'rgb(56, 45, 94)' }}>{product.productName}</h3>
                                        <p className='text-sm text-gray-600' style={{ color: 'rgb(56, 45, 94)' }}>Brand: {product.brandName}</p>
                                        <p className='text-red-600 font-medium'>{displayINRCurrency(product?.sellingPrice)}</p>
                                        <p className='text-slate-500 line-through'>{displayINRCurrency(product?.price)}</p>
                                        <button
                                            className="p-2 mt-1 text-white rounded-md hover:bg-gray-600 text-sm w-30"
                                            style={{ backgroundColor: 'rgb(56, 45, 94)' }}
                                            onClick={(e) => handleAddToCart(e,product?._id)}
                                        >
                                            Add to cart
                                        </button>
                                    </div>
                                </div>
                            </Link>
                        )
                    })
                )}
            </Slider>
        </div>
    );
};

export default HorizontalCard;
