import React, { useState } from "react";
import Header from "../components/Header";
import { useSelector, useDispatch } from 'react-redux';
import { saveShippingAddress } from "../redux/actions/CartActions";
import { useNavigate } from "react-router-dom";

const ShippingScreen = ({history}) => {
  window.scrollTo(0, 0);
  const navigate = useNavigate()

  const cart = useSelector((state) => state.cart)
  const { shippingAddress = {} } = cart
  const { address: initialAddress = "", city: initialCity = "", postalCode: initialPostalCode = "", country: initialCountry = "" } = shippingAddress

  const [address, setAddress] = useState(initialAddress)
  const [city, setCity] = useState(initialCity)
  const [postalCode, setPostalCode] = useState(initialPostalCode)
  const [country, setCountry] = useState(initialCountry)

  const dispatch = useDispatch()

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(saveShippingAddress({address,city,postalCode,country}))
    navigate('/payment');
  };
  return (
    <>
      <Header />
      <div className="container d-flex justify-content-center align-items-center login-center">
        <form
          className="Login col-md-8 col-lg-4 col-11"
          onSubmit={submitHandler}
        >
          <h6>DELIVERY ADDRESS</h6>
          <input type="text" placeholder="Enter address" 
            value={address} 
            required
            onChange={(e) => setAddress(e.target.value)}
          />
          <input type="text" placeholder="Enter city" 
            value={city} 
            required
            onChange={(e) => setCity(e.target.value)}
          />
          <input type="text" placeholder="Enter postal code" 
            value={postalCode} 
            required
            onChange={(e) => setPostalCode(e.target.value)}
          />
          <input type="text" placeholder="Enter country" 
            value={country} 
            required
            onChange={(e) => setCountry(e.target.value)}
          />
          <button type="submit">
            Continue
          </button>
        </form>
      </div>
    </>
  );
};

export default ShippingScreen;
