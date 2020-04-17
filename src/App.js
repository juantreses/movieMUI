import React, { useState, useEffect } from "react";
import axios from "axios";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import {
  Typography,
  Container,
  LinearProgress,
  Toolbar,
  AppBar,
} from "@material-ui/core";
import TheatersIcon from "@material-ui/icons/Theaters";

import { MoviesContext } from "./data/MoviesContext";
import initialState from "./data/initialState";

import Form from "./components/Form";
import Movies from "./components/Movies";
import Movie from "./components/Movie";

import { getScrollDownPercentage } from "./helpers";

export default () => {
  const [state, setState] = useState(initialState);

  const {
    movies: { data, loading, searchValue, page, prevSearchValue },
  } = state;

  useEffect(() => {
    window.onscroll = () => {
      handleScroll();
    };
    if (searchValue) {
      const existingMovies =
        data.length && prevSearchValue === searchValue ? data : [];
      setState({
        ...state,
        movies: {
          ...state.movies,
          loading: true,
        },
      });
      axios
        .get(`${process.env.REACT_APP_ENDPOINT2}s=${searchValue}&page=${page}`)
        .then((response) => {
          if (response.data.Response === "True") {
            setState({
              ...state,
              movies: {
                ...state.movies,
                loading: false,
                searchValue: searchValue,
                data: [...existingMovies, ...response.data.Search],
              },
            });
          } else {
            setState({
              ...state,
              movies: {
                ...state.movies,
                loading: false,
                error: true,
              },
            });
          }
        });
    }
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [searchValue, page]);

  const handleScroll = () => {
    if (!loading && searchValue) {
      if (getScrollDownPercentage(window) > 0.7) {
        setState({
          ...state,
          movies: {
            ...state.movies,
            page: page + 1,
          },
        });
      }
    }
  };

  return (
    <MoviesContext.Provider value={{ state, setState }}>
      <Router>
        <Container>
          <AppBar position="sticky">
            <Toolbar>
              <Typography variant="h3" style={{ flex: 1 }}>
                Media Searcher
              </Typography>
              <TheatersIcon fontSize="large" />
            </Toolbar>
          </AppBar>
          <Form />
          {loading && <LinearProgress />}
          <Switch>
            <Route exact path="/">
              {searchValue && <Movies data={data} />}
            </Route>
            <Route path="/movie/:id/:title">
              <Movie />
            </Route>
          </Switch>
        </Container>
      </Router>
    </MoviesContext.Provider>
  );
};

// export default class App extends React.Component {
//   state = {
//     movies: {
//       data: [],
//       searchValue: "",
//       page: 1,
//       loading: false,
//       error: false,
//     },
//   };

//   componentDidMount = () => {
//
//   };

//

//   render() {
//
//   }
// }
