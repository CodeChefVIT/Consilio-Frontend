import React, { useEffect } from "react";
import { useHistory } from "react-router";

const GoogleOAuth = (props) => {
  const history = useHistory();

  useEffect(() => {
    const query = new URLSearchParams(props.location.search);
    const token = query.get("token");

    localStorage.setItem("authToken", token);
    history.replace("/app/dashboard");
  }, []);
  return <div></div>;
};

export default GoogleOAuth;
