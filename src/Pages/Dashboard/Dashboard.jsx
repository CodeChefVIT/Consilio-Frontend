import { Paper, Button, Typography, Grid } from "@material-ui/core";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Title from "../../Components/Title/Title";
import url from "../../utils/constants";
import "./Dashboard.css";

function Dashboard() {
  const token = localStorage.getItem("authToken");
  const [data, setData] = useState();
  useEffect(() => {
    axios
      .get(`${url}/user/getProfile`, {
        headers: { authorization: `Bearer ${token}` },
      })
      .then((res) => {
        console.log(res.data);
        setData(res.data.user);
      })
      .catch((err) => console.log(err));
  }, [token]);

  return (
    <Grid container justify="center" className="wrapper">
      <Title>DASHBOARD</Title>
      <Paper variant="outlined" elevation={3} square className="content">
        <Grid container spacing={2}>
          <Grid item xs={12} sm={4} md={3}>
            <img
              src={data?.avatar}
              alt="User"
              style={{
                borderRadius: "50%",
                border: "2px solid var(--primary)",
              }}
            />
          </Grid>
          <Grid item xs={12} sm={8} md={9} style={{ textAlign: "left" }}>
            <Typography variant="h6">Hello {data?.name}</Typography>
            <Typography variant="body">{data?.email}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Link to="/team">
              <Button variant="contained" color="primary">
                {data?.team.length === 0
                  ? "Join or Create a Team"
                  : `Team ${data?.team[0].name}`}
              </Button>
            </Link>
          </Grid>
        </Grid>
      </Paper>
    </Grid>
  );
}

export default Dashboard;
