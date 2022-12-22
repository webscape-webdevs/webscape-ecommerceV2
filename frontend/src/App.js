import { Routes, Route, BrowserRouter } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSession } from "./slices/sessionSlice";
import { getUserData } from "./slices/userSlice";

import AdminRoutes from "./components/AdminComponents/AdminRoutes";
import UserRoutes from "./components/UserComponents/UserRoutes";

import Navbar from "./components/Navbar/Navbar";
import LandingPage from "./containers/LandingPage/LandingPage";
import LoginSignup from "./containers/LoginSignup/LoginSignup";
import Cart from "./containers/UserOptions/Cart/Cart";
import MyOrders from "./containers/UserOptions/MyOrders/MyOrders";
import Profile from "./containers/UserOptions/Profile/Profile";
import Dashboard from "./containers/Dashboard/Dashboard";

function App() {
  const dispatch = useDispatch();
  const { sessionUser } = useSelector((state) => state.sessionSlice);

  useEffect(() => {
    dispatch(getSession());
    if (sessionUser._id) {
      dispatch(getUserData());
    }
  }, [dispatch, sessionUser._id]);

  return (
    <BrowserRouter>
      {/* <Navbar /> */}
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/loginSignup" element={<LoginSignup />} />

        <Route element={<UserRoutes />}>
          <Route path="/cart" element={<Cart />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/myOrders" element={<MyOrders />} />
        </Route>

        <Route element={<AdminRoutes />}>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
