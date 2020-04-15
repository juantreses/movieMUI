import React from "react";
import { Link } from "react-router-dom";

import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
  Grid,
} from "@material-ui/core";

import { slugify } from "../helpers";
import notFound from "../images/No-Image-Found.png";

export default function MovieResults(props) {
  if (!props.data) return null;
  return (
    <Grid container spacing={3} className="grid">
      {props.data.map((movie) => {
        return (
          <Grid item xs={3} key={movie.imdbID}>
            <Card>
              <CardActionArea>
                <CardMedia
                  className="image"
                  image={movie.Poster === "N/A" ? notFound : movie.Poster}
                  title={movie.Title}
                  style={{ height: 0, paddingTop: "56.25%", marginTop: "30" }}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                    {movie.Title}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  >
                    Year: {movie.Year}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  >
                    Type: {movie.Type}
                  </Typography>
                </CardContent>
              </CardActionArea>
              <CardActions>
                <Link to={`/movie/${movie.imdbID}/${slugify(movie.Title)}`}>
                  <Button size="small" color="primary">
                    More Info
                  </Button>
                </Link>
              </CardActions>
            </Card>
          </Grid>
        );
      })}
    </Grid>
  );
}
