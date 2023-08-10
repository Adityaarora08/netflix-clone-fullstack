import React, { useState } from "react";
import classes from "./Loginscreen.module.css";
import img1 from "../assets/pngwing.com (1).png";
import Signup from "./Signin";
function Loginscreen() {
  const [signin, setSignin] = useState(false);
  const signUpHandler = () => {
    setSignin(true);
  };
  return (
    <div className={classes.loginScreen}>
      <div className={classes.loginScreen__background}>
        <img className={classes.loginScreen__logo} src={img1} alt="" />
        <button className={classes.loginScreen__button} onClick={signUpHandler}>
          Sign-in
        </button>
      </div>
      <div className={classes.loginScreen__gradient} />
      <div className={classes.loginScreen__body}>
        {signin ? (
          <Signup />
        ) : (
          <>
            <h1>Unlimited films, TV programmes and more.</h1>
            <h2>Watch anywhere. Cancel at any time.</h2>
            <h3>
              Ready to watch? Enter your email to create or restart your
              membership.
            </h3>
            <div className={classes.loginScreen__input}>
              <form>
                <input type="email" placeholder="Email Address" />
                <button
                  className={classes.loginScreen__getStarted}
                  onClick={signUpHandler}
                >
                  GET STARTED
                </button>
              </form> 
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Loginscreen;
