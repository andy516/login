import React from "react";
import ReactDOM from "react-dom";
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";

import App from "./app";
import Login from "./Auth/Login";
import Register from "./Auth/Register";
import "./styles.css";
// import "bulma/css/bulma.css";

const root = (
  <div>
    <Provider store={store}>
      <Router>
        <Switch>
          <Route exact path="/" component={App} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
        </Switch>
      </Router>
    </Provider>
  </div>
);

const rootElement = document.getElementById("root");
ReactDOM.render(root, rootElement);
