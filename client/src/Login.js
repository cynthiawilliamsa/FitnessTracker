import React, { Component } from "react";
import axios from "axios";
import {Link} from "react-router-dom";

class Login extends Component {
  state = {
    email: "",
    password: "",
    errorMessage: ""
  };

  handleChange = ({ target: { name, value } }) => {
    console.log(value);
    this.setState({
      ...this.state,
      [name]: value
    });
    console.log(this.state);
  };
  //resets form in handleSubmit
  resetForm = () => {
    document.getElementById("login").reset();
  };

  handleSubmit = e => {
    e.preventDefault();
    console.log("click");
    //@ POST /
    //@desc sends username/passwords to server for validation and cooke with token returned if 200
    axios("/api/auth", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      data: {
        email: this.state.email,
        password: this.state.password
      }
    })
      .then(response => {
        console.log("success: ", response);
        if (response.status === 200) {
          console.log(response.data.token)
          localStorage.setItem("token", response.data.token);
          this.redirectPage();
        }
      })
      .catch(error => {
        if (error) {
          console.log("failure: ", error);
          // this.setState({
          //   errorMessage: error
          // }).then(() => {
          //   //clear form
          //   console.log("form should clear");
          //   this.resetForm();
          // });
        }
      });
  };
  //method to reset form value.  Called in axios POST.
  resetForm = () => {
    document.getElementById("login").reset();
  };
  //method to redirect page.  Called in axios POST.
  redirectPage = () => {
    const { history } = this.props;
    return history.push("/dashboard");
  };

  render() {
    return (
      <div className="container d-flex justify-content-center align-items-center">
        <div
          className="card bg-primary text-white border-primary mb-3"
          style={{ maxWidth: "20rem" }}
        >
          <div className="card-header text-left text-bold">Login</div>
          <div className="card-body">
            <form id="login" onSubmit={this.handleSubmit}>
              <div class="form-group">
                <label>Email</label>
                <input
                  type="email"
                  class="form-control"
                  name="email"
                  placeholder="Enter email"
                  value={this.state.email}
                  onChange={this.handleChange}
                />
              </div>
              <div className="form-group">
                <label>Password</label>
                <input
                  type="password"
                  className="form-control"
                  name="password"
                  placeholder="Enter password"
                  value={this.state.password}
                  onChange={this.handleChange}
                />
              </div>
              <button type="submit" className="btn btn-success m-2">
                Login
              </button>
              <Link className="btn btn-success m-2"to="/signup">Sign Up</Link>
            </form>

            {/* errorMessage displayed on invalid username or invalid password */}
            {/* {this.state.errorMessage ? (
              <h6 className="text-danger text-center pt-2">
                {" "}
                {this.state.errorMessage}{" "}
              </h6>
            ) : null} */}
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
