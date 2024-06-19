import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import Header from "./../components/Header";
import { useSelector, useDispatch } from 'react-redux';
import { login, resetPassword } from "../redux/actions/UserActions";
import Message from "../components/LoadingError/Error";
import Loading from "../components/LoadingError/Loading";

const ResetPasswordScreen = () => {
  window.scrollTo(0, 0);
  const [password, setPassword] = useState("")

  const dispatch = useDispatch()
  //const redirect = location.search ? location.search.split("=")[1] : "/"

  let { token } = useParams()

//   const location = useLocation()
//   const navigate = useNavigate()

  // const redirect = location.search ? new URLSearchParams(location.search).get('redirect') : "/"
//   const redirect = location.state?.redirect || "/"

//   const userLogin = useSelector((state) => state.userLogin)
//   const { error, loading, userInfo } = userLogin

//   useEffect(() => {
//     if (userInfo) {
//       navigate(redirect)
//     }
//   },[userInfo, navigate, redirect])

  const submitHandler = (e) => {
    e.preventDefault()
    console.log(token)
    dispatch(resetPassword(password, token))
  }
  
  return (
    <>
      <Header />
      <div className="container d-flex flex-column justify-content-center align-items-center login-center">
        {/* {error && <Message variant="alert-danger">{error}</Message>}
        {loading && <Loading />} */}
        <form className="Login col-md-8 col-lg-4 col-11" onSubmit={submitHandler}>
          <input type="password" placeholder="Password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Submit</button>
        </form>
      </div>
    </>
  );
};

export default ResetPasswordScreen;
