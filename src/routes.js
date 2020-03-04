import React from "react";
import { HashRouter as Router, Route } from "react-router-dom";
import Dashboard from "./screens/dashboard";

export default function AppRoutes() {
  return (
    <Router>
      <Route path="/" component={Dashboard} />
    </Router>
  );
}
