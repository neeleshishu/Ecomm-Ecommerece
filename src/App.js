import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Home from './pages/Home';
import ProductDetailPage from './pages/ProductDetailPage';
import ShoppingCart from './components/ShoppingCart';
import "./App.css";
import Navbar from './components/Navbar';
import Login from './auth/Login';
import ProductListByCategory from './components/Categorywise';
import Category from './pages/Category';
import { Provider } from 'react-redux';
import store from './store/store';
import Loginuser from './auth/Loginuser';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  const [userType, setUserType] = useState(null);
  console.log(userType);

  return (
    <>
    <Provider store={store}>
    <ToastContainer />
      <Router>
      <Navbar userType={userType}/>
        <div>
          <Routes>
            <Route index path="/" element={<Home />} />
            <Route path="/product/:id" element={<PublicElement><ProductDetailPage/></PublicElement>} />
            <Route path="/category" element={<UserElement userType={userType}><Category/></UserElement>} />
            <Route path="/category/:id" element={<UserElement userType={userType}><ProductListByCategory/></UserElement>} />
            <Route path="/cart" element={<AdminElement userType={userType}><ShoppingCart/></AdminElement>} />
            <Route path="/login" element={<Loginuser setUserType={setUserType} />} />
          </Routes>
        </div>
      </Router>
      </Provider>
  </>
  );
}

const PublicElement = ({children}) => {
  return<>{children}</>
}

const UserElement = ({userType, children}) =>{
  if(userType === "user" || userType === "admin"){
    return<>{children}</>
  }else{
    return<div>You do not have access to this page</div>
  }
}

const AdminElement = ({userType, children}) =>{
  if(userType === "admin"){
    return<>{children}</>
  }else{
    return<div>You do not have access to this page</div>
  }
}

export default App;
