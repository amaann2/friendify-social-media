import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TailSpin } from "react-loader-spinner";
import { resetUserPassword } from "../../Redux/User/userAction";
import { useNavigate, useParams } from "react-router-dom";

const ResetPassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { token } = useParams();
  const { loading } = useSelector((state) => state.forgotPassword);

  const [formInput, setFormInput] = useState({
    password: "",
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
      password: "",
    });
    navigate("/login");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(resetUserPassword(token, formInput, sucess));
  };

  return (
    <>
      <div className="form">
        <form onSubmit={handleSubmit}>
          <ul>
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

export default ResetPassword;
