import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import { Outlet } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect, useState } from 'react';
import summaryApi from './common';
import Context from './context';
import { useDispatch } from 'react-redux';
import { setUserDetails } from './store/userSlice';


export default function App() {
  const dispatch = useDispatch()
  const [cartProductCount, setCartProductCount] = useState(0)
  
  const fetchUserDetails = async() => {
    const data = await fetch(summaryApi.userDetails.url,{
      method: summaryApi.userDetails.method,
      credentials: 'include',
    })
    const responseData = await data.json()
    if(responseData.success) {
      dispatch(setUserDetails(responseData))
    }
    // 

  }
  const getProductCount = async() => {
    const data = await fetch(summaryApi.addToCartProductCount.url,{
      method: summaryApi.addToCartProductCount.method,
      credentials: 'include',
    })
    const responseData = await data.json()
    
    setCartProductCount(responseData?.data)
    
    // 

  }

  
  useEffect(() => {
    //user Details 
    fetchUserDetails()
    //get product count
    getProductCount()
  }, [])

  return (
    <>
    <Context.Provider value={{
      fetchUserDetails
      ,cartProductCount //current add to cart product count 
      , getProductCount
    }} >
    <ToastContainer />
      <Header />
      <main className='min-h-[calc(100vh-380px)] pt-16'>
      <Outlet />
      </main>
      <Footer />
      </Context.Provider>
    </>
  )
}
