import React from "react";
import Navbar from "./Navbar";
import classes from "./Profile.module.css";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";
import { auth } from "./firebasefile";
import { useNavigate } from "react-router-dom";
import PlansScreen from "./PlansScreen";
import { login, logout } from "../features/userSlice";

function Profile() {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const navigate = useNavigate();
  const signOut = () => {
    dispatch(logout());
    navigate("/");
  };
  return (
    <div className={classes.profileScreen}>
      <Navbar />
      <div className={classes.profileScreen__body}>
        <h2>Edit Profile</h2>
        <div className={classes.profileScreen__info}>
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png"
            alt=""
          />
          <div className={classes.profileScreen__detials}>
            <h2>{user?.email}</h2>
            <div className={classes.profileScreen__plans}>
              <h3>Popular Plans</h3>
              <PlansScreen />
              <button
                onClick={signOut}
                className={classes.profileScreen__signOut}
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
