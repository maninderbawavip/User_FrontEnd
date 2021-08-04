import Register from "./Register";
import Home from "./Home";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";


function App() {
  return (
    <>
    <Router>
      <Switch>
      <Route exact path="/register" component={Register} />
      <Route exact path="/" component={Home} />
      </Switch>
    </Router>
    </>
  );
}

export default App;
