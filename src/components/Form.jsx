import React, { Component } from "react";
import { TextField } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";

export default class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchField: {
        value: "",
        error: false,
      },
    };
  }

  changeHandler = (e) => {
    this.setState({
      searchField: {
        value: e.target.value,
        error: false,
      },
    });
  };

  submitHandler = (event) => {
    event.preventDefault();
    if (!this.state.searchField.value) {
      this.setState({
        ...this.state,
        searchField: {
          ...this.state.searchField,
          error: true,
        },
      });
    }
    this.props.searchMovies(this.state.searchField.value);
  };

  render() {
    return (
      <form onSubmit={this.submitHandler}>
        <TextField
          id="standard-basic"
          label={<SearchIcon />}
          onChange={this.changeHandler}
          color="ternary"
          error={this.state.searchField.error}
        />
      </form>
    );
  }
}
