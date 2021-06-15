import { Route, Redirect, useLocation } from "react-router-dom";
import Logout from "../routes/Logout/Logout";

import { useAuthContext } from "../context/useAuthContext";

export default function PrivateRoute({ component: Component, ...rest }) {
  const { state } = useAuthContext();
  const { authUser } = state;
  const location = useLocation();

  return (
    <Route
      {...rest}
      render={(props) =>
        authUser ? (
          <Component {...props} />
        ) : !authUser ? (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: props.location },
            }}
          />
        ) : (
          authUser && location.pathname === "/logout" && <Logout {...props} />
        )
      }
    />
  );
}
