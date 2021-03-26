import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Dashboard from "./Pages/Dashboard/Dashboard";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Dashboard}></Route>
      </Switch>
    </Router>
  );
}

export default App;
