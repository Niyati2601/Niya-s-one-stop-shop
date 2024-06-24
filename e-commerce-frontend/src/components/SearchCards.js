// SearchCard.jsx

import React from 'react';
import displayINRCurrency from '../helpers/DisplayCurrency';
import { Link } from 'react-router-dom';
import addToCart from '../helpers/addToCart';
import Context from '../context';

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const SearchCard = ({ data, loading }) => {
    const { getProductCount } = React.useContext(Context);

    const handleAddToCart = async (e, id) => {
        await addToCart(e, id);
        getProductCount();
    };

    const loadingList = new Array(8).fill(null);

    return (
        <div className="p-5">
            <h2 className="text-2xl font-bold mb-5" style={{ color: 'rgb(56, 45, 94)' }}>Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {loading
                    ? loadingList.map((_, index) => (
                        <div key={index} className="px-2 pb-2">
                            <div className="bg-white p-4 rounded-lg shadow-md h-full flex flex-col">
                                <div className="bg-slate-200 h-48 p-4 flex justify-center items-center animate-pulse"></div>
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
                    : data.map(product => (
                        <div key={product._id} className="px-2 pb-2">
                            <Link to={`/product/${product._id}`} className="bg-white p-4 rounded-lg shadow-md h-full flex flex-col">
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
                                    onClick={(e) => handleAddToCart(e, product._id)}
                                >
                                    Add to cart
                                </button>
                            </Link>
                        </div>
                    ))}
            </div>
        </div>
    );
};

export default SearchCard;
