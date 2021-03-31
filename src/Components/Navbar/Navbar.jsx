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
      <h1>Consilio</h1>
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
        </div>
      </div>
    </div>
  );
}

export default Navbar;
