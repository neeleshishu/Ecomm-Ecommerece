// Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import { logout } from '../auth/Auth';
import { useSelector } from 'react-redux';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { selectTotalQuantity } from '../store/cartSelectors';

const Navbar = ({ userType }) => {

  const totalQuantity = useSelector(selectTotalQuantity);
  console.log(userType);

  const handlelogout = async() =>{
    await logout();
  }

  return (
    <nav className=" bg-slate-100 p-4">
      <div className="container mx-auto flex justify-between items-center">
       
      <Link to='/'>
        <div className="text-white text-xl font-bold">
          <span className=" text-gray-600">Ecomm</span>
        </div>
        </Link>

       
        <ul className="flex space-x-6 text-gray-900 gap-7">
        {(userType === "user" || userType === "admin") ? <>
        <li>
            <Link to="/category" className="hover:text-gray-400">Category</Link>
          </li>
        </>: null}
        {(userType === "admin") ? <>
        <li>
            <Link to="/cart" className="hover:text-gray-400">

            <ShoppingCartIcon/>
            <span className="ml-1 text-red-600">{totalQuantity}</span>
            </Link>
          </li>
        </> : null }
          
          <li>
          <Link onClick={handlelogout} to="/login" className="hover:text-gray-400">Logout</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;

