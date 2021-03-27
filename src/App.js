import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Dashboard from "./Pages/Dashboard/Dashboard";
import { createMuiTheme, ThemeProvider } from "@material-ui/core";
import Navbar from "./Components/Navbar/Navbar";
import Team from "./Pages/Team/Team";
import auth from "./utils/auth";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#3a88f3",
      color: "#efefef",
    },
    secondary: {
      main: "#1958a1",
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Navbar />
        <Switch>
          <Route exact path="/auth" component={auth}></Route>
          <Route exact path="/dashboard" component={Dashboard}></Route>
          <Route exact path="/team" component={Team}></Route>
        </Switch>
      </Router>
    </ThemeProvider>
  );
}

export default App;
