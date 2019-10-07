import React, { Component } from "react";

class EntryForm extends Component {
  state = {
    date: "",
    bmi: 0,
    bodyFat: 0
  };

  handleChange = () => {
    
  }
  render() {
    const { date, bmi, bodyFat } = this.state;
    return (
      <div>
        <div className="card text-white bg-primary mb-3">
          <div className="card-header">Enter New Stats</div>
          <div className="card-body">
            <form>              
              <div className="form-group">
                <span>
                  <label>BMI</label>{" "}
                  <input type="text" value={bmi} className="form-control" />
                </span>
              </div>
              <div className="form-group">
                <span>
                  <label>Body Fat %</label>{" "}
                  <input type="text" value={bodyFat} className="form-control" />
                </span>
              </div>
              <button type="button" class="btn btn-success">Add Entry</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
export default EntryForm;
