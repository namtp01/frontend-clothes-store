import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "./../components/Header";
import { useSelector, useDispatch } from 'react-redux';
import { forgotPasswordToken } from "../redux/actions/UserActions";
import Message from "../components/LoadingError/Error";
import Loading from "../components/LoadingError/Loading";

const ForgotPasswordScreen = () => {
  window.scrollTo(0, 0);
  const [email, setEmail] = useState("")

  const dispatch = useDispatch()
  //const redirect = location.search ? location.search.split("=")[1] : "/"


//   const location = useLocation()
//   const navigate = useNavigate()

  // const redirect = location.search ? new URLSearchParams(location.search).get('redirect') : "/"
  // const redirect = location.state?.redirect || "/"

//   const userLogin = useSelector((state) => state.userLogin)
//   const { error, loading, userInfo } = userLogin

//   useEffect(() => {
//     if (userInfo) {
//       navigate(redirect)
//     }
//   },[userInfo, navigate, redirect])

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(forgotPasswordToken(email))
  }
  
  return (
    <>
      <Header />
      <div className="container d-flex flex-column justify-content-center align-items-center login-center">
        {/* {error && <Message variant="alert-danger">{error}</Message>}
        {loading && <Loading />} */}
        <form className="Login col-md-8 col-lg-4 col-11" onSubmit={submitHandler}>
          <input type="email" placeholder="Email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button type="submit">Send</button>
        </form>
      </div>
    </>
  );
};

export default ForgotPasswordScreen;
