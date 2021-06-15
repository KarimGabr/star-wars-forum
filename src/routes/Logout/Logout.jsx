import { useEffect } from "react";
import "./Logout.scss";

import { useAuthContext } from "../../context/useAuthContext";
import { postAPI } from "../../api/mock/server";

export default function Logout() {
  const { dispatch } = useAuthContext();

  useEffect(() => {
    const time = setTimeout(
      () =>
        postAPI("logout").then(() => {
          dispatch({ type: "LOGOUT" });
        }),
      1000
    );
    return () => {
      clearTimeout(time);
    };
    // eslint-disable-next-line
  }, []);

  return (
    <div className="logout">
      <span className="fs-1">تم تسجيل الخروج</span>
    </div>
  );
}
