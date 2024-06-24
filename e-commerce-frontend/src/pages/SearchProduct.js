import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import summaryApi from '../common';
import SearchCard from '../components/SearchCards';

const SearchProduct = () => {
    const query = useLocation()
    const [data, setData] = useState([])
    
    const [loading, setLoading] = useState(false)

    const getSearchProduct = async () => {
        setLoading(true)
        const res = await fetch(summaryApi.searchProduct.url + query.search)
        const responseData = await res.json()
        setData(responseData?.data)
        setLoading(false)
    }

    useEffect(() => {
        getSearchProduct()
    }, [query])
    return (
        <div className='container mx-auto p-4'>
        {
          loading && (
            <p className='text-lg text-center'>Loading ...</p>
          )
        }
   
        <p className='text-lg font-semibold my-3'>Search Results : {data.length}</p>
  
        {
          data.length === 0 && !loading && (
             <p className='bg-white text-lg text-center p-4'>No Data Found....</p>
          )
        }
  
  
        {
          data.length !==0 && !loading && (
            <SearchCard loading={loading} data={data}/>
          )
        }
  
      </div>
    )
}

export default SearchProduct