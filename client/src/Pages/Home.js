import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../Redux/User/userAction";
const Home = () => {
  const dispatch = useDispatch();
  const { currentUser, isAuthentication, loading, error } = useSelector(
    (state) => state.user
  );
  const logout = () => {
    dispatch(logoutUser());
  };

  console.log("currentUser-----", currentUser);
  console.log("error-----", error);
  console.log("isauthentication---", isAuthentication);
  console.log("loading---", loading);
  return (
    <div>
      <button onClick={logout}>logout</button>
    </div>
  );
};

export default Home;
