import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { createMuiTheme, ThemeProvider } from "@material-ui/core";
import LandingPage from "./Pages/LandingPage/LandingPage";
import AppRoutes from "./routes/AppRoutes";

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
        <Switch>
          <Route exact path="/" component={LandingPage}></Route>
          <Route path="/app" component={AppRoutes}></Route>
        </Switch>
      </Router>
    </ThemeProvider>
  );
}

export default App;
