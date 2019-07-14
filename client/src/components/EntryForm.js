import React, { Component } from "react";

class EntryForm extends Component {
  render() {
    return (
      <div>
        <div className="card text-white bg-primary mb-3">
          <div className="card-header">Enter New Stats</div>
          <div className="card-body">
            <h4 className="card-title">Primary card title</h4>
            <form>
            <div className="form-group">
            <input className="form-control" placeholder="Current Weight"/>
            <h5>calculated BMI</h5>
            </div>
            </form>

          </div>
        </div>
      </div>
    );
  }
}
export default EntryForm;
