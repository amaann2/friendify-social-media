import React from "react";
import { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import logo from "../../assests/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { TailSpin } from "react-loader-spinner";
import { signUpUser } from "../../Redux/User/userAction";

const SignUp = () => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.user);
  const inputRef = useRef(null)
  const navigate = useNavigate();

  const [formInput, setFormInput] = useState({
    name: "",
    email: "",
    username: "",
    password: "",
  });
  const [avatar, setAvatar] = useState('')
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput({
      ...formInput,
      [name]: value,
    });
  };
  const handleClick = () => {
    inputRef.current.click()
  }
  const handleImageChange = (event) => {
    setAvatar(event.target.files[0])
  }
  const onSuccess = () => {
    navigate("/");
    setFormInput({
      name: "",
      email: "",
      username: "",
      password: "",
    });
    setAvatar('')
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    let formData = new FormData()

    const { name, email, username, password } = formInput;

    formData.append("name", name);
    formData.append("email", email);
    formData.append("username", username);
    formData.append("password", password);
    formData.append("avatar", avatar);

    dispatch(signUpUser(formData, onSuccess));


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
          <li >

            {
              avatar ?
                <img onClick={handleClick} src={URL.createObjectURL(avatar)} className="form-avatar" alt="" />
                :
                <img onClick={handleClick} src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png" className="form-avatar" alt="" />
            }
          </li>
          <li>
            {/* <label htmlFor="avatar">
              <span className="label">
                Profile image
              </span>
            </label> */}
            <input type="file" name="avatar" id="avatar" ref={inputRef} style={{ display: 'none' }} onChange={handleImageChange} />
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
