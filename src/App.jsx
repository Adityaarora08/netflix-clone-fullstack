import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Homescreen from "./components/Homescreen";
import Loginscreen from "./components/Loginscreen";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { auth } from "./components/firebasefile";
import { login, logout } from "./features/userSlice";
import { selectUser } from "./features/userSlice";
import Profile from "./components/Profile";
function App() {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((userAuth) => {
      if (userAuth) {
        dispatch(
          login({
            uid: userAuth.uid,
            email: userAuth.email,
          })
        );
      } else {
        dispatch(logout());
      }
    });
    return unsubscribe;
  }, [dispatch]);
  const router = createBrowserRouter([
    {
      path: "/",
      element: !user ? <Loginscreen /> : <Homescreen />,
    },
    {
      path: "/profile",
      element: <Profile />,
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
