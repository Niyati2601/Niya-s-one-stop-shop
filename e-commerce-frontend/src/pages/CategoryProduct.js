import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import CategoryWiseProductDisplay from '../components/CategoryWiseProductDisplay';

const CategoryProduct = () => {
  const { categoryName } = useParams();
  const [filter, setFilter] = useState("");

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  return (
    <div className='mt-5 mx-auto p-2'>
      <div className="flex justify-center items-center">
        <select
          id="filterProducts"
          name="filterProducts"
          className="text-md text-gray-600 w-72 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-600 text-center"
          onChange={handleFilterChange}
          value={filter}
        >
          <option value="">Select Category</option>
          <option value="htl">Sort By Price: High to low</option>
          <option value="lth">Sort By Price: Low to high</option>
        </select>
      </div>

      <CategoryWiseProductDisplay category={categoryName} filter={filter} />
    </div>
  );
};

export default CategoryProduct;
