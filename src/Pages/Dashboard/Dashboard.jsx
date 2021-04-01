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
    <Container className="wrapper">
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
          <img src={data?.avatar} alt="User" className="dash-avatar" />
          <h1 className="dash-heading">
            Hello <wbr /> {data?.name}
          </h1>
          <TeamCheck data={data} />
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
