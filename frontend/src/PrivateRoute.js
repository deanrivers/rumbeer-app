import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { AuthContext } from "./Auth";

const PrivateRoute = ({ component: RouteComponent, ...rest }) => {
  const {currentUser} = useContext(AuthContext);
  // console.log('Current User ->',currentUser.pc)

  // if(currentUser){
  //   console.log('UID',currentUser["uid"])
  // }

  // for(const property in currentUser){
  //   console.log(property)
  // }

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