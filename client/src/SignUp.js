import React, { Component } from "react";
import axios from "axios";
import {Link} from "react-router-dom";

class SignUp extends Component {
  state = {
    email: "",
    password: "",
    confirmPassword: "", 
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
    axios("/api/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      data: {
        name: this.state.name,
        email: this.state.email,
        password: this.state.password
      }
    })
      .then(response => {
        console.log("success: ", response);
        if (response.status === 200) { 
          this.props.setAuth();         
          this.redirectPage();
        }
      })
      .catch(error => {
        if (error.response) {
          console.log("failure: ", error.response.data);
          this.setState({
            errorMessage: error.response.data.msg
          }).then(() => {
            //clear form
            console.log("form should clear");
            this.resetForm();
            console.log(this.state.name, this.state.email, this.state.password);
          });
        }
      });
  };
  //method to reset form value.  Called in axios POST.
  resetForm = () => {
    document.getElementById("signup").reset();
  };
  //method to redirect page.  Called in axios POST.
  redirectPage = () => {
    const { history } = this.props;
    return history.push("/");
  };

  render() {
      const {name, email, password, confirmPassword} = this.state

    // disables sign up button until email is unique, password inputs are not empty
    // and are equal and rank is selected
   
    return (
      <div className="container d-flex justify-content-center align-items-center">
        <div
          className="card bg-primary text-white border-primary mb-3"
          style={{ maxWidth: "20rem" }}
        >
          <div className="card-header text-left text-bold">Sign Up</div>
          <div className="card-body">
            <form id="signup" onSubmit={this.handleSubmit}>
            <div class="form-group">
                <label>Name</label>
                <input
                  type="text"
                  class="form-control"
                  name="name"
                  placeholder="Enter full name"
                  value={this.state.name}
                  onChange={this.handleChange}
                  required
                />
              </div>
              <div class="form-group">
                <label>Email</label>
                <input
                  type="email"
                  class="form-control"
                  name="email"
                  placeholder="Enter email"
                  value={this.state.email}
                  onChange={this.handleChange}
                  required
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
                  required
                />
              </div>              
              <div className="form-group">
                <label>Confirm Password</label>
                <input
                  type="password"
                  className="form-control"
                  name="confirmPassword"
                  placeholder="Enter password"
                  value={this.state.confirmPassword}
                  onChange={this.handleChange}
                  required
                />
              </div>
               {/* check that both password inputs are not empty strings and match */}
            <h6 className="d-flex justify-content-center">
              {password !== "" &&
              confirmPassword !== "" &&
              password !== confirmPassword ? (
                <p style={{ color: "red" }}>passwords don't match</p>
              ) : null}
              {password !== "" &&
              confirmPassword !== "" &&
              password === confirmPassword ? (
                <p style={{ color: "green" }}>passwords match</p>
              ) : null}
               </h6>
              <Link  to="/" className="btn btn-success m-2">
                Cancel
              </Link>
              <button type="submit" className="btn btn-success m-2">Sign Up</button>
            </form>

            {/* errorMessage displayed on invalid username or invalid password */}
            {this.state.errorMessage ? (
              <h6 className="text-danger text-center pt-2">
                {" "}
                {this.state.errorMessage}{" "}
              </h6>
            ) : null}
          </div>
        </div>
      </div>
    );
  }
}
export default SignUp;
