import { useState, useEffect, useReducer } from "react";
import { useToastContext } from "../context/useToastContext";

import { postAPI, putAPI } from "../api/mock/server";
import { id } from "date-fns/locale";

export default function useAatroxForm({
  form_schema,
  validate_fn,
  api_path,
  show_toast_success,
  toast_success_message,
  collectionHandler,
}) {
  const [formValues, setFormValues] = useState(form_schema);
  const { addToasts } = useToastContext();

  const initialState = {
    errors: {},
    isSubmitting: false,
    toasts: null,
    api_method: null,
    selected_object: null,
    create_modal_state: false,
    container_view_state: "list",
    refreshVar: 0,
  };

  function reducer(state, action) {
    switch (action.type) {
      case "SET_SELECTED_OBJECT":
        setFormValues(action.selected_object);
        return {
          ...state,
          api_method: "PUT",
          selected_object: action.selected_object,
          container_view_state: "item",
          errors: {},
        };
      case "CLEAR_SELECTED_OBJECT":
        setFormValues(form_schema);
        return {
          ...state,
          api_method: null,
          selected_object: null,
          container_view_state: "list",
          errors: {},
        };
      case "SET_FORM_OBJECT":
        setFormValues(action.form_object);
        return {
          ...state,
          selected_object: state.selected_object ? action.form_object : null,
          errors: {},
        };
      case "CREATE_NEW":
        setFormValues(form_schema);
        return {
          ...state,
          api_method: "POST",
          create_modal_state: true,
          errors: {},
        };
      case "TOGGLE_EDIT":
        return {
          ...state,
          create_modal_state: true,
        };
      case "CLEAR_FORM_OBJECT":
        setFormValues(form_schema);
        return {
          ...state,
          api_method: state.selected_object ? "PUT" : null,
          selected_object: state.selected_object ? state.selected_object : null,
          create_modal_state: false,
          errors: {},
        };
      case "SUBMIT_FORM":
        return {
          ...state,
          errors: action.validate_fn,
          isSubmitting: true,
        };
      case "SUBMIT_OFF":
        let error_detail = "";
        if (Object.keys(state.errors).length > 0) {
          if (Object.keys(state.errors.required).length > 0) {
            error_detail = "Fill Required Fields";
          } else {
            error_detail = state.errors[Object.keys(state.errors)[0]];
          }
        }
        addToasts([{ severity: "error", detail: error_detail }]);
        return {
          ...state,
          isSubmitting: false,
        };
      case "POST_SUCCESS":
        show_toast_success &&
          addToasts([
            {
              severity: "success",
              detail: toast_success_message
                ? toast_success_message
                : action.payload.message
                ? action.payload.message
                : "Data Saved Successfully",
            },
          ]);
        !state.selected_object && setFormValues(form_schema);
        collectionHandler &&
          collectionHandler.dispatch({
            type: "UPDATE_COLLECTION",
            payload: action.payload.data,
          });
        return {
          ...state,
          isSubmitting: false,
          api_method: state.api_method === "PUT" ? "PUT" : null,
          selected_object: state.selected_object ? state.selected_object : null,
          create_modal_state: false,
          refreshVar: state.refreshVar + 1,
        };
      case "POST_FAILED":
        addToasts([
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
      default:
        return state;
    }
  }

  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    if (state.isSubmitting) {
      if (Object.keys(state.errors).length === 0 || state.errors.length === 0) {
        if (state.api_method === "POST") {
          postAPI(api_path, formValues)
            .then((res) => {
              dispatch({
                type: "POST_SUCCESS",
                payload: res,
              });
            })
            .catch((error) => {
              dispatch({
                type: "POST_FAILED",
                error:
                  error.response && typeof error.response !== "undefined"
                    ? error.response.data && error.response.data.message
                      ? error.response.data.message
                      : "Connection Error"
                    : "Connection Error",
              });
            });
        } else if (state.api_method === "PUT") {
          putAPI(api_path, { docID: id, params: formValues })
            .then((res) => {
              dispatch({
                type: "POST_SUCCESS",
                payload: res,
              });
            })
            .catch((error) => {
              dispatch({
                type: "POST_FAILED",
                error:
                  error.response && typeof error.response !== "undefined"
                    ? error.response.data && error.response.data.message
                      ? error.response.data.message
                      : "Connection Error"
                    : "Connection Error",
              });
            });
        }
      } else {
        dispatch({
          type: "SUBMIT_OFF",
        });
      }
    }
    // eslint-disable-next-line
  }, [state.isSubmitting]);

  // handle form onSubmit
  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch({
      type: "SUBMIT_FORM",
      validate_fn: validate_fn(formValues),
    });
  };

  //handle form field onChange
  const handleChange = (prop_path, value) => {
    let _values = { ...formValues };
    let _values_ = _values;

    var x = prop_path.split(".");

    // get the target prop value
    var last = x.pop();

    // dive deep down to the target prop
    x.forEach((p) => (_values = _values[p]));

    // assign target prop value
    _values[last] = value;

    dispatch({ type: "SET_FORM_OBJECT", form_object: _values_ });
  };

  // handling reset all form fields
  function resetForm() {
    dispatch({
      type: "SET_FORM_OBJECT",
      form_object: form_schema,
    });
  }

  let AatroxForm = {
    handleSubmit,
    handleChange,
    resetForm,
    formValues,
    state,
    dispatch,
  };

  return AatroxForm;
}
