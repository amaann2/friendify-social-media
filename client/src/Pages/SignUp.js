import React from "react";
import { useState } from "react";
import "../Style/form.css";
import { useDispatch, useSelector } from "react-redux";
import logo from "../assests/logo.png";
import { Link } from "react-router-dom";
import { TailSpin } from "react-loader-spinner";
import { signUpUser } from "../Redux/User/userAction";

const SignUp = () => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.user);
  const [formInput, setFormInput] = useState({
    name: "",
    email: "",
    username: "",
    password: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput({
      ...formInput,
      [name]: value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(signUpUser(formInput));
    setFormInput({
      name: "",
      email: "",
      username: "",
      password: "",
    });
  };
  return (
    <div className="form">
      <form onSubmit={handleSubmit}>
        <ul>
          <li>
            <img src={logo} alt="" className="form-logo" />
          </li>
          <li>
            <label htmlFor="username">
              <span className="label">
                name<span className="required-star">*</span>
              </span>
            </label>
            <input
              type="text"
              name="name"
              value={formInput.name}
              onChange={handleChange}
              placeholder="name"
              required
            />
          </li>
          <li>
            <label htmlFor="username">
              <span className="label">
                email<span className="required-star">*</span>
              </span>
            </label>
            <input
              type="email"
              name="email"
              value={formInput.email}
              onChange={handleChange}
              placeholder="email"
              required
            />
          </li>
          <li>
            <label htmlFor="username">
              <span className="label">
                Username<span className="required-star">*</span>
              </span>
            </label>
            <input
              type="text"
              name="username"
              value={formInput.username}
              onChange={handleChange}
              placeholder="Username"
              required
            />
          </li>
          <li>
            <label htmlFor="password">
              <span className="label">
                password<span className="required-star">*</span>
              </span>
            </label>
            <input
              type="password"
              name="password"
              value={formInput.password}
              onChange={handleChange}
              placeholder="password"
              required
            />
          </li>
          <li>
            <button className="btn">
              {loading ? (
                <TailSpin
                  height="30"
                  width="30"
                  color="#ffffff"
                  ariaLabel="tail-spin-loading"
                  radius="1"
                  wrapperStyle={{}}
                  wrapperClass=""
                  visible={true}
                />
              ) : (
                "Sign Up"
              )}
            </button>
          </li>
          <li>
            <p className="form-para">
              Have an account ? <Link to={"/login"}>Log In</Link>{" "}
            </p>
          </li>
        </ul>
      </form>
    </div>
  );
};

export default SignUp;
