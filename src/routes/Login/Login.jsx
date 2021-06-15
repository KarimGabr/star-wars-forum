import { Fragment } from "react";

import "./Login.scss";

import { useAuthContext } from "../../context/useAuthContext";

import username_icon from "../../assets/images/username-icon.svg";
import password_icon from "../../assets/images/password-icon.svg";

export default function Login() {
  return (
    <div className="login">
      <div className="login-header">
        <div className="big">Star</div>
        <div className="small">The Force Equilibrium</div>
        <div className="big" style={{ marginTop: "-80px" }}>
          Wars
        </div>
      </div>
      <div className="login-dialog-container">
        <LoginForm />
      </div>
    </div>
  );
}

function LoginForm() {
  const { state, loginCredentials, handleChange, handleSubmit } =
    useAuthContext();

  const { errors, isSubmitting } = state;

  const LOGIN_FORM = [
    { name: "username", type: "text", img: username_icon },
    { name: "password", type: "password", img: password_icon },
  ];

  return (
    <Fragment>
      <div className="login-title">Login</div>
      <form
        style={{ marginTop: "1.5rem" }}
        onSubmit={handleSubmit}
        autoComplete="off"
      >
        {LOGIN_FORM.map((input, index) => (
          <div className="form-group" key={index}>
            <div className="input-group">
              <span className="input-group-addon">
                <img
                  className="input-addon-icon"
                  src={input.img}
                  alt={`${input.name}_ico`}
                />
              </span>
              <input
                type={input.type}
                id={input.name}
                name={input.name}
                value={loginCredentials[input.name]}
                onChange={(e) => {
                  handleChange(input.name, e.target.value);
                }}
                onFocus={(event) => {
                  event.target.setAttribute("autoComplete", "off");
                }}
                className={
                  errors.required?.hasOwnProperty(input.name)
                    ? "form-control error-input"
                    : "form-control"
                }
              />
              {errors.required?.hasOwnProperty(input.name) && (
                <i
                  className="pi pi-exclamation-circle mt-4 ml-3"
                  style={{ color: "#b43434", fontSize: "1.5rem" }}
                />
              )}
            </div>
          </div>
        ))}
        <div className="submit-btn-container">
          <button
            className="btn btn-outline-warning btn-login"
            type="submit"
            disabled={isSubmitting}
          >
            Login
          </button>
        </div>
      </form>
    </Fragment>
  );
}
