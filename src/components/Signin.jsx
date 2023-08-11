import React, { useRef, useState } from "react";
import classes from "./Signin.module.css";
import { auth } from "./firebasefile";
import { useNavigate } from "react-router-dom";

//sign in/ sign up page for creating new user or logging into existing user 
function Signin() {
  const name = useRef();
  const emailRef = useRef();
  const passRef = useRef();
  const navigate = useNavigate();
  const [signUp, setSignUp] = useState(false);

  const signInHandler = (event) => {
    event.preventDefault();
    auth
      .signInWithEmailAndPassword(emailRef.current.value, passRef.current.value)
      .then((authUser) => {
        console.log(authUser);
        navigate(0);
      })
      .catch((error) => {
        console.log("button clicked")
        alert(error.message);
      });
  };
  const register = (event) => {
    event.preventDefault();
    console.log(emailRef.current.value);
    auth
      .createUserWithEmailAndPassword(
        emailRef.current.value,
        passRef.current.value
      )
      .then((authUser) => {
        console.log(authUser);
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  return (
    <div className={classes.singinScreen}>
      {signUp?(
        <form>
        <h1>Sign Up</h1>
        <input ref={emailRef} placeholder="Email" type="email" />
        <input ref={passRef} placeholder="Create password" type="password" />
        <input ref={name} placeholder="Full Name" type="text" />
        <button onClick={register} type="submit">
          Sign Up
        </button>
        <h4>
          <span className={classes.singinScreen__gray}>Already on Netflix? </span>
          <span className={classes.singinScreen__link} onClick={()=>{
            setSignUp(false);
          }}>
            Sign In now.
          </span>
        </h4>
      </form>
       ):(
        <form>
        <h1>Sign In</h1>
        <input ref={emailRef} placeholder="Email" type="email" />
        <input ref={passRef} placeholder="Password" type="password" />
        <button onClick={signInHandler} type="submit">
          Sign In
        </button>
        <h4>
          <span className={classes.singinScreen__gray}>New to Netflix? </span>
          <span className={classes.singinScreen__link} onClick={()=>{
            setSignUp(true);
          }}>
            Sign Up now.
          </span>
        </h4>
      </form>
      )} 
    </div>
  );
}

export default Signin;
