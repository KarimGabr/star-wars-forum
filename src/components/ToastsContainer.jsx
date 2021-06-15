// severity : success || info || warn || error || info
// { severity: "info", summary: "Message 3", detail: "PrimeFaces rocks" , sticky:false , life:3000},

import { useEffect, useRef } from "react";
import { useToastContext } from "../context/useToastContext";
import { Toast } from "primereact/toast";

export default function ToastsContainer() {
  const { resetToasts, toasts } = useToastContext();

  let toast = useRef(null);

  useEffect(() => {
    if (toasts && toasts.length > 0) {
      let toastQueue = [];
      toasts.forEach((toast) => {
        toastQueue.push({ ...toast });
      });
      toast.current.show(toastQueue);
      resetToasts();
    }
    // eslint-disable-next-line
  }, [toasts]);

  return <Toast position="bottom-right" baseZIndex={99999} ref={toast} />;
}
