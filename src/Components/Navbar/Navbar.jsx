import {
  AppBar,
  Button,
  Toolbar,
} from "@material-ui/core";
import React from "react";
import { Link } from "react-router-dom";

function Navbar(props) {
  return (
    <AppBar position="static" color="secondary">
      <Toolbar variant="dense">
        <Link to="/dashboard"><Button color="inherit">Dashboard</Button></Link>
        <Link to="/team"><Button color="inherit">Team</Button></Link>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;