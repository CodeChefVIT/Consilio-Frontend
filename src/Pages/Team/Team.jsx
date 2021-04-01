import { Container, Grid } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import "./Team.css";

function Team({ data }) {
  const { handleSubmit, register, errors } = useForm();
  const [joinTeam, setJoin] = useState(false);
  const [createTeam, setCreate] = useState(false);
  const [alreadyJoined, setAlreadyJoined] = useState(false);
  const [joinCode, setJoinCode] = useState("");

  const submit = () => {
    console.log(joinCode);
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
            Your teammates understand you better than anyone!{" "}
          </h3>
          {!alreadyJoined ? (
            <div className="team-btn-div">
              {joinTeam ? (
                <form
                  className="join-container"
                  onSubmit={handleSubmit(submit)}
                >
                  <div className="input-container">
                    <input
                      type="text"
                      // value={joinCode}
                      className="team-input"
                      placeholder="enter team code"
                      onChange={(e) => setJoinCode(e.target.value)}
                      ref={register({ required: true })}
                      name="joinCode"
                    />
                  </div>
                  <div style={{ width: "100%", textAlign: "center" }}>
                    <button
                      className="primary-button"
                      // onClick={handleSubmit(submit)}
                      type="submit"
                    >
                      Join
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
                <></>
              ) : (
                <>
                  <button
                    className="primary-button"
                    onClick={() => setJoin(true)}
                  >
                    Join a team
                  </button>
                  <button className="primary-button">Create a team</button>
                </>
              )}
            </div>
          ) : null}
        </Grid>
        <Grid item xs={12} sm={6}></Grid>
      </Grid>
    </Container>
  );
}

export default Team;
