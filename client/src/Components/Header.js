import React, { useState } from "react";
import "../Style/Header.css";
import logo from "../assests/logo.png";
import { AiOutlinePlusSquare, AiOutlineHeart } from "react-icons/ai";
import { GoHome } from "react-icons/go";
import { RxAvatar } from "react-icons/rx";
import { BsChatDots } from "react-icons/bs";
import { Link } from "react-router-dom";
import AddPostModal from "./AddPostModal";
const Header = () => {
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      {isModalOpen && <AddPostModal closeModal={() => setIsModalOpen(false)} />}
      <div className="navigation">
        <div className="logo">
          <Link to="/">
            <img src={logo} alt="" />
          </Link>
        </div>
        <div className="navigation-search-container">
          <input
            className="search-field"
            type="text"
            placeholder="Search"
            onFocus={() => setDropdownVisible(true)}
            onBlur={() => setDropdownVisible(false)}
          />
          {isDropdownVisible && (
            <div className="search-container">
              <div className="search-container-box">
                <div className="search-results">hello</div>
                <div className="search-results">hello</div>
                <div className="search-results">hello</div>
              </div>
            </div>
          )}
        </div>
        <div className="navigation-icons">
          <Link to="/">
            <GoHome />
          </Link>
          <BsChatDots />
          <AiOutlinePlusSquare onClick={() => setIsModalOpen(true)} />
          <AiOutlineHeart />
          <RxAvatar />
        </div>
      </div>
    </>
  );
};

export default Header;
