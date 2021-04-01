import { Container, Grid } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import "./Team.css";

function Team({ data }) {
  const [joinTeam, setJoin] = useState(false);
  const [createTeam, setCreate] = useState(false);
  const [alreadyJoined, setAlreadyJoined] = useState(false);

  useEffect(() => {
    if (data.message && data.message === "Not in a team") {
      setAlreadyJoined(false);
    } else {
      setAlreadyJoined(true);
    }
  }, [data]);

  return (
    <Container className="wrapper">
      <Grid container justify="center" style={{ height: "100%" }}>
        <Grid
          item
          xs={12}
          sm={6}
          style={{
            display: "flex",
            justifyContent: "center",
            // alignItems: "center",
            flexDirection: "column",
          }}
          className="team-content"
        >
          <h1 className="team-heading">The more the merrier</h1>
          <h3 className="team-subhead">
            Your teammates understand you better than anyone!
          </h3>
          <div className="team-btn-div">
            <button className="primary-button">Join a team</button>
            <button className="primary-button">Create a team</button>
          </div>
        </Grid>
        <Grid item xs={12} sm={6}></Grid>
      </Grid>
    </Container>
  );
}

export default Team;
