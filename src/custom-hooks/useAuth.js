import { useState, useEffect, useReducer } from "react";
import { useHistory } from "react-router-dom";
import formRequiredValidation from "../utils/formRequiredValidation";
import cookie from "js-cookie";
import { postAPI } from "../api/mock/server";

export default function useAuth(toaster) {
  const history = useHistory();

  const [loginCredentials, setLoginCredentials] = useState({
    username: "",
    password: "",
  });

  const initialState = {
    errors: {},
    isSubmitting: false,
    toasts: null,
    authUser: null,
    storageAccessed: false,
  };

  function reducer(state, action) {
    switch (action.type) {
      case "SUBMIT_FORM":
        return {
          ...state,
          errors: action.validate_fn,
          isSubmitting: true,
        };
      case "SUBMIT_OFF":
        toaster.addToasts([
          {
            severity: "error",
            detail: "Please fill required fields",
          },
        ]);
        return {
          ...state,
          isSubmitting: false,
        };
      case "UPDATE_USER_INFO":
        localStorage.setItem("user_profile", JSON.stringify(action.user_data));

        return {
          ...state,
          authUser: action.user_data,
        };
      case "AUTH_SUCCESS":
        let user_profile = { ...action.payload.user };

        cookie.set("token", action.payload.token);
        localStorage.setItem("user_profile", JSON.stringify(user_profile));

        return {
          ...state,
          isSubmitting: false,
          authUser: user_profile,
        };
      case "AUTH_FAILED":
        toaster.addToasts([
          {
            severity: "error",
            detail: action.error,
          },
        ]);
        return {
          ...state,
          errors: action.error,
          isSubmitting: false,
        };
      case "GET_USER_STORAGE":
        cookie.get("token");
        return {
          ...state,
          storageAccessed: true,
          authUser: JSON.parse(localStorage.getItem("user_profile")),
        };
      case "LOGOUT":
        cookie.remove("token");
        localStorage.removeItem("user_profile");
        return {
          ...state,
          authUser: null,
          storageAccessed: false,
        };
      default:
        return state;
    }
  }

  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    if (!state.storageAccessed) {
      dispatch({
        type: "GET_USER_STORAGE",
      });
    } else {
      if (state.authUser && cookie.get("token")) {
        history.push("/");
      } else {
        history.push("/login");
      }
    }
    // eslint-disable-next-line
  }, [state.storageAccessed, state.authUser]);

  useEffect(() => {
    if (state.isSubmitting) {
      if (Object.keys(state.errors).length === 0) {
        postAPI("login", loginCredentials)
          .then((res) => {
            dispatch({
              type: "AUTH_SUCCESS",
              payload: res.data,
            });
          })
          .catch((error) => {
            dispatch({
              type: "AUTH_FAILED",
              error:
                error.response && typeof error.response !== "undefined"
                  ? error.response.data && error.response.data.message
                    ? error.response.data.message
                    : "Connection Error"
                  : "Connection Error",
            });
          });
      } else {
        dispatch({
          type: "SUBMIT_OFF",
        });
      }
    }
    // eslint-disable-next-line
  }, [state.isSubmitting]);

  //handle form fields onChange
  const handleChange = (input_name, input_value) => {
    setLoginCredentials({ ...loginCredentials, [input_name]: input_value });
  };

  // login form front end validation
  const validateForm = () => {
    let errors = {};
    errors = {
      ...formRequiredValidation(loginCredentials, ["username", "password"]),
    };
    return errors;
  };

  // handle form onSubmit
  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch({
      type: "SUBMIT_FORM",
      validate_fn: validateForm(),
    });
  };

  const updateUserInfo = (userData) => {
    dispatch({
      type: "UPDATE_USER_INFO",
      user_data: userData,
    });
  };

  return {
    updateUserInfo,
    handleChange,
    handleSubmit,
    state,
    dispatch,
    loginCredentials,
  };
}
