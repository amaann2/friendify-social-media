import React, { useState } from "react";
import "../Style/posts.css";
import { getTimeDifference } from "../Utils/getTimeDifference";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { FaRegComment, FaRegShareSquare } from "react-icons/fa";
import { BsBookmark } from "react-icons/bs";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import CommentModal from "./CommentModal";
const Posts = ({ post }) => {
  const { content, media, user, likes, hashtags, comments, createdAt } = post;
  const { username, avatar, _id } = user;
  const { currentUser } = useSelector((state) => state.user);
  const [liked, setLiked] = useState(likes.includes(currentUser._id));
  const [likeCount, setLikeCount] = useState(likes.length);
  const [commentModalOpen, setCommentModalOpen] = useState(false);
  console.log(media);
  const handleLikeUnlike = async () => {
    try {
      setLiked(!liked);
      const res = await axios.patch(`/api/v1/posts/likeUnlike/${post._id}`, {
        withCredentials: true,
      });
      if (res.data.status === "Success") {
        setLikeCount(liked ? likeCount - 1 : likeCount + 1);
      }
    } catch (error) {
      console.log(error.response.data.message);
    }
  };
  return (
    <>
      {commentModalOpen && (
        <CommentModal
          closeModal={() => setCommentModalOpen(false)}
          id={post._id}
        />
      )}
      <header>
        <div className="image">
          <img src={avatar} alt="" />
        </div>
        <div className="header-content">
          <h3 className="content-username">
            <Link to={`/${_id}`}>{username}</Link>{" "}
            <span>{getTimeDifference(createdAt)}</span>
          </h3>
        </div>
        <div className="logo" />
      </header>
      <div className="media">
        <img
          src={`/img/users/${media}`}
          alt=""
          onDoubleClick={handleLikeUnlike}
        />
      </div>
      <div className="svgs">
        {liked ? (
          <AiFillHeart onClick={handleLikeUnlike} />
        ) : (
          <AiOutlineHeart onClick={handleLikeUnlike} />
        )}
        <FaRegComment onClick={() => setCommentModalOpen(true)} />
        <FaRegShareSquare />
        <BsBookmark />
      </div>
      <div className="content">
        <p className="content-like-count">{likeCount} likes</p>

        <div className="detail">
          <p>{content}</p>
        </div>
        {hashtags &&
          hashtags.map((hastag) => <span className="hashtags">{hastag}</span>)}
      </div>
      <div className="comments">
        <h4 className="comment" onClick={() => setCommentModalOpen(true)}>
          view all {comments.length} comments
        </h4>
        <div className="add-comment">
          <img src={avatar} alt="" />
          <input type="text" placeholder="add your comment..." />
        </div>
      </div>
    </>
  );
};

export default Posts;
