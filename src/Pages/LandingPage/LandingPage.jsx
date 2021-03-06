import { Container, Grid, Hidden } from "@material-ui/core";
import React, { useEffect } from "react";
import "./LandingPage.css";
import "./GoogleBtn.css";
import axios from "axios";
import { useHistory } from "react-router";

const LandingPage = () => {
  const history = useHistory();
  const handleButton = async () => {
    const url = `${process.env.REACT_APP_BACKEND_URL}/auth/getUrl`;
    try {
      await axios.get(url).then((res) => {
        // console.log(res);
        window.location.href = res.data.data;
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    let token = localStorage.getItem("authToken");
    if (token && token !== "") {
      history.replace("/app/dashboard");
    }
  }, []);

  return (
    <div className="landing-page">
      <div className="landing-nav">
        <div style={{ paddingLeft: 40 }}>
          <h1 style={{ margin: "none" }}>Consilio</h1>
        </div>
      </div>
      <div className="landing-content">
        <Container>
          <Grid container spacing={3}>
            <Grid
              item
              xs={12}
              sm={6}
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              <h1 className="login-head">Welcome to Consilio</h1>
              <h3 className="login-subhead">
                Welcome back! Please login to your account.
              </h3>
              <div className="btn-bar">
                <div className="google-link" onClick={handleButton}>
                  <div className="google-btn">
                    <div className="google-icon-wrapper">
                      <img
                        className="google-icon"
                        src="/assets/gbtn.svg"
                        alt="google"
                      />
                    </div>
                    <p className="btn-text">
                      <b>Sign in with Google</b>
                    </p>
                  </div>
                </div>
              </div>
            </Grid>
            <Hidden xsDown>
              <Grid
                item
                xs={12}
                sm={6}
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <img
                  src="/assets/design.svg"
                  alt="design"
                  className="landing-image"
                />
              </Grid>
            </Hidden>
          </Grid>
        </Container>
      </div>
    </div>
  );
};

export default LandingPage;
