import { Paper, Button, Grid } from "@material-ui/core";
import React from "react";
import Title from "../../Components/Title/Title";

function Team() {
  return (
    <Grid container justify="center" className="wrapper">
      <Title>TEAM</Title>
      <Paper variant="outlined" elevation={3} square className="content">
        <Grid container spacing={2}>
          Team Fool Stack
          <Grid item xs={12}>
            <Button variant="outlined" color="primary">
              Join a Team
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Button variant="outlined" color="secondary">
              Create a Team
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Grid>
  );
}

export default Team;
