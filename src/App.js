import { useEffect } from "react";
import { Route, Switch } from "react-router-dom";

// global components
import ToastsContainer from "./components/ToastsContainer";
import PrivateRoute from "./components/PrivateRoute";
import Header from "./components/Header";

// routes
import Login from "./routes/Login/Login";
import Logout from "./routes/Logout/Logout";
import Posts from "./routes/Posts/Posts";

//context
import { AuthContext } from "./context/useAuthContext";
import { ToastContext } from "./context/useToastContext";

// custom hooks
import useToast from "./custom-hooks/useToast";
import useAuth from "./custom-hooks/useAuth";

import setThemeColors from "./utils/setThemeColors";

export default function App() {
  const toaster = useToast();

  const authentication = useAuth(toaster);
  const { state } = authentication;
  const { authUser } = state;

  useEffect(() => {
    setThemeColors("dark");
  }, []);

  return (
    <ToastContext.Provider value={toaster}>
      <AuthContext.Provider value={authentication}>
        <ToastsContainer />
        <div className="App container-fluid">
          {authUser && <Header />}
          <Switch>
            <Route component={Login} path="/login" />
            <PrivateRoute component={Posts} exact path="/" />
            <PrivateRoute component={Logout} exact path="/logout" />
          </Switch>
        </div>
      </AuthContext.Provider>
    </ToastContext.Provider>
  );
}
