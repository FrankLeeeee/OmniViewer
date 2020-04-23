import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import HomePage from "./pages/homePage";
import ViewerPage from "./pages/viewerPage";

const MyRouter = () => (
  <Router>
    <Switch>
      <Route exact path="/" component={HomePage} />
      <Route exact path="/view" component={ViewerPage} />
    </Switch>
  </Router>
);

export default MyRouter;
