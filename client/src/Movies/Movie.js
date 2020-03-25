import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouteMatch, useHistory, useParams } from "react-router-dom";
import MovieCard from "./MovieCard";

function Movie({ addToSavedList }) {
  const [movie, setMovie] = useState(null);
  const match = useRouteMatch();

  const history = useHistory();

  const params = useParams();

  const fetchMovie = id => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then(res => setMovie(res.data))
      .catch(err => console.log(err.response));
  };

  const saveMovie = () => {
    addToSavedList(movie);
  };

  useEffect(() => {
    fetchMovie(match.params.id);
  }, [match.params.id]);

  if (!movie) {
    return <div>Loading movie information...</div>;
  }

  const routeToUpdateMovie = e => {
    e.preventDefault();
    history.push(`/update-movie/${movie.id}`);
  };

  const deleteMovie = e => {
    e.preventDefault();
    axios
      .delete(`http://localhost:5000/api/movies/${params.id}`)
      .then(res => console.log("This is .delete RES", res))
      .catch(err => console.log("This is .delete ERR", err));
  };

  return (
    <div className="save-wrapper">
      <MovieCard movie={movie} />
      <div className="save-button" onClick={saveMovie}>
        Save
      </div>
      <div onClick={routeToUpdateMovie} className="update-button">
        Update Movie
      </div>
      <div onClick={deleteMovie} className="delete-button">
        Delete Movie
      </div>
    </div>
  );
}

export default Movie;
