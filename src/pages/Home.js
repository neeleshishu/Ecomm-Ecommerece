import React, { useEffect, useState } from 'react';
import ProductList from '../components/ProductList';
import { fetchProducts } from '../services/api';

const Home = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function fetchProductsData() {
      try {
        const data = await fetchProducts();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    }

    fetchProductsData();
  }, []);

  return (
    <div className='home_page'>
      <h1 className='text-2xl font-semibold text-center mb-4'>Product Listing Page</h1>
      <ProductList products={products} />
    </div>
  );
};

export default Home;
