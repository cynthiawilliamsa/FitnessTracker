import React from "react";
import { Link } from "react-router-dom";

const NavBar = (props) => {
    // const {name} = this.props;
    const signOut = () => {
        localStorage.removeItem('token');
    }
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <Link className="navbar-brand" href="#">
        FitnessTracker
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon" />
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav">
          <li className="nav-item active">
            <Link className="nav-link" href="#">
              Home <span className="sr-only">(current)</span>
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/" onClick={signOut}>
              Logout
            </Link>
          </li>
          {/* <li className="nav-item">
              <Link className="nav-link" href="#">Pricing</Link>
            </li>           */}
        </ul>
      </div>
      <div className="" style={{ float: "right" }}>
        <ul className="navbar-nav">
          <li className="nav-text"><i className="far fa-user"></i><span className="mx-1">{props.name}</span></li>
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
