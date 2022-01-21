import React, { Component } from "react";

class Slider extends Component {
  handleUpdate = (event) => {
    this.props.actionFnct(event.target.value);
  };

  changeInputLabel = (event) => {
    event.target.nextElementSibling.value = `${event.target.value} deg.`;
  };

  componentDidMount() {
    const slider = document.getElementById(this.props.id);
    const defaultValue = 0;
    slider.value = defaultValue;
  }

  render() {
    return (
      <div className="range-container">
        <label htmlFor={this.props.id}>{this.props.label}</label>
        <input
          type="range"
          className="range"
          name="rank"
          min="0"
          max={this.props.max}
          step="1"
          onChange={this.handleUpdate}
          onInput={this.changeInputLabel}
          id={this.props.id}
        />
        <output>0 deg.</output>
      </div>
    );
  }
}

export default Slider;
