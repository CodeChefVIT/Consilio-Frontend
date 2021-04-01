import { CircularProgress, Container, Grid } from "@material-ui/core";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import "./Submission.css";

function Submission({ data, refresh }) {
  const { handleSubmit, register } = useForm();
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
    }
    if (data.teams.idea) setIdea(data.teams.idea);
    if (data.teams.submission) setLink(data.teams.submission);
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
          <h1 className="team-heading">Great Ideas are meant to happen</h1>
          {!alreadyJoined ? (
            <Link to="/app/dashboard">
              <button className="primary-button">Join/Create a team</button>
            </Link>
          ) : (
            <div>
              <h2>
                You are a part of team{" "}
                <span style={{ color: "#2CC8EB" }}>{data.teams.name}</span>
              </h2>
              {data.teams.users.map((user) => (
                <div
                  style={{
                    color: "#2CC8EB",
                    fontWeight: "600",
                    fontSize: "1.2rem",
                  }}
                >
                  {user.name}
                </div>
              ))}
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
                readOnly={data.teams.submitted ? true : false}
              />
              <input
                type="text"
                className="sub-input"
                defaultValue={link}
                placeholder="Submission Link"
                onChange={(e) => setLink(e.target.value)}
                ref={register({ required: true })}
                readOnly={data.teams.submitted ? true : false}
                name="idea"
              />
              {!data.teams.submitted ? (
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
                    onClick={() => Finalize()}
                  >
                    {loading2 ? (
                      <CircularProgress color="secondary" size={24} />
                    ) : (
                      "Submit"
                    )}
                  </button>
                </div>
              ) : (
                <></>
              )}
            </form>
          )}
        </Grid>
      </Grid>
    </Container>
  );
}

export default Submission;
