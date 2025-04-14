import React, { useEffect, useState } from 'react';
import Wrapper from '../Wrapper/wrapper';
import axios from 'axios';
import { backend_url } from '../../utils/Config';
import ProductWithOption from '../../shared/ProductWithOption';


// This can be customized
const priceRanges = [
  { label: 'Under $300', min: 0, max: 300 },
  { label: 'Under $500', min: 0, max: 500 },
  { label: 'Under $700', min: 0, max: 700 },
  { label: 'Under $1000', min: 0, max: 1000 },
  { label: 'Under $2000', min: 0, max: 2000 },
];

// This needs to be changes according to the backend
const categories = [
  "Pet Food & Treats",
  "Pet Accessories",
  "Toys",
  "Pet Grooming & Hygiene",
  "Pet Health & Wellness",
  "Pet Housing & Enclosures",
  "Pet Training & Behavior",
  "Pet Adoption & Services"
];

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedPrice, setSelectedPrice] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    getAllProducts();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [selectedPrice, selectedCategory, products]);

  const getAllProducts = async () => {
    try {
      const response = await axios.get(`${backend_url}/api/v1/products`);
      setProducts(response.data.data);
      setFilteredProducts(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const applyFilters = () => {
    let filtered = [...products];

    if (selectedPrice) {
      filtered = filtered.filter(
        product => product.price >= selectedPrice.min && product.price <= selectedPrice.max
      );
    }

    if (selectedCategory) {
      filtered = filtered.filter(
        product => product.category === selectedCategory
      );
    }

    setFilteredProducts(filtered);
  };

  return (
    <Wrapper current={'shop'}>
      <div className='w-full flex flex-col p-2 bg-night'>
        <img src='https://supertails.com/cdn/shop/files/Big_sale_562b1227-ffb9-48e4-96fb-c5c866b149b9_1600x.png?v=1737615716' className='w-full h-64' />

        <div className='flex flex-col md:flex-row w-full bg-yellow-200'>
          <div className='w-full md:w-1/5 bg-gray-800 p-4'>
            <h2 className='text-amber-300 mb-2'>Filter by Category</h2>
            <ul>
              {categories.map((category, index) => (
                <li key={index}>
                  <label className='cursor-pointer flex justify-between items-center hover:bg-slate-400 p-1'>
                    <span>{category}</span>
                    <input
                      type='radio'
                      name='category'
                      onChange={() => setSelectedCategory(category)}
                      checked={selectedCategory === category}
                    />
                  </label>
                </li>
              ))}
            </ul>

            <h2 className='text-amber-300 mt-4 mb-2'>Filter by Price Range</h2>
            <ul>
              {priceRanges.map((range, index) => (
                <li key={index}>
                  <label className='cursor-pointer flex justify-between items-center hover:bg-slate-400 p-1'>
                    <span>{range.label}</span>
                    <input
                      type='radio'
                      name='price'
                      onChange={() => setSelectedPrice(range)}
                      checked={selectedPrice === range}
                    />
                  </label>
                </li>
              ))}
            </ul>
          </div>

          <div className='w-full md:h-4/5 flex flex-col bg-night'>
            <h1 className='text-amber-300 text-center m-3'>Happy Cuddle</h1>
            <div className='w-full flex flex-row flex-wrap gap-5 bg-night p-3 justify-evenly'>
              {filteredProducts.length > 0 ? (
                filteredProducts.map((product, id) => (
                  <ProductWithOption key={id} pID={product?._id} urls={product?.product_Images[0]} product_name={product?.name} price={product?.price}/>
                ))
              ) : (
                <h1>No Product Available</h1>
              )}
            </div>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default Shop;
