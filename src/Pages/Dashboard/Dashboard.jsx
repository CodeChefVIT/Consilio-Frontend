import { Paper, Button, Typography, TextField } from "@material-ui/core";
import React from "react";
import { useState } from "react";
import "./Dashboard.css";

function Title(props) {
  return <h1 className="title">{props.children}</h1>;
}

function Dashboard() {
  const name = localStorage.getItem("username");
  const [join, setJoin] = useState("");

  return (
    <div className="wrapper">
      <Title>DASHBOARD</Title>
      <Paper variant="outlined" elevation={3} square className="content">
        <Typography className="greet">Hello {name}</Typography>
        <div className={join}>
          <Button
            variant="contained"
            color="primary"
            className="join-team"
            onClick={() => setJoin("joining")}
          >
            Join a Team
          </Button>
          <TextField type="text" variant="filled" ></TextField>
        </div>
        <Button variant="contained" color="primary" className="create-team">
          Create a Team
        </Button>
      </Paper>
    </div>
  );
}

export default Dashboard;
