import React from "react";
import ReactDOM from "react-dom";
import { Router } from "react-router";
import { createBrowserHistory } from "history";
import App from "./App";

import "./styles/styles.scss";
// import "./styles/app-background.scss";
import "primereact/resources/themes/saga-orange/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

const history = createBrowserHistory({
  basename: "/",
});

ReactDOM.render(
  <Router history={history} style={{ width: "100%" }}>
    <App />
  </Router>,
  document.getElementById("root")
);
