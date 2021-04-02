import { Grid, Container, Button } from "@material-ui/core";
import React, { useState, useEffect, useRef } from "react";
import CanvasDraw from "react-canvas-draw";
import { SliderPicker } from "react-color";
import TeamCheck from "../../Components/TeamCheck/TeamCheck";
import "./Dashboard.css";

function Dashboard({ data }) {
  const [color, setColor] = useState("#000000");

  const canvas = useRef(null);

  useEffect(() => {
    const canvasRef = canvas.current;
    const loadData = localStorage.getItem("drawing");
    if (loadData) {
      canvasRef.loadSaveData(loadData);
    }

    return () => {
      const drawing = canvasRef.getSaveData();

      localStorage.setItem("drawing", drawing);
    };
  }, []);

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
            flexDirection: "column",
          }}
          className="dash-content"
        >
          <div className="img-name-container">
            <img src={data?.avatar} alt="User" className="dash-avatar" />
            <h1 className="dash-heading">
              Hello, <wbr /> {data?.name}!
            </h1>
          </div>
          <TeamCheck data={data} />
          <div className="drawing-info-container">
            <div className="drawing-info-div">
              <h2>Draw and win!</h2>
              <ul>
                <li>
                  Draw something which dazzles us on the given whiteboard!
                </li>
                <li>
                  Take a screenshot of your drawing, and post it on any social
                  media handle tagging{" "}
                  <a
                    href="https://linktr.ee/codechefvit"
                    target="_blank"
                    rel="nofollow noreferrer"
                  >
                    <strong style={{ color: "black" }}>@codechefvit</strong>
                  </a>
                </li>
                <li>
                  <strong>
                    The team with the best drawing will receive swags and
                    goodies!
                  </strong>
                </li>
                <li>Get your artistic caps on, and paint a masterpiece!</li>
              </ul>
            </div>
          </div>
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
                : window.innerWidth * 0.9
            }
            brushColor={color}
            brushRadius={5}
            lazyRadius={0}
            style={{ borderRadius: 12 }}
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
            style={{
              marginBottom: "25px",
            }}
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
