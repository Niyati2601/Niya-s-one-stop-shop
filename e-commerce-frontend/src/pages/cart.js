import React, { useContext, useEffect, useState } from 'react'
import summaryApi from '../common'
import Context from '../context';
import { AiFillDelete } from 'react-icons/ai';
import displayINRCurrency from '../helpers/DisplayCurrency'
import { toast } from 'react-toastify';
import { loadStripe } from '@stripe/stripe-js';


const Cart = () => {
    const [data, setData] = useState([])
    
    const [loading, setLoading] = useState(false)
    const loadingCart = new Array(4).fill(null)
    const { getProductCount } = useContext(Context)

    const getCartData = async () => {
        setLoading(true)
        const res = await fetch(summaryApi.viewCart.url, {
            method: summaryApi.viewCart.method,
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
        })
        const data = await res.json()

        if (data.success) {
            setData(data.data)
        }
        setLoading(false)
    }

    useEffect(() => {
        getCartData()
    }, [])

    const updateCartProduct = async (id, qty) => {
        const response = await fetch(summaryApi.updateCartProduct.url, {
            method: summaryApi.updateCartProduct.method,
            credentials: 'include',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                _id: id,
                quantity: qty
            })
        });

        const responseData = await response.json();
        if (responseData.success) {
            getCartData();
        }
    }

    const increaseQty = async (id, qty) => {
        updateCartProduct(id, qty + 1);
    }

    const decreaseQty = async (id, qty) => {
        if (qty > 1) {
            updateCartProduct(id, qty - 1);
        }
    }

    const totalQty = data.reduce((previousValue, currentValue) => previousValue + currentValue.productQuantity, 0)
    const totalPrice = data.reduce((prev, curr) => prev + (curr.productQuantity * curr?.productId?.sellingPrice), 0)


    const handleDeleteCartProduct = async (id) => {
          const res = await fetch(summaryApi.deleteCartProduct.url, {
            method: summaryApi.deleteCartProduct.method,
            credentials: 'include',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ _id: id})
          });
    
          const responseData = await res.json();
          if (responseData.success) {
            toast.success(responseData.message);
            setData(data.filter(data => data.id !== id));
            getProductCount();
            getCartData();
          } else {
            toast.error(responseData.message);
          }
      };

      const Pay = async() => {
        const stripe = await loadStripe("pk_test_51PLNcUSEA6G6NB8g7g9PcG18cJ6Sj4IgXaYI1OmoXTnMYuidZaCv7GXNMm1HSBDWApt2HpkFVp96TB5CpcGtdKLq00bIwUezuc");
        

        const body = {
            products: data
        }

        const res = await fetch(summaryApi.createCheckoutSession.url, {
            method: summaryApi.createCheckoutSession.method,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        })
           const session = await res.json()
           

           const result = stripe.redirectToCheckout({
               sessionId: session.session
            })
            

           if (result.error) {
               
           }
      }

    return (
        <div className='p-5'>
            <div className='container mx-auto'>
                <div className='text-center text-lg my-3'>
                    {data.length === 0 && !loading && (
                        <p className='bg-white py-5'>No Data</p>
                    )}
                </div>
                <div className='flex flex-col lg:flex-row gap-10 lg:justify-between p-4'>
                    <div className='w-full max-w-3xl'>
                        {loading ? (
                            loadingCart.map((el, index) => (
                                <div key={index} className='w-full bg-slate-200 h-32 my-2 border border-slate-300 animate-pulse rounded'></div>
                            ))
                        ) : (
                            data.map((product) => (
                                <div key={product._id} className='w-full bg-white h-32 my-2 border border-slate-300 rounded grid grid-cols-[128px,1fr]'>
                                    <div className='w-32 h-32 bg-slate-200'>
                                        <img src={product?.productId?.productImage?.[0]} className='w-full h-full object-scale-down mix-blend-multiply' alt={product?.productId?.productImage} />
                                    </div>
                                    <div className='p-2 relative flex flex-wrap flex-col'>
                                        <div className='absolute right-0 rounded-md p-2 hover:text-white cursor-pointer mr-auto' style={{ border: '1px solid rgb(56, 45, 94)', backgroundColor: 'rgb(56, 45, 94)', color: 'rgb(239,224,226)' }} onClick={()=> handleDeleteCartProduct(product?._id)}>
                                            <AiFillDelete />
                                        </div>
                                        <h2 className='text-lg lg:text-xl text-ellipsis line-clamp-1'>{product?.productId?.productName}</h2>
                                        <p className='capitalize text-slate-500'>{product?.productId.category}</p>
                                        <div className='flex items-center justify-between flex-wrap'>
                                            <p className='text-red-600 font-medium text-md'>{displayINRCurrency(product?.productId?.sellingPrice)}</p>
                                            <p className='text-slate-600 font-semibold text-md'>{displayINRCurrency(product?.productId?.sellingPrice * product?.productQuantity)}</p>
                                        </div>
                                        <div className='flex items-center gap-3 mt-1'>
                                            <button className='border border-red-600 text-red-600 hover:bg-[rgb(239,224,226)] hover:text-white w-6 h-6 flex justify-center items-center rounded' style={{ border: '1px solid rgb(56, 45, 94)', color: 'rgb(56, 45, 94)' }} onClick={() => decreaseQty(product._id, product.productQuantity)}>-</button>
                                            <span>{product?.productQuantity}</span>
                                            <button className='border border-red-600 text-red-600 hover:bg-[rgb(239,224,226)] hover:text-white w-6 h-6 flex justify-center items-center rounded' style={{ border: '1px solid rgb(56, 45, 94)', color: 'rgb(56, 45, 94)' }} onClick={() => increaseQty(product._id, product.productQuantity)}>+</button>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                    <div className='mt-5 lg:mt-0 w-full max-w-sm'>
                        {loading ? (
                            <div className='h-36 bg-slate-200 border border-slate-300 animate-pulse'></div>
                        ) : (
                            <div className='h-36 bg-white rounded-md' style={{ color: 'rgb(56, 45, 94)', backgroundColor: 'rgb(239,224,226)' }}>
                                <h1 className='px-4 py-1 font-semibold text-lg justify-center items-center text-center'>Bill Details</h1>
                                <div className='flex items-center justify-between px-4 gap-2 font-medium text-md text-slate-600'>
                                    <p>Quantity</p>
                                    <p>{totalQty}</p>
                                </div>
                                <div className='flex items-center justify-between px-4 gap-1 font-medium text-md text-slate-600'>
                                    <p>Total Price</p>
                                    <p>{displayINRCurrency(totalPrice)}</p>
                                </div>
                                <div className='flex justify-center items-center mt-2'>
                                    <button className="p-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 w-full" style={{ backgroundColor: 'rgb(56, 45, 94)' }} onClick={Pay}>
                                        Buy Now
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Cart
