import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import NavBar from "./NavBar";
import EntryForm from "./EntryForm";
import Progress from "./Progress";
import axios from "axios";

class Dashboard extends Component {
  state={
    name: "",
  }
  componentDidMount() {
    //@GET
    //@desc Retreives authenticated user's name and email.
    axios('/api/auth', {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      },
    })
    .then(response => {
      console.log('success: ', response);
      // if(response.status === 200) {
      //   this.setState({name: response.data.name})
      // }
    })
    
  }
  render() {
    console.log(this.props);
    return (
      <div>
        <NavBar/>
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
