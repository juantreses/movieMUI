import React from "react";
import axios from "axios";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import {
  Typography,
  Container,
  LinearProgress,
  Toolbar,
  AppBar,
} from "@material-ui/core";

import Form from "./components/Form";
import Movies from "./components/Movies";
import Movie from "./components/Movie";

import { getScrollDownPercentage } from "./helpers";

export default class App extends React.Component {
  state = {
    movies: {
      data: [],
      searchValue: "",
      page: 1,
      loading: false,
      error: false,
    },
  };

  componentDidMount = () => {
    window.onscroll = this.handleScroll;
  };

  handleScroll = () => {
    if (!this.state.movies.loading) {
      if (getScrollDownPercentage(window) > 0.8) {
        const nextPage = this.state.movies.page + 1;
        this.searchMovies(this.state.movies.searchValue, nextPage);
        this.setState({
          ...this.state,
          movies: {
            ...this.state.movies,
            page: nextPage,
          },
        });
      }
    }
  };

  searchMovies = (str, page = 1) => {
    const existingMovies =
      this.state.movies.data.length && this.state.movies.searchValue === str
        ? this.state.movies.data
        : [];
    this.setState({
      ...this.state,
      movies: {
        ...this.state.movies,
        loading: true,
      },
    });
    axios
      .get(`${process.env.REACT_APP_ENDPOINT}s=${str}&page=${page}`)
      .then((response) => {
        console.log(response);
        this.setState({
          ...this.state,
          movies: {
            ...this.state.movies,
            loading: false,
            searchValue: str,
            data: [...existingMovies, ...response.data.Search],
          },
        });
      });
  };

  render() {
    return (
      <Router>
        <Container>
          <AppBar position="sticky">
            <Toolbar>
              <Typography variant="h3" style={{ flex: 1 }}>
                Media Searcher
              </Typography>

              <Form searchMovies={this.searchMovies} />
            </Toolbar>
          </AppBar>

          {this.state.movies.loading && <LinearProgress />}
          <Switch>
            <Route exact path="/">
              <Movies data={this.state.movies.data} />
            </Route>
            <Route
              path="/movie/:id/:title"
              render={(props) => <Movie {...props} />}
            />
          </Switch>
        </Container>
      </Router>
    );
  }
}
