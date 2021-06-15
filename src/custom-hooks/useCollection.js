import { useEffect, useReducer } from "react";
import { getCollectionAPI } from "../api/mock/server";
import { useToastContext } from "../context/useToastContext";

export default function useCollection({ path = "", paginationLimit = null }) {
  const { addToasts } = useToastContext();

  const initialState = {
    docs: [],
    totalRecords: 0,
    first: 0,
    last: paginationLimit,
    page: 1,
    error: {},
  };

  function reducer(state, action) {
    switch (action.type) {
      case "UPDATE_COLLECTION":
        return {
          ...state,
          docs: action.payload.data,
        };
      case "GET_TABLE_DATA_SUCCESS":
        return {
          ...state,
          totalRecords: action.response.total,
          docs: action.response.data,
          first: action.response.data
            ? action.response.data.length === 0
              ? -1
              : state.first > 0
              ? state.first
              : 0
            : 0,
          last: action.response.data
            ? action.response.data.length === 0
              ? -1
              : Math.min(
                  state.first + paginationLimit,
                  state.first + action.response.data.length
                )
            : 0,
        };
      case "GET_TABLE_DATA_FAIL":
        addToasts([
          {
            severity: "error",
            detail: action.error,
          },
        ]);
        return {
          ...state,
          error: action.error,
        };
      default:
        return state;
    }
  }

  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    if (path) {
      getCollectionAPI(path)
        .then((res) => {
          dispatch({
            type: "GET_TABLE_DATA_SUCCESS",
            response: res.data,
          });
        })
        .catch((error) => {
          dispatch({
            type: "GET_TABLE_DATA_FAIL",
            error:
              error.response && typeof error.response !== "undefined"
                ? error.response.data && error.response.data.message
                  ? error.response.data.message
                  : "connection_error"
                : "connection_error",
          });
        });
    }
    // eslint-disable-next-line
  }, [path, state.page]);

  const collection = {
    state,
    dispatch,
  };

  return collection;
}
