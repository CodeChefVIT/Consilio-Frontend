import { Grid, Container, TextField, Button } from "@material-ui/core";
import React, { useState, useEffect, useRef } from "react";
import CanvasDraw from "react-canvas-draw";
import { SliderPicker } from "react-color";
import "./Dashboard.css";

function Dashboard({ data }) {
  const [alreadyJoined, setAlreadyJoined] = useState(false);
  const [color, setColor] = useState("#000000");

  const canvas = useRef(null);

  useEffect(() => {
    if (data.team.length === 0) {
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
          className="dash-content"
        >
          <img src={data?.avatar} alt="User" className="dash-avatar" />
          <h1 className="dash-heading">
            Hello <wbr /> {data?.name}
          </h1>
          {alreadyJoined ? (
            <h3 className="dash-subhead">Team {data?.team.name}</h3>
          ) : (
            <></>
          )}
        </Grid>
        <Grid
          item
          container
          xs={12}
          sm={6}
          justify="center"
          direction="column"
          spacing={3}
        >
          <CanvasDraw
            ref={canvas}
            hideGrid
            hideInterface
            canvasWidth={
              window.innerWidth > 600
                ? window.innerWidth * 0.45
                : window.innerWidth * 0.95
            }
            brushColor={color}
            brushRadius={5}
          />
          <SliderPicker
            color={color}
            onChange={(color) => {
              setColor(color.hex);
            }}
          />
          <Button
            variant="outlined"
            color="primary"
            onClick={() => {
              canvas.current.clear();
            }}
          >
            Clear
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Dashboard;
