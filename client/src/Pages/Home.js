import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../Redux/User/userAction";
import Posts from "../Components/Posts";
import { getAllData } from "../Redux/Post/postSlice";
const Home = () => {
  const dispatch = useDispatch();
  const { post } = useSelector((state) => state.post);

  const logout = () => {
    dispatch(logoutUser());
  };
  useEffect(() => {
    dispatch(getAllData());
  }, [dispatch]);
  return (
    <div>
      {post && post.map((ele) => <Posts key={ele._id} post={ele} />)}
      <button onClick={logout}>logout</button>
    </div>
  );
};

export default Home;
