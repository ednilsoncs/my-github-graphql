import React from "react";
import { HashRouter as Router, Route } from "react-router-dom";
import Login from "./screens/login";
import Dashboard from "./screens/dashboard";

export default function AppRoutes() {
  return (
    <Router>
      <Route path="/" exact component={Login} />
      <Route path="/dashboard" component={Dashboard} />
    </Router>
  );
}
