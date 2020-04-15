import React from "react";
import axios from "axios";
import { LinearProgress, Button } from "@material-ui/core";
import { Link } from "react-router-dom";

import notFound from "../images/No-Image-Found.png";

export default class Movie extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movie: {
        data: {},
        loading: false,
        error: false,
      },
    };
  }

  componentDidMount() {
    this.setState({
      ...this.state,
      movie: {
        ...this.state.movie,
        loading: true,
      },
    });
    axios
      .get(
        `${process.env.REACT_APP_ENDPOINT}&plot=full&i=` +
          this.props.match.params.id
      )
      .then((response) =>
        this.setState({
          ...this.state,
          movie: {
            ...this.state.movie,
            data: { ...response.data },
            loading: false,
          },
        })
      );
  }

  render() {
    return (
      <>
        {this.state.movie.loading && <LinearProgress />}
        {Object.keys(this.state.movie.data).length > 1 && (
          <div className="movieInfo">
            <h1>{this.state.movie.data.Title}</h1>
            <img
              className="poster"
              src={
                this.state.movie.data.Poster === "N/A"
                  ? notFound
                  : this.state.movie.data.Poster
              }
              alt={`Poster for ${this.state.movie.data.Title}`}
            />
            <p>{this.state.movie.data.Plot}</p>
            <p>Awards: {this.state.movie.data.Awards}</p>
            <p>Rating: {this.state.movie.data.imdbRating}</p>
            <Link to="/">
              <Button color="primary" variant="contained" raised>
                Search again
              </Button>
            </Link>
          </div>
        )}
      </>
    );
  }
}
