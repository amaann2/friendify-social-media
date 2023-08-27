import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../Redux/User/userAction";
import "./form.css";
import logo from "../../assests/logo.png";
import { TailSpin } from "react-loader-spinner";
import { Link, useNavigate } from "react-router-dom";
const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading } = useSelector((state) => state.user);
  const [formInput, setFormInput] = useState({
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
  const onSuccess = () => {
    navigate("/");
    setFormInput({
      username: "",
      password: "",
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser(formInput, onSuccess));
  };

  return (
    <>
      <div className="form">
        <form onSubmit={handleSubmit}>
          <ul>
            <li>
              <img src={logo} alt="" className="form-logo" />
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
              <button className="form-btn">
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
                  "login"
                )}
              </button>
            </li>
            <li>
              <p className="form-para">
                <Link to={'forgot-password'}>Forgot password ?</Link>{" "}
              </p>
              <p className="form-para">
                {" "}
                Don't have a account ? <Link to={"/signup"}>sign up</Link>{" "}
              </p>
            </li>
          </ul>
        </form>
      </div>
    </>
  );
};

export default Login;
