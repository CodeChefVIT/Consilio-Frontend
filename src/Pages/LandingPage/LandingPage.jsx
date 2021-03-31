import { Grid } from "@material-ui/core";
import React from "react";
import "./LandingPage.css";

const LandingPage = () => {
  return (
    <div className="landing-page">
      <div>
        <Grid container spacing={0} style={{ height: "100vh" }}>
          <Grid item xs={12} sm={6} className="title-section">
            <h1 className="landing-welcome">Welcome to</h1>
            <h1 className="landing-title">Consolio 2021</h1>
            <div className="subtitle-section">
              <h1></h1>
            </div>
          </Grid>
          <Grid item xs={12} sm={6}></Grid>
        </Grid>
      </div>
    </div>
  );
};

export default LandingPage;
