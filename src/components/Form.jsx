import React, { useContext } from "react";
import { Button, OutlinedInput } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";

import { MoviesContext } from "../data/MoviesContext";

export default () => {
  const {
    state,
    state: {
      searchField: { error, value },
      movies: { searchValue },
    },
    setState,
  } = useContext(MoviesContext);

  const changeHandler = ({ target: { value } }) => {
    setState({
      ...state,
      searchField: {
        ...state.searchField,
        value,
        error: false,
      },
    });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (!value) {
      setState({
        ...state,
        searchField: {
          ...state.searchField,
          error: true,
        },
      });
    } else {
      setState({
        ...state,
        movies: {
          ...state.movies,
          prevSearchValue: searchValue,
          searchValue: value,
          page: 1,
        },
      });
    }
  };

  return (
    <form onSubmit={submitHandler} style={{ marginTop: "15px" }}>
      <OutlinedInput
        label="Search"
        color="primary"
        placeholder="Search..."
        value={state.searchField.value}
        onChange={changeHandler}
        error={error}
      />
      <Button color="primary" variant="contained" type="submit">
        <SearchIcon />
      </Button>
    </form>
  );
};
