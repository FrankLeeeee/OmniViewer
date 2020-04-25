import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { createBrowserHistory as createHistory } from "history";
import HomePage from "./pages/homePage";
import ViewerPage from "./pages/viewerPage";
import ErrorPage from "./pages/errorPage";

const MyRouter = () => (
  <Router history={createHistory()}>
    <Switch>
      <Route exact path="/" component={HomePage} />
      <Route exact path="/view" component={ViewerPage} />
      <Route exact path="/error" component={ErrorPage} />
    </Switch>
  </Router>
);

export default MyRouter;
