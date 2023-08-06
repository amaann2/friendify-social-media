import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../Redux/User/userAction";
import Posts from "../Components/Posts";
import { getAllData } from "../Redux/Post/postSlice";
import InstagramPostLoader from "../Utils/InstagramPostLoader";
const Home = () => {
  const dispatch = useDispatch();
  const { post, loading } = useSelector((state) => state.post);

  const logout = () => {
    dispatch(logoutUser());
  };
  useEffect(() => {
    dispatch(getAllData());
  }, [dispatch]);
  return (
    <div className="post">
      {loading ? (
        <InstagramPostLoader />
      ) : (
        post &&
        post.map((ele) => <Posts key={ele._id} post={ele} loading={loading} />)
      )}
      <button onClick={logout}>logout</button>
    </div>
  );
};

export default Home;
