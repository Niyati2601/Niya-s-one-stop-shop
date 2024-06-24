import React, { useEffect, useState } from 'react'
import UploadProduct from '../components/UploadProduct'
import summaryApi from '../common';
import { toast } from 'react-toastify';
import { AiFillDelete, AiFillEdit } from 'react-icons/ai';
import EditProductModel from '../components/EditProductModel';
import displayINRCurrency from '../helpers/DisplayCurrency';

const AllProducts = () => {
  const [openUploadProduct, setOpenUploadProduct] = useState(false);
  const [allProduct, setAllProduct] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

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
      setAllProduct(responseData.data || []);
    }
    if (responseData.error) {
      toast.error(responseData.message);
    }
  }

  useEffect(() => {
    fetchAllProduct()
  }, [])

  const handleEditClick = (product) => {
    setSelectedProduct(product);
    setIsEditModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsEditModalOpen(false);
    setSelectedProduct(null);
  };
  const handleDeleteProduct = async (productId) => {
    const confirmed = window.confirm("Are you sure you want to delete this product?");
    if (!confirmed) return;

    try {
      const res = await fetch(summaryApi.deleteProduct.url, {
        method: summaryApi.deleteProduct.method,
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ _id: productId})
      });

      const responseData = await res.json();
      if (responseData.success) {
        toast.success(responseData.message);
        setAllProduct(allProduct.filter(product => product.id !== productId));
      } else {
        toast.error(responseData.message);
      }
    } catch (error) {
      toast.error('An error occurred while deleting the product.');
    }
  };
  return (
    <div className='rounded-md' style={{ backgroundColor: 'rgb(239, 224, 226)', color: 'rgb(56, 45, 94)' }}>
      <div className="flex justify-between items-center mb-4 p-4 rounded-full">
        <h2 className="text-xl font-semibold">All Products</h2>
        <button className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700" style={{ backgroundColor: 'rgb(56, 45, 94)' }}
          onClick={() => setOpenUploadProduct(true)}>Upload Product</button>
      </div>
      {/*All Products */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4" >
        {allProduct?.map((item, index) => {
          
          return (
            <div className='flex items-center bg-white p-4 rounded-lg shadow-md' key={index} >
              <div className="w-24 h-24 flex-shrink-0">
                <img src={item.productImage[0]} alt='product' className='object-cover h-full rounded-md' />
              </div>
              <div className='ml-4 overflow-auto' >
                <h2 className='text-lg font-semibold text-gray-800' style={{ color: 'rgb(56, 45, 94)' }}>Product Name: {item.productName}</h2>
                <h3 className='text-md text-gray-600' style={{ color: 'rgb(56, 45, 94)' }}>Brand Name: {item.brandName}</h3>
                <select
                  className='text-md text-gray-600 w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-600'
                  style={{ color: 'rgb(56, 45, 94)' }}
                  value={item.category}
                  disabled
                  aria-label='category'
                >
                  <option>{item.category}</option>
                </select>

                <p className='text-sm text-gray-500 mt-2 text-ellipsis line-clamp-3' style={{ color: 'rgb(56, 45, 94)' }}>Description: {item.description}</p>
                <div className="mt-2">
                  <p className='text-sm text-gray-700' style={{ color: 'rgb(56, 45, 94)' }}>Price: {displayINRCurrency(item.price)}</p>
                  <p className='text-sm text-gray-700' style={{ color: 'rgb(56, 45, 94)' }}>Selling Price: {displayINRCurrency(item.sellingPrice)}</p>
                </div>
                <div className='mt-2'>
                  <button className='rounded-md p-2' style={{ backgroundColor: 'rgb(56, 45, 94)', color: 'rgb(239, 224, 226)' }} onClick={() => { handleEditClick(item) }}><AiFillEdit /></button>
                  <button className='rounded-md p-2 mx-2' style={{ backgroundColor: 'rgb(56, 45, 94)', color: 'rgb(239, 224, 226)' }} onClick={() => { handleDeleteProduct(item._id) }}><AiFillDelete /></button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      {/* Upload Product */}
      {openUploadProduct && (

        <UploadProduct onClose={() => setOpenUploadProduct(false)} />

      )}
      {isEditModalOpen && (
        <EditProductModel
          initialData={selectedProduct}
          onClose={handleCloseModal}
        />
      )}
    </div>
  )
}

export default AllProducts