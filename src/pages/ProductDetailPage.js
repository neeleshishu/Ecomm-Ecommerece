import React, { useEffect, useState } from 'react';
import { fetchProductById } from '../services/api';
import ProductDetail from "../components/ProductDetail";
import { useParams } from 'react-router-dom';

function ProductDetailPage() {
  
  const { id } = useParams(); 
  const [product, setProduct] = useState(null);

  useEffect(() => {
   
    fetchProductById(id)
      .then((response) => {
        setProduct(response);
      })
      .catch((error) => {
       
        console.error('Error fetching product:', error);
      });
  }, [id]);


  return (
    <div>
      <h1 className=' text-2xl text-center m-7'>Product Detail Page</h1>
      {product && <ProductDetail product={product} />}
      
    </div>
  );
};

export default ProductDetailPage;
