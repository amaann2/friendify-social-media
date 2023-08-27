import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TailSpin } from "react-loader-spinner";
import { forgotUserPassword } from "../../Redux/User/userAction";
const ForgotPassword = () => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.forgotPassword);
  console.log(loading);
  const [formInput, setFormInput] = useState({
    email: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput({
      ...formInput,
      [name]: value,
    });
  };

  const sucess = () => {
    setFormInput({
      email: "",
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(forgotUserPassword(formInput, sucess));
  };

  return (
    <>
      <div className="form">
        <form onSubmit={handleSubmit}>
          <ul>
            <li>
              <label htmlFor="username">
                <span className="label">
                  Email<span className="required-star">*</span>
                </span>
              </label>
              <input
                type="text"
                name="email"
                value={formInput.email}
                onChange={handleChange}
                placeholder="email"
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
                  "send"
                )}
              </button>
            </li>
          </ul>
        </form>
      </div>
    </>
  );
};

export default ForgotPassword;
