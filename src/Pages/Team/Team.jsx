import {
  Avatar,
  CircularProgress,
  Container,
  Grid,
  Hidden,
} from "@material-ui/core";
import { Done, FilterNone } from "@material-ui/icons";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { useForm } from "react-hook-form";
import "./Team.css";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function Team({ data, refresh }) {
  const { handleSubmit, register } = useForm();
  const [joinTeam, setJoin] = useState(false);
  const [createTeam, setCreate] = useState(false);
  const [alreadyJoined, setAlreadyJoined] = useState(false);
  const [joinCode, setJoinCode] = useState("");
  const [newTeamName, setNewTeamName] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [snack, setSnack] = useState(false);
  const [snackText, setSnackText] = useState("");

  // console.log(data);
  const handleJoinTeam = async () => {
    setLoading(true);
    const url = `${process.env.REACT_APP_BACKEND_URL}/team/join`;
    const token = localStorage.getItem("authToken");

    const data = {
      code: joinCode,
    };

    try {
      await axios
        .post(url, data, {
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
      if (error.response.status === 404) {
        setSnackText("Team Doesn't Exist");
        setSnack(true);
      } else if (error.response.status === 403) {
        setSnackText("Team Full");
        setSnack(true);
      } else if (error.response.status === 402) {
        setSnackText("Team Finalised");
        setSnack(true);
      }
    }

    setLoading(false);
  };

  const handleCreateTeam = async () => {
    setLoading(true);
    const url = `${process.env.REACT_APP_BACKEND_URL}/team/make`;
    const token = localStorage.getItem("authToken");

    const data = {
      name: newTeamName,
    };

    try {
      await axios
        .post(url, data, {
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
      if (error.response.status === 405) {
        setSnackText("Team Name Taken");
        setSnack(true);
      }
    }

    setLoading(false);
  };

  const handleLeave = async () => {
    setLoading(true);
    const url = `${process.env.REACT_APP_BACKEND_URL}/team/leave`;
    const token = localStorage.getItem("authToken");

    try {
      await axios
        .post(
          url,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((res) => {
          console.log(res);
          refresh();
        });
    } catch (error) {
      console.log(error);
      if (error.response.status === 402) {
        setSnackText("Team is Finalised");
        setSnack(true);
      }
    }

    setLoading(false);
  };

  const handleCopy = () => {
    navigator.clipboard
      .writeText(data.teams.code)
      .then(() => {
        setCopied(true);
        setTimeout(() => {
          setCopied(false);
        }, 3000);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    if (data.message && data.message === "Not in a team") {
      setAlreadyJoined(false);
    } else {
      setAlreadyJoined(true);
    }
  }, [data]);

  return (
    <Container className="wrapper">
      <Grid container justify="center" style={{ height: "100%" }} spacing={3}>
        {alreadyJoined ? (
          <Grid
            item
            xs={12}
            sm={6}
            // justify="center"
            justify="center"
            style={{ display: "flex", flexDirection: "column" }}
          >
            <h2 className="team-heading team-name-head">
              Team {data.teams.name}:
            </h2>

            <div className="team-members-div">
              {data.teams.users.map((user, i) => (
                <div className="member-div">
                  <Avatar
                    alt={user.name}
                    variant="circle"
                    src={user.avatar}
                    className={`member-avatar avatar-${i}`}
                  />
                  <div className="member-info-div">
                    <h2>{user.name}</h2>
                    <h3>{user.email}</h3>
                  </div>
                </div>
              ))}
            </div>
          </Grid>
        ) : (
          <Hidden xsDown>
            <Grid
              item
              xs={12}
              sm={6}
              // justify="center"
              alignItems="center"
              style={{ display: "flex" }}
            >
              <img
                src="/assets/teams.svg"
                alt="team"
                className="landing-image team-image"
              />
            </Grid>
          </Hidden>
        )}

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
          {!alreadyJoined ? (
            <div className="team-btn-div">
              {/************ For joining a team **************/}
              {joinTeam ? (
                <form
                  className="join-container"
                  onSubmit={handleSubmit(handleJoinTeam)}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      flexDirection: "column",
                      alignItems: "center",
                      width: "100%",
                    }}
                  >
                    <div className="input-container">
                      <input
                        type="text"
                        // value={joinCode}
                        className="team-input"
                        defaultValue={joinCode}
                        placeholder="enter team code"
                        onChange={(e) =>
                          setJoinCode(e.target.value.toUpperCase())
                        }
                        ref={register({
                          required: true,
                          minLength: 5,
                          maxLength: 5,
                        })}
                        maxLength={5}
                        minLength={5}
                        name="joinCode"
                      />
                    </div>
                    <p>
                      The team code is a 5 letter unique code shared by the
                      leader
                    </p>
                  </div>
                  <div className="action-btn-container">
                    <button
                      className="primary-button"
                      // onClick={handleSubmit(handleJoinTeam)}
                      type="submit"
                    >
                      {loading ? (
                        <CircularProgress color="secondary" size={24} />
                      ) : (
                        "Join"
                      )}
                    </button>
                    <button
                      className="secondary-button"
                      onClick={() => setJoin(false)}
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              ) : createTeam ? (
                <form
                  className="join-container"
                  onSubmit={handleSubmit(handleCreateTeam)}
                >
                  <div className="input-container">
                    <input
                      type="text"
                      // value={joinCode}
                      className="team-input"
                      defaultValue={newTeamName}
                      placeholder="enter team name"
                      onChange={(e) => setNewTeamName(e.target.value)}
                      ref={register({ required: true })}
                      name="newTeamName"
                      maxLength="30"
                    />
                  </div>

                  <div className="action-btn-container">
                    <button
                      className="primary-button"
                      // onClick={handleSubmit(submit)}
                      type="submit"
                    >
                      {loading ? (
                        <CircularProgress color="secondary" size={24} />
                      ) : (
                        "Create"
                      )}
                    </button>
                    <button
                      className="secondary-button"
                      onClick={() => setCreate(false)}
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              ) : (
                <>
                  <button
                    className="primary-button"
                    onClick={() => setJoin(true)}
                  >
                    Join a team
                  </button>
                  <button
                    className="primary-button"
                    onClick={() => setCreate(true)}
                  >
                    Create a team
                  </button>
                </>
              )}
            </div>
          ) : data.teams.finalised === false ? (
            <div className="already-joined-div">
              <h3>
                You are a part of team{" "}
                <span style={{ color: "#2CC8EB" }}>{data.teams.name}</span>
              </h3>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "100%",
                  flexDirection: "column",
                }}
              >
                <div className="input-container">
                  <input
                    type="text"
                    value={data.teams.code}
                    className="team-input"
                    readOnly
                    // defaultValue={newTeamName}
                  />
                </div>
                <p>
                  Share this code with your teammate to add them to the team
                </p>
              </div>
              <div className="action-btn-container">
                <button className="primary-button" onClick={handleCopy}>
                  {copied ? (
                    <>
                      <Done style={{ marginRight: "10px" }} /> Copied!
                    </>
                  ) : (
                    <>
                      <FilterNone style={{ marginRight: "10px" }} /> Copy Code
                    </>
                  )}
                </button>
                <button className="secondary-button" onClick={handleLeave}>
                  {loading ? (
                    <CircularProgress color="primary" size={24} />
                  ) : (
                    "Leave Team"
                  )}
                </button>
              </div>
            </div>
          ) : (
            <></>
          )}
        </Grid>
      </Grid>
      <Snackbar
        open={snack}
        autoHideDuration={6000}
        onClose={() => setSnack(false)}
      >
        <Alert onClose={() => setSnack(false)} severity="error">
          {snackText}
        </Alert>
      </Snackbar>
    </Container>
  );
}

export default Team;
