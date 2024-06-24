import React, { useContext, useEffect, useState } from 'react';
import summaryApi from '../common';
import displayINRCurrency from '../helpers/DisplayCurrency';
import { Link } from 'react-router-dom';
import addToCart from '../helpers/addToCart';
import Context from '../context';

const CategoryWiseProductDisplay = ({ category,filter }) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    const {getProductCount} = useContext(Context)


    const handleAddToCart = async(e,id) => {
       await addToCart(e,id)
        getProductCount()
    }
    useEffect(() => {
        if (filter === 'htl') {
          setProducts((prevProducts) => [...prevProducts].sort((a, b) => b.sellingPrice - a.sellingPrice));
        } else if (filter === 'lth') {
          setProducts((prevProducts) => [...prevProducts].sort((a, b) => a.sellingPrice - b.sellingPrice));
        }
      }, [filter]);

    const fetchProductsCategoryWise = async (category) => {
        try {
            const res = await fetch(`${summaryApi.getCategoryWiseProduct.url}/${category}`, {
                method: summaryApi.getCategoryWiseProduct.method,
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
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

    const loadingList = new Array(7).fill(null);

    return (
        <div className="mt-2">
            <h2 className="text-2xl font-bold mb-5" style={{ color: 'rgb(56, 45, 94)' }}>
                Products
            </h2>
            {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {loadingList.map((_, index) => (
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
                    ))}
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
                    {products.map((product) => (
                        <div key={product._id} className="px-2 pb-2" onClick={() => {
                            window.location.href = `/product/${product._id}`;
                          }}>
                            <div className="grid bg-white p-4 rounded-lg shadow-md h-full flex flex-col">
                                <div className="bg-white h-48 p-4 flex justify-center items-center">
                                    <img
                                        src={product?.productImage[0]}
                                        alt={product?.productName}
                                        className="object-scale-down h-full hover:scale-110 transition-all mix-blend-multiply"
                                    />
                                </div>
                                <h3 className="text-md font-semibold text-center line-clamp-1">
                                    {product.productName}
                                </h3>
                                <div className="flex justify-center gap-2 mt-2">
                                    <p className="text-red-600 font-medium">
                                        {displayINRCurrency(product?.sellingPrice)}
                                    </p>
                                    <p className="text-slate-500 line-through">
                                        {displayINRCurrency(product?.price)}
                                    </p>
                                </div>
                                <button
                                    className="p-2 mt-2 text-white rounded-md hover:bg-gray-600 text-sm mx-auto"
                                    style={{ backgroundColor: 'rgb(56, 45, 94)' }}
                                    onClick={(e) => {handleAddToCart(e)}}
                                >
                                    Add to cart
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default CategoryWiseProductDisplay;
