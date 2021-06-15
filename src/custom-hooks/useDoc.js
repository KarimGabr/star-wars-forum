import { useState, useEffect } from "react";
import { getDocAPI } from "../api/mock/server";
import { useToastContext } from "../context/useToastContext";

export default function useDoc({ path = "", formHandler = null }) {
  const { addToasts } = useToastContext();

  const [doc, setDoc] = useState(null);
  const [isDeleted, setIsDeleted] = useState(false);

  const updateDoc = (res) => {
    setDoc(res.data);
  };

  const deleteDoc = () => {
    setDoc(null);
    setIsDeleted(true);
  };

  useEffect(() => {
    if (path && formHandler.state.selected_object?.id) {
      getDocAPI(path, formHandler.state.selected_object.id)
        .then((res) => {
          setDoc(res.data);
          setIsDeleted(false);
        })
        .catch((error) => {
          addToasts([
            {
              severity: "error",
              detail: error,
            },
          ]);
        });
    }
  }, [path, formHandler.state.selected_object?.id]);

  useEffect(() => {
    if (formHandler.state.selected_object) {
      setDoc({ ...doc, ...formHandler.state.selected_object });
      setIsDeleted(false);
    }
  }, [formHandler.state.refreshVar]);

  // reset documentHandler on clear selection
  useEffect(() => {
    if (!formHandler.state.selected_object) {
      setDoc(null);
      setIsDeleted(false);
    }
  }, [formHandler.state.selected_object]);

  const document = {
    doc,
    updateDoc,
    deleteDoc,
    isDeleted,
  };

  return document;
}
