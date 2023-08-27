import React, { useEffect, useState } from "react";
import "./modal.css";
import axios from "axios";
import { getTimeDifference } from "../../Utils/getTimeDifference";
const CommentModal = ({ closeModal, id }) => {
  const [comment, setComment] = useState(null);

  useEffect(() => {
    const getComment = async () => {
      try {
        const res = await axios.get(`/api/v1/comment/${id}`, {
          withCredentials: true,
        });
        console.log(res.data.data);
        setComment(res.data.data);
      } catch (error) {
        console.log(error.response.data.message);
      }
    };
    getComment();
  }, [id]);

  return (
    <div
      className="modal-container"
      onClick={(e) => {
        if (e.target.className === "modal-container") closeModal();
      }}
    >
      <div className="modal">
        {comment &&
          comment.map((c) => (
            <>
              <div className="comment-section">
                <div className="img">
                  <img src={c?.user?.avatar?.url} alt="" />
                </div>
                <div className="comment-body">
                  <span className="comment-name">{c?.user?.username}</span>{" "}
                  <br />
                  <span>{c.content}</span>
                  <br />
                  <div className="muted">
                    <span>{getTimeDifference(c?.createdAt)}</span>
                  </div>
                </div>
                <div className="comment-heart"></div>
              </div>
            </>
          ))}
        <div className="add-comment">
          <input type="text" placeholder="add your comment..." />
        </div>
      </div>
    </div>
  );
};

export default CommentModal;
