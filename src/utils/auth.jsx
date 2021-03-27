import React, { useEffect } from "react";
import { useHistory, useLocation } from "react-router";

function Auth(props) {
  let query = new URLSearchParams(useLocation().search);
  let history = useHistory();
  useEffect(() => {
    let token = query.get("token");
    if (token !== undefined && token !== null) {
      localStorage.setItem("authToken", token);
      history.push("/dashboard");
    } else {
        history.push("/not")
    }
  });

  return <div>Logging In</div>;
}

export default Auth;
