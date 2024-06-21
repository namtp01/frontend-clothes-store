import React from 'react'
import "./App.css"
import "./responsive.css"
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import HomeScreen from './screens/HomeScreen';
import SingleProduct from './screens/SingleProduct';
import CartScreen from './screens/CartScreen';
import Login from './screens/Login';
import Register from './screens/Register';
import PrivateRouter from './PrivateRouter';
import ProfileScreen from './screens/ProfileScreen';
import ShippingScreen from './screens/ShippingScreen';
import PaymentScreen from './screens/PaymentScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import OrderScreen from './screens/OrderScreen';
import ForgotPasswordScreen from './screens/ForgotPasswordScreen';
import ResetPasswordScreen from './screens/ResetPasswordScreen';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/search/:keyword/page/:pageNumber/" element={<HomeScreen />} />
        <Route path="/search/:keyword" element={<HomeScreen />} />
        <Route path="/page/:pagenumber" element={<HomeScreen />} />
        <Route path="/category/:category" element={<HomeScreen />} />
        <Route path="/" element={<HomeScreen />} />
        <Route path="/products/:id" element={<SingleProduct />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/forgot-password' element={<ForgotPasswordScreen />} />
        <Route path='/reset-password/:token' element={<ResetPasswordScreen />} />
        <Route path="/profile" element={<PrivateRouter><ProfileScreen /></PrivateRouter>} />
        <Route path="/cart/:id?" element={<CartScreen />} />
        <Route path="/shipping" element={<PrivateRouter><ShippingScreen /></PrivateRouter>} />
        <Route path="/payment" element={<PrivateRouter><PaymentScreen /></PrivateRouter>} />
        <Route path="/placeorder" element={<PrivateRouter><PlaceOrderScreen /></PrivateRouter>} />
        <Route path="/order/:id" element={<PrivateRouter><OrderScreen /></PrivateRouter>} />
      </Routes>
    </Router>
  )
}

export default App