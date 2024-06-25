import React, { useState } from "react";
import Header from "./../components/Header";
import { useDispatch, useSelector } from 'react-redux';
import { savePaymentMethod } from "../redux/actions/CartActions";
import { useNavigate } from "react-router-dom";

const PaymentScreen = ({history}) => {
  window.scrollTo(0, 0);
  const navigate = useNavigate()

  const cart = useSelector((state) => state.cart)
  const { shippingAddress } = cart

  if (!shippingAddress) {
    navigate("/shipping")
  }

  const [paymentMethod, setPaymentMethod] = useState("")

  const dispatch = useDispatch()

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(savePaymentMethod(paymentMethod))
    navigate("/placeorder")
  };

  return (
    <>
      <Header />
      <div className="container d-flex justify-content-center align-items-center login-center">
        <form
          className="Login2 col-md-8 col-lg-4 col-11"
          onSubmit={submitHandler}
        >
          <h6>SELECT PAYMENT METHOD</h6>
          <div className="payment-container">
            <div className="radio-container">
              <input className="form-check-input" type="radio" value="Paypal" checked={paymentMethod === "Paypal"}
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              <label className="form-check-label">PayPal or Credit Card</label>
            </div>
            <div className="radio-container">
              <input className="form-check-input" type="radio" value="Cash" checked={paymentMethod === "Cash"}
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              <label className="form-check-label">Cash on Delivery</label>
            </div>
          </div>

          <button type="submit">
            Continue
          </button>
        </form>
      </div>
    </>
  );
};

export default PaymentScreen;
