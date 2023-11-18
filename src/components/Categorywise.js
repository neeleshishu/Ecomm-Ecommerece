import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { filterProduct } from '../services/api';
import { useDispatch } from 'react-redux';
import { addToCart } from '../store/actions';
import Skeliton from './Skeliton.js'
;
const ProductListByCategory = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [orgmin, setorgmin] = useState(0);
  const [orgmax, setorgmax] = useState(1000);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1000);
  const [sortOrder, setSortOrder] = useState('asc'); // State for sorting order

  useEffect(() => {
    setLoading(true);
    filterProduct(id, orgmin, orgmax)
      .then((response) => {
        setLoading(false);
        setProducts(response);
      })
      .catch((error) => {
        setLoading(false);
        console.error('Error fetching products:', error);
      });
  }, [id, orgmin, orgmax]);

  const handlePriceFilterChange = () => {
    setorgmin(minPrice);
    setorgmax(maxPrice);
    
    setSortOrder('asc');
  };

  if (loading) {
    return <Skeliton/>;
  }

  const handleSortByPrice = () => {
    const sortedProducts = [...products];

    if (sortOrder === "asc") {
      sortedProducts.sort((a, b) => a.price - b.price);
      setSortOrder("desc");
    } else {
      sortedProducts.sort((a, b) => b.price - a.price);
      setSortOrder("asc");
    }

    setProducts(sortedProducts);
  };

  const handleAddToCart = (item) => {
    dispatch(addToCart(item));
    console.log(item);
  };

  return (
    <div>
      <h1 className='text-2xl text-center mt-4'>{products[0]?.category.name}</h1>
      
      <div className='price-filter flex justify-center items-center my-4'>
        <div className='mx-4'>
          <label htmlFor='minPrice' className='text-lg font-semibold'>
            Min Price:
          </label>
          <input
            type='number'
            id='minPrice'
            value={minPrice}
            onChange={(e) => setMinPrice(Number(e.target.value))}
            className='border border-gray-300 rounded-lg px-3 py-1 focus:outline-none focus:ring focus:border-blue-400'
          />
        </div>
        
        <div className='mx-4'>
          <label htmlFor='maxPrice' className='text-lg font-semibold'>
            Max Price:
          </label>
          <input
            type='number'
            id='maxPrice'
            value={maxPrice}
            onChange={(e) => setMaxPrice(Number(e.target.value))}
            className='border border-gray-300 rounded-lg px-3 py-1 focus:outline-none focus:ring focus:border-blue-400'
          />
        </div>
        
        <button
          onClick={handlePriceFilterChange}
          className='bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300'
        >
          Apply Filters
        </button>
      </div>

     
      <button
        onClick={handleSortByPrice}
        className='text-white bg-black px-4 py-2'
      >
         Sort by Price {sortOrder === "asc" ? "Low to High" : "High to Low"}
      </button>

      <div className='all_category'>
        {products.map((product) => (
          <Link to={`/product/${product.id}`} key={product.id} className='text-decoration-none'>
            <img src={product.images[0]} alt={product.title} class='w-full h-40 object-cover' />
            <div class='p-4'>
              <h2 class='text-xl font-semibold mb-2'>{product.title}</h2>
              <div class='flex justify-between items-center'>
                <p class='text-lg font-bold text-primary'>Price: ${product.price}</p>
                <button onClick={() => handleAddToCart(product)} class='text-white bg-black px-4 py-2'>
                  Add to Cart
                </button>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ProductListByCategory;
