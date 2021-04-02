import {
  Button,
  CircularProgress,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  Typography,
} from "@material-ui/core";
import { Done } from "@material-ui/icons";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import "./Submission.css";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function Submission({ data, refresh }) {
  const { handleSubmit, register } = useForm();
  const [open, setOpen] = useState(false);
  const [snack, setSnack] = useState(false);
  const [alreadyJoined, setAlreadyJoined] = useState(false);
  const [idea, setIdea] = useState("");
  const [link, setLink] = useState("");
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);

  // console.log(data);
  const handleEdit = async () => {
    setLoading(true);
    const url = `${process.env.REACT_APP_BACKEND_URL}/team/update?teamId=${data.teams._id}`;
    const token = localStorage.getItem("authToken");
    var patt = new RegExp(
      `https?://(www.)?[-a-zA-Z0-9@:%._+~#=]{1,256}.[a-zA-Z0-9()]{1,6}b([-a-zA-Z0-9()@:%_+.~#?&//=]*)`
    );
    var res = patt.test(link);
    if (idea === "" || !res) {
      setLoading(false);
      setSnack(true);
      return;
    }
    const Data = {
      idea: idea,
      submission: link,
    };

    try {
      await axios
        .patch(url, Data, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          console.log(res);
          refresh();
        });
    } catch (error) {
      console.log(error);
    }

    setLoading(false);
  };

  const Finalize = async () => {
    setLoading2(true);
    const url = `${process.env.REACT_APP_BACKEND_URL}/team/update?teamId=${data.teams._id}`;
    const token = localStorage.getItem("authToken");
    var patt = new RegExp(
      `https?://(www.)?[-a-zA-Z0-9@:%._+~#=]{1,256}.[a-zA-Z0-9()]{1,6}b([-a-zA-Z0-9()@:%_+.~#?&//=]*)`
    );
    var res = patt.test(link);
    if (idea === "" || !res) {
      setSnack(true);
      setLoading2(false);
      return;
    }
    const Data = {
      submitted: true,
      idea: idea,
      submission: link,
    };

    try {
      await axios
        .patch(url, Data, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          console.log(res);
          refresh();
        });
    } catch (error) {
      console.log(error);
    }

    setLoading2(false);
  };

  useEffect(() => {
    if (data.message && data.message === "Not in a team") {
      setAlreadyJoined(false);
    } else {
      setAlreadyJoined(true);
      if (data.teams.idea) setIdea(data.teams.idea);
      if (data.teams.submission) setLink(data.teams.submission);
    }
  }, [data]);

  return (
    <Container className="wrapper" style={{ height: "100%" }}>
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
          <h1 className="team-heading">Great Ideas are meant to happen</h1>
          {!alreadyJoined ? (
            <Link to="/app/team">
              <button className="primary-button">Join/Create a team</button>
            </Link>
          ) : (
            <div>
              <h2>
                You are a part of team{" "}
                <span style={{ color: "#2CC8EB" }}>{data.teams.name}</span>
              </h2>
            </div>
          )}
        </Grid>
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
          {!alreadyJoined ? (
            <img
              src="/assets/design.svg"
              alt="design"
              className="landing-image"
            />
          ) : (
            <form
              className="join-container"
              onSubmit={handleSubmit(handleEdit)}
            >
              <textarea
                type="text"
                rows={10}
                className="sub-input"
                defaultValue={idea}
                placeholder="Describe your Idea"
                onChange={(e) => setIdea(e.target.value)}
                ref={register({ required: true })}
                name="idea"
                required
                maxLength={500}
                readOnly={data.teams.submitted ? true : false}
              />
              <Typography
                variant="caption"
                style={{ width: "100%", textAlign: "right", paddingRight: '15%', marginBottom: 15, marginTop: -10 }}
              >
                Max 500 characters
              </Typography>
              <input
                type="url"
                className="sub-input"
                defaultValue={link}
                placeholder="Submission Link"
                onChange={(e) => setLink(e.target.value)}
                ref={register({ required: true })}
                readOnly={data.teams.submitted ? true : false}
                name="idea"
              />
              {!data.teams.submitted ? (
                <>
                  <div className="action-btn-container">
                    <button className="primary-button" type="submit">
                      {loading ? (
                        <CircularProgress color="secondary" size={24} />
                      ) : (
                        "Save"
                      )}
                    </button>
                    <button
                      className="secondary-button"
                      onClick={() => setOpen(true)}
                    >
                      {loading2 ? (
                        <CircularProgress color="secondary" size={24} />
                      ) : (
                        "Submit"
                      )}
                    </button>
                  </div>
                  <h3 style={{ textAlign: "center" }}>
                    Once Submitted, you will not be able to change your
                    submission
                  </h3>
                </>
              ) : (
                <div className="action-btn-container submitted">
                  <div className="done-icon">
                    <Done style={{ fontSize: 32, fontWeight: 900 }} />
                  </div>
                  <p>
                    <strong>Your design was successfully submitted!</strong>
                  </p>
                </div>
              )}
            </form>
          )}
        </Grid>
      </Grid>
      <Dialog
        open={open}
        keepMounted
        onClose={() => setOpen(false)}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">
          {"Are you sure?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Are you sure you want to move ahead, you won't be able to change it
            later.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={() => Finalize()} color="primary">
            Continue
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        open={snack}
        autoHideDuration={6000}
        onClose={() => setSnack(false)}
      >
        <Alert onClose={() => setSnack(false)} severity="error">
          Please fill the fields correctly
        </Alert>
      </Snackbar>
    </Container>
  );
}

export default Submission;
