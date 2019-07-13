import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import NavBar from "./NavBar";
import EntryForm from "./EntryForm";
import Progress from "./Progress";

class Dashboard extends Component {
  render() {
    console.log(this.props);
    return (
      <div>
        <NavBar />
        <div className="container justify-content-center align-items-center">
          <div className=" row align-items-center card-deck">
            <div className="col-4">
              <EntryForm />
            </div>
            <div className="col">
              <Progress />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Dashboard);
