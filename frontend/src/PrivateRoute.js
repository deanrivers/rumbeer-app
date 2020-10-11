import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { AuthContext } from "./Auth";

const PrivateRoute = ({ component: RouteComponent, ...rest }) => {
  const {currentUser} = useContext(AuthContext);
  console.log('Current User ->',currentUser)

  // console.log('Route rest=>',rest)




  return (
    <Route
      {...rest}

      

      render={routeProps =>
        !!currentUser ? (
          <RouteComponent {...routeProps} />
        ) : (
          <Redirect to={"/login"} />
          // <Redirect to={"/home"} />
        )
      }
    />
  );
};


export default PrivateRoute