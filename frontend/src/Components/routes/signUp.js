import React, { useCallback } from "react";
import { withRouter } from "react-router";
import app from "../../base";

const SignUp = ({ history }) => {

  const handleSignUp = useCallback(async event => {
    event.preventDefault();
    const { email, password } = event.target.elements;
    console.log(email,password)


    let response = await fetch('/api/signup',{
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },

      //make sure to serialize your JSON body
      body: JSON.stringify({
        email: email,
        password: password
      })
      // body:{
      //   email:email,
      //   password:password
      // }
    })

    let data = await response.json()
    console.log(data)



    // if(response.status==200){
    //     console.log('A response',response)
    //     // history.push("/");
    //   }


    // try {
    //   await app
    //     .auth()
    //     .createUserWithEmailAndPassword(email.value, password.value);
    //   history.push("/");
    // } catch (error) {
    //   alert(error);
    // }
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