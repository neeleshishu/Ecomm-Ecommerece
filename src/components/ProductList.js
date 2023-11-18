import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getAllProducts } from '../services/api';
import { useDispatch } from 'react-redux';
import { addToCart } from '../store/actions';
import Skeliton from './Skeliton.js';
import { toast } from 'react-toastify';

const ProductList = () => {
  const dispatch = useDispatch();

  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const perPage = 24;
  const [sortOrder, setSortOrder] = useState("asc");

  useEffect(() => {
    const offset = (page - 1) * perPage;

    getAllProducts({ offset, limit: perPage })
      .then((response) => {
        setLoading(false);
        setProducts(response.data);
      })
      .catch((error) => {
        console.error('Error fetching products:', error);
      });
  }, [page, perPage]);

  const handlePrevPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const handleNextPage = () => {
    setPage(page + 1);
  };

  // if (loading) {
  //   return <div className='lds-dual-ring text-center mt-10'></div>;
  // }

  const handleAddToCart = (item) => {
    dispatch(addToCart(item));
    toast.success(`${item.title} ADD To Card !`, {
      position: toast.POSITION.TOP_RIGHT
  });
  };

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

  return (
    <>
    {loading ? (<Skeliton/>) : (
      <>
      <button onClick={handleSortByPrice} className="text-white bg-black px-4 py-2">
          Sort by Price {sortOrder === "asc" ? "Low to High" : "High to Low"}
        </button>
      <div className='all_products_list'>
        
        {products.map((product) => (
          <div key={product.id} className="text-decoration-none">
            <Link to={`/product/${product.id}`}>
              <img src={product.images[0]} alt={product.title} class="w-full h-40 object-cover" />
            </Link>
            <div class="p-4">
              <h2 class="text-xl font-semibold mb-2">{product.title}</h2>
              <div class="flex justify-between items-center">
                <p class="text-lg font-bold text-primary">Price: ${product.price}</p>
                <button onClick={() => handleAddToCart(product)} class="text-white bg-black px-4 py-2">
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
        
      </div>
    <div className="pagination flex justify-center items-center mt-4">
  <button
    onClick={handlePrevPage}
    disabled={page === 1}
    className={`${
      page === 1 ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'
    } text-white px-4 py-2 rounded-l`}
  >
    Previous
  </button>
  <span className="bg-gray-300 text-gray-800 px-4 py-2">{`Page ${page}`}</span>
  <button
    onClick={handleNextPage}
    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-r"
  >
    Next
  </button>
</div>
</>
    )}
    
    </>
  );
};

export default ProductList;
