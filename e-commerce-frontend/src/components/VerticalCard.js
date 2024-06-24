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

const VerticalCard = ({ category,heading }) => {
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
        slidesToShow: 7,
        slidesToScroll: 1,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
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

    const loadingList = new Array(7).fill(null);

    return (
        <div className="p-5">
            <h2 className="text-2xl font-bold mb-5" style={{ color: 'rgb(56, 45, 94)' }}>{heading}</h2>
            <Slider {...sliderSettings}>
                {loading ? (
                    loadingList.map((_, index) => (
                        <div key={index} className="px-2 pb-2">
                            <div className="bg-white p-4 rounded-lg shadow-md h-full flex flex-col">
                                <div className="bg-slate-200 h-48 p-4 flex justify-center items-center animate-pulse">
                                </div>
                                <div className="p-4 grid gap-3">
                                    <h3 className="text-sm font-semibold text-center line-clamp-1 text-black p-1 py-2 animate-pulse rounded-full bg-slate-200"></h3>
                                    <div className="flex justify-center gap-2 mt-2">
                                        <p className="text-red-600 font-medium p-1 animate-pulse rounded-full bg-slate-200 w-full py-2"></p>
                                        <p className="text-slate-500 line-through p-1 animate-pulse rounded-full bg-slate-200 w-full py-2"></p>
                                    </div>
                                    <button className="p-2 mt-2 text-white rounded-md bg-slate-200 animate-pulse text-sm mx-auto"></button>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    products.map(product => (
                        <Link to={'product/'+product._id} key={product._id} className="px-2 pb-2">
                            <div className="bg-white p-4 rounded-lg shadow-md h-full flex flex-col">
                                <div className="bg-white h-48 p-4 flex justify-center items-center">
                                    <img src={product?.productImage[0]} alt={product?.productName} className="object-scale-down h-full hover:scale-110 transition-all mix-blend-multiply" />
                                </div>
                                <h3 className="text-sm font-semibold text-center line-clamp-1">{product.productName}</h3>
                                <div className="flex justify-center gap-2 mt-2 md:flex-wrap">
                                    <p className="text-red-600 font-medium">{displayINRCurrency(product?.sellingPrice)}</p>
                                    <p className="text-slate-500 line-through">{displayINRCurrency(product?.price)}</p>
                                </div>
                                <button
                                    className="p-2 mt-2 text-white rounded-md hover:bg-gray-600 text-sm mx-auto"
                                    style={{ backgroundColor: 'rgb(56, 45, 94)' }}
                                    onClick={(e) => handleAddToCart(e,product._id)}
                                >
                                    Add to cart
                                </button>
                            </div>
                        </Link>
                    ))
                )}
            </Slider>
        </div>
    );
};

export default VerticalCard;
