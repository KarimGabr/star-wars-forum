import { useState } from "react";

export default function useToast() {
  const [toasts, setToasts] = useState([]);

  const addToasts = (data) => {
    setToasts([...toasts, ...data]);
  };

  const resetToasts = () => {
    setToasts([]);
  };

  let Toaster = {
    toasts,
    addToasts,
    resetToasts,
  };

  return Toaster;
}
