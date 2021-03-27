import {
  Paper,
  Button,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  TextField,
  DialogActions,
  Typography,
} from "@material-ui/core";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Title from "../../Components/Title/Title";
import url from "../../utils/constants";

function Team() {
  const token = localStorage.getItem("authToken");
  const [jointeam, setJoin] = useState(false);
  useEffect(() => {
    axios
      .get(`${url}/team/user`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [token]);
  return (
    <Grid container justify="center" className="wrapper">
      <Title>TEAM</Title>
      <Paper variant="outlined" elevation={3} square className="content">
        <Grid container spacing={2}>
          <Typography variant="h5" style={{ margin: "auto" }}>
            You are not in a team yet
          </Typography>
          <Grid item xs={12}>
            <Button
              variant="outlined"
              color="primary"
              onClick={() => {
                setJoin(true);
              }}
            >
              Join a Team
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" color="secondary">
              Create a Team
            </Button>
          </Grid>
        </Grid>
      </Paper>
      <Dialog
        open={jointeam}
        onClose={() => {
          setJoin(false);
        }}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Join a Team</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To join a team, enter team code. If you don't have a team yet, hop
            on to our discord server.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Team Code"
            type="text"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setJoin(false);
            }}
            color="primary"
          >
            Cancel
          </Button>
          <Button onClick={() => {}} color="primary">
            Join
          </Button>
        </DialogActions>
      </Dialog>
    </Grid>
  );
}

export default Team;
