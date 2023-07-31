import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../Redux/User/userAction";
import Posts from "../Components/Posts";
import { getAllData } from "../Redux/Post/postSlice";
const Home = () => {
  const dispatch = useDispatch();
  // const { currentUser, isAuthentication, loading, error } = useSelector(
  //   (state) => state.user
  // );
  const { post, loading } = useSelector((state) => state.post);
  const logout = () => {
    dispatch(logoutUser());
  };
  useEffect(() => {
    dispatch(getAllData());
  }, [dispatch]);

  // console.log("currentUser-----", currentUser);
  // console.log("error-----", error);
  // console.log("isauthentication---", isAuthentication);
  // console.log("loading---", loading);
  return (
    <div>
      {post && post.map((ele) => <Posts key={ele._id} post={ele} />)}
      <button onClick={logout}>logout</button>
    </div>
  );
};

export default Home;
