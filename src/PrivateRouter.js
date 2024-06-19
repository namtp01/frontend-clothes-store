import { Navigate } from 'react-router-dom';

function PrivateRouter({ children }) {
  const token = window.localStorage.getItem("userInfo")
  return token ? children : <Navigate to="/login" />
}

// import React from 'react'
// import { Route, useNavigate } from 'react-router-dom';

// function PrivateRouter ({component: Component, ...rest}) {
//   const navigate = useNavigate()
//   return (
//     <Route
//       { ...rest }
//       component={(props) => {
//         const token = window.localStorage.getItem("userInfo")
//         if (token) {
//             return <Component {...props} />
//         } else {
//             navigate("/login")
//             return null
//         }
//       }}
//     />
//   )
// }

export default PrivateRouter
