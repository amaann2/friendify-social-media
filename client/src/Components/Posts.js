import React from "react";
import "../Style/posts.css";
import { getTimeDifference } from "../Utils/getTimeDifference";
import { AiOutlineHeart } from "react-icons/ai";
import { FaRegComment, FaRegShareSquare } from "react-icons/fa";
import { BsBookmark } from "react-icons/bs";
import { Link } from "react-router-dom";
const Posts = ({ post }) => {
  const { content, media, user, likes, hashtags, comments, createdAt } = post;
  const { username, avatar, _id } = user;
  return (
    <div className="post">
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
      <div className="image">
        <img src={media} alt="" />
      </div>
      <div className="svgs">
        <AiOutlineHeart />
        <FaRegComment />
        <FaRegShareSquare />
        <BsBookmark />
      </div>
      <div className="content">
        <p className="content-like-count">{likes.length} likes</p>

        <div className="detail">
          <p>{content}</p>
        </div>
        {hashtags &&
          hashtags.map((hastag) => <span className="hashtags">{hastag}</span>)}
      </div>
      <div className="comments">
        <h4 className="comment">view all {comments.length} comments</h4>
        <div className="add-comment">
          <img src={avatar} alt="" />
          <input type="text" placeholder="add your comment..." />
        </div>
      </div>
    </div>
  );
};

export default Posts;
