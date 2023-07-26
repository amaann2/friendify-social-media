import "./App.css";
import { useEffect } from "react";
import { loadUser } from "./Redux/User/userAction";
import Login from "./Pages/Login";
import store from "./Redux/store";
import SignUp from "./Pages/SignUp";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Home from "./Pages/Home";
import { useSelector } from "react-redux";
import Header from "./Components/Header";
function App() {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);
  const { isAuthentication } = useSelector((state) => state.user);
  return (
    <>
      {isAuthentication ? <Header /> : <Login />}
      <Routes>
        <Route
          exact
          path="/"
          element={isAuthentication ? <Home /> : <Login />}
        />
        <Route
          path="/login"
          element={isAuthentication ? <Home /> : <Login />}
        />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
      <ToastContainer />
    </>
  );
}

export default App;
