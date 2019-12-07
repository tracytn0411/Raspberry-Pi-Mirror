import React from "react";
import { Route, Redirect } from "react-router-dom";

function PrivateRoute ({component: Component, authenticated, ...rest}) {
  return (
    <Route
      {...rest}
      render={(props) => localStorage.getItem('jwt')
        ? <Component {...props} />
        : <Redirect to={{pathname: '/login', state: {from: props.location}}} />}
    />
  )
}

// const PrivateRoute = ({ component: Component, ...rest }) => (
//   <Route
//     {...rest}
//     render={props => {
//       localStorage.getItem("jwt") ? (
//         <Component {...props} />
//       ) : (
//         <Redirect
//           to={{ pathname: "/login", state: { from: props.location } }}
//         />
//       )
//     }}
//   />
// );

export default PrivateRoute;
