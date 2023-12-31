import "./App.css";
import { useEffect } from "react";
import { loadUser } from "./Redux/User/userAction";
import Login from "./Pages/UserAuth/Login";
import store from "./Redux/store";
import SignUp from "./Pages/UserAuth/SignUp";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Home from "./Pages/Home/Home";
import Profile from "./Pages/Profile/Profile";
import { useSelector } from "react-redux";
import Header from "./Components/Header/Header";
import ForgotPassword from "./Pages/UserAuth/ForgotPassword";
import ResetPassword from "./Pages/UserAuth/ResetPassword";
function App() {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);
  const { isAuthentication } = useSelector((state) => state.user);
  return (
    <>
      {!isAuthentication ? "" : <Header />}

      <Routes>
        <Route
          exact
          path="/"
          element={isAuthentication ? <Home /> : <Login />}
        />
        <Route
          exact
          path="/:id"
          element={isAuthentication ? <Profile /> : <Login />}
        />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/:id/:token" element={<ResetPassword />} />
      </Routes>
      <ToastContainer />
    </>
  );
}

export default App;
