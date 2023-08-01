import React, { useState } from "react";
import "../Style/Header.css";
import logo from "../assests/logo.png";
import { AiOutlinePlusSquare } from "react-icons/ai";
const Header = () => {
  const [isDropdownVisible, setDropdownVisible] = useState(false);

  return (
    <>
      <div className="navigation">
        <div className="logo">
          <img src={logo} alt="" />
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
          <AiOutlinePlusSquare />
        </div>
      </div>
    </>
  );
};

export default Header;
