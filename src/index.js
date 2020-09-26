/*!

=========================================================
* Material Dashboard React - v1.9.0
=========================================================

* Copyright 2020 Codingin (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/material-dashboard-react/blob/master/LICENSE.md)

* Coded by Codingin

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch, Redirect } from "react-router-dom";

// core components
import Admin from "layouts/Admin.js";
import Login from "views/Login/Login.js";
import { openDB } from "idb";

import "assets/css/material-dashboard-react.css?v=1.9.0";

const hist = createBrowserHistory();

ReactDOM.render(
  <Router history={hist}>
    <Switch>
      <Route path="/admin" component={Admin} />
      <Route path="/login" component={Login} />
      <Redirect from="/" to="/login" />
    </Switch>
  </Router>,
  document.getElementById("root")
);
