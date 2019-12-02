import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Display from "./Display";
import HomePage from "./HomePage";

const Router = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={HomePage} />
      <Route path="/display" component={Display} />
    </Switch>
  </BrowserRouter>
);

export default Router;
