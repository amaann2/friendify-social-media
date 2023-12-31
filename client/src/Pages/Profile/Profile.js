import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import "./profile.css";
import { useDispatch, useSelector } from "react-redux";
import { getUserProfile } from "../../Redux/User/userAction";
const Profile = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { profile } = useSelector((state) => state.profile);

  useEffect(() => {
    dispatch(getUserProfile(id));
  }, [dispatch, id]);

  return (
    <>
      <header>
        <div className="container">
          <div className="profile">
            <div className="profile-image">
              <img src={profile?.avatar?.url} alt="" />
            </div>
            <div className="profile-user-settings">
              <h1 className="profile-user-name">{profile?.username}</h1>

              <button className="btn profile-edit-btn">follow</button>

              <button
                className="btn profile-settings-btn"
                aria-label="profile settings"
              >
                <i className="fas fa-cog" aria-hidden="true" />
              </button>
            </div>
            <div className="profile-stats">
              <ul>
                <li>
                  <span className="profile-stat-count">
                    {profile?.posts?.length}
                  </span>{" "}
                  posts
                </li>
                <li>
                  <span className="profile-stat-count">
                    {profile?.followers?.length}
                  </span>{" "}
                  followers
                </li>
                <li>
                  <span className="profile-stat-count">
                    {" "}
                    {profile?.following?.length}
                  </span>{" "}
                  following
                </li>
              </ul>
            </div>
            <div className="profile-bio">
              <p>
                <span className="profile-real-name">Jane Doe</span> Lorem ipsum
                dolor sit, amet consectetur adipisicing elit 📷✈️🏕️
              </p>
            </div>
          </div>
          {/* End of profile section */}
        </div>
        {/* End of container */}
      </header>
      <hr />
      <main>
        <div className="container">
          <div className="gallery">
            {profile?.posts?.map((post) => (
              <div className="gallery-item">
                <img
                  src={`${post?.media?.url}`}
                  className="gallery-image"
                  alt=""
                />
                <div className="gallery-item-info">
                  <ul>
                    <li className="gallery-item-likes">
                      <span className="visually-hidden">Likes:</span>
                      <i className="fas fa-heart" aria-hidden="true" />{" "}
                      {post?.likes?.length}
                    </li>
                    <li className="gallery-item-comments">
                      <span className="visually-hidden">Comments:</span>
                      <i className="fas fa-comment" aria-hidden="true" />{" "}
                      {post?.comments?.length}
                    </li>
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* End of gallery */}
        {/* End of container */}
      </main>
    </>
  );
};

export default Profile;
