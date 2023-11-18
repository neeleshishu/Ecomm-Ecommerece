import { addToCart } from '../store/actions';
import { useDispatch } from 'react-redux';

function ProductDetail({product}) {

  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(addToCart(product));
    console.log(addToCart(product));
    alert(`${product.title} successfully added into cart`);
  };

  return (
    <div className="container mx-auto mt-4 p-9">
      
      {product ? (
        <div className="mt-4">
          <div className="flex">
            <div className="w-1/2">
              <img
                src={product.images[0]}
                alt={product.title}
                className="detail_image"
              />
            </div>
            <div className="w-1/2 px-4">
              <h2 className="text-2xl font-semibold">{product.title}</h2>
              <p className=" text-black text-lg mt-2">Price: ${product.price}</p>
              <p className="text-gray-800 mt-4">{product.description}</p>
              <button
                 onClick={handleAddToCart}
                className="text-white bg-black px-4 py-2 my-2"
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className='lds-dual-ring text-center mt-10'></div>
      )}
    </div>
  );
}

export default ProductDetail;
