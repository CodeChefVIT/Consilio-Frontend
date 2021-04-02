import { ButtonBase, Hidden } from "@material-ui/core";
import React, { useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import "./Navbar.css";

function Navbar(props) {
  const history = useHistory();

  useEffect(() => {
    console.log(history.location.pathname);
  }, [history.location]);
  return (
    <div className="landing-nav app-nav">
      <Hidden xsDown>
        <div style={{ paddingLeft: 40 }}>
          <h1 style={{ margin: "none" }}>Consilio</h1>
        </div>
      </Hidden>
      <div className="nav-tab-div">
        <div className="nav-tabs-container">
          <Link
            to="/app/team"
            className={`nav-tab ${
              history.location.pathname === "/app/team" ? "active" : null
            }`}
          >
            Team
          </Link>
          <Link
            to="/app/dashboard"
            className={`nav-tab ${
              history.location.pathname === "/app/dashboard" ? "active" : null
            }`}
          >
            Dashboard
          </Link>
          <Link
            to="/app/submission"
            className={`nav-tab ${
              history.location.pathname === "/app/submission" ? "active" : null
            }`}
          >
            Submission
          </Link>
          <ButtonBase
            className="nav-tab"
            onClick={() => {
              localStorage.clear();
              history.push("/");
            }}
          >
            Logout
          </ButtonBase>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
