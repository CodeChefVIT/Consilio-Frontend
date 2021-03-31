import React, { useEffect } from "react";
import { Route, Switch, useHistory } from "react-router";
import Team from "../Team/Team";
import Navbar from "../../Components/Navbar/Navbar";
import Dashboard from "../Dashboard/Dashboard";

const AppMain = () => {
  const history = useHistory();

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      history.replace("/");
    }
  }, []);

  return (
    <>
      <Navbar />
      <Switch>
        <Route exact path="/app/dashboard" component={Dashboard}></Route>
        <Route exact path="/app/team" component={Team}></Route>
      </Switch>
    </>
  );
};

export default AppMain;
