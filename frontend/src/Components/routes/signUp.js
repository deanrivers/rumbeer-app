import React, { useCallback } from "react";
import { withRouter } from "react-router";
import app from "../../base";

const SignUp = ({ history }) => {

  const handleSignUp = useCallback(async event => {
    event.preventDefault();
    const { email, password } = event.target.elements;
    console.log(email.value,password.value)


    //flask signup
    // let response = await fetch('/api/signup',{
    //   method: "POST",
    //   headers: {
    //     'Accept': 'application/json',
    //     'Content-Type': 'application/json'
    //   },

    //   //make sure to serialize your JSON body
    //   body: JSON.stringify({
    //     email: email.value,
    //     password: password.value
    //   })
    // })

    // let data = await response.json()
    // console.log('Data ->',data)

    // if(response.status==200){
    //     console.log('A response ->',response)

    //     //try and login with the credentials returned by flask
    //     try {
    //       await app
    //         .auth()
    //         .signInWithEmailAndPassword(email.value, password.value);
    //       history.push("/");
    //     } catch (error) {
    //       alert(error);
    //     }
    // }

    //firebase signup
    try {
      await app.auth().createUserWithEmailAndPassword(email.value, password.value);
      history.push("/");
    } catch (error) {
      alert(error);
    }

  }, [history]);

  return (
    <div className="signup-container">
      <h1>Sign up</h1>
      <form onSubmit={handleSignUp}>
        <label>
          Email
          <input name="email" type="email" placeholder="Email" />
        </label>
        <label>
          Password
          <input name="password" type="password" placeholder="Password" />
        </label>
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default withRouter(SignUp);