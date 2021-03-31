import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { createMuiTheme, ThemeProvider } from "@material-ui/core";
import LandingPage from "./Pages/LandingPage/LandingPage";
import GoogleOAuth from "./Pages/GoogleOAuth/GoogleOAuth";
import AppMain from "./Pages/App/AppMain";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#2CC8EB",
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
          <Route exact path="/auth" component={GoogleOAuth}></Route>
          <Route path="/app" component={AppMain}></Route>
        </Switch>
      </Router>
    </ThemeProvider>
  );
}

export default App;
