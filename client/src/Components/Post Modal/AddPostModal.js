import React from "react";
import "./addpostmodal.css";
import post from "../../assests/post.png";
const AddPostModal = ({ closeModal, currentUser }) => {


  return (
    <div
      className="modal-container"
      onClick={(e) => {
        if (e.target.className === "modal-container") {
          closeModal();
        }
      }}
    >
      <div className="modal">
        <form >
          <div className="add-post">

            <div className="left">
              <img src={post} alt="" />

              <button className="form-btn">Upload media</button>
              <input type="file" name="" id="" />
            </div>
            <div className="right">
              <div className="right-profile">
                <div className="right-avatar">
                  <img src={currentUser?.avatar?.url} alt="" />
                </div>
                {/* <div className="right-name">
                  {currentUser?.username}
                </div> */}
                <div className="right-btn">
                  <button>share</button>
                </div>
              </div>
              <div className="inputs">
                <ul>
                  <li>
                    <label htmlFor="caption">
                      <span className="label">
                        caption
                      </span>
                    </label>
                    <textarea name="" id="" cols="30" rows="10"></textarea>

                  </li>
                  <li>
                    <label htmlFor="caption">
                      <span className="label">
                        hashtags
                      </span>
                      <input type="text" />

                    </label>

                  </li>
                </ul>
              </div>

            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddPostModal;
