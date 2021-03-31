import React from "react";
import { Route, Switch } from "react-router";
import Navbar from "../Components/Navbar/Navbar";
import Dashboard from "../Pages/Dashboard/Dashboard";
import Team from "../Pages/Team/Team";

const AppRoutes = () => {
  return (
    <>
      <Navbar />
      <Switch>
        <Route exact path="/dashboard" component={Dashboard}></Route>
        <Route exact path="/team" component={Team}></Route>
      </Switch>
    </>
  );
};

export default AppRoutes;
