import React, { Component } from "react";
import Select from "react-select";

const customStyles = {
  option: (provided, state) => ({
    ...provided,
    borderBottom: "1px solid #bdfd00",
    color: "#bdfd00",
    padding: 10,
    background: state.isFocused ? "black" : "none",
  }),

  indicatorsContainer: (provided, state) => ({
    ...provided,
    background: "#222222",
  }),

  valueContainer: (provided, state) => ({
    ...provided,
    background: "#222222",
    border: "1px solid #aaaaaa",
  }),

  indicatorSeparator: (provided, state) => ({
    ...provided,
    background: "#999999",
  }),

  singleValue: (provided, state) => ({
    ...provided,
    color: "#bdfd00",
  }),

  menu: (provided, state) => ({
    ...provided,
    background: "rgba(0, 0, 0, 0.8)",
    width: 250,
  }),
};

class Dropdown extends Component {
  handleUpdate = (option) => {
    this.props.actionFnct(option.value);
  };

  render() {
    return (
      <div className="range-container">
        <label htmlFor="selector">{this.props.label}</label>
        <Select
          options={[
            { value: "z", label: "Z" },
            { value: "y", label: "Y" },
            { value: "x", label: "X" },
          ]}
          styles={customStyles}
          defaultValue={{ value: "z", label: "Z" }}
          onChange={this.handleUpdate}
          id="selector"
          name="selector"
        />
      </div>
    );
  }
}

export default Dropdown;
