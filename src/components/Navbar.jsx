import React, { useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import classes from "./Navbar.module.css";
import img1 from "../assets/pngwing.com (1).png";
function Navbar() {
  const [show, showHandler] = useState(false);
  const navigate = useNavigate();
  const transmitionNavBar = () => {
    if (window.scrollY > 100) {
      showHandler(true);
    } else {
      showHandler(false);
    }
  };
  useEffect(() => {
    window.addEventListener("scroll", transmitionNavBar);

    return () => {
      window.removeEventListener("scroll", transmitionNavBar);
    };
  }, []);
  return (
    <div className={classes.nav || (show && classes.nav__black)}>
      <div className={classes.nav__content}>
        <img className={classes.nav__logo} src={img1} onClick={()=>navigate('/')}/>
        <img
          onClick={() => navigate("/profile")}
          className={classes.nav__avtar}
          src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png"
        />
      </div>
    </div>
  );
}

export default Navbar;
