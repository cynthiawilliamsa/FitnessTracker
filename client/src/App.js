import React, {Component} from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Login from "./Login";
import SignUp from "./SignUp";
import NavBar from "./components/NavBar";
import Dashboard from "./components/Dashboard";
import "./App.css";

class App extends Component{
  state = {
    isAuthenticated: false,
  }

  
  render() {
    const {isAuthenticated} = this.state;
  return (
    <BrowserRouter>
      <div className="App">
        {isAuthenticated ? <NavBar/>: null}
        <Switch>
          <Route exact path="/" component={Login} />
          <Route exact path="/signup" component={SignUp} />
          <Route exact path="/dashboard" component={Dashboard} />
        </Switch>
      </div>
    </BrowserRouter>
  );
  }
}

export default App;
