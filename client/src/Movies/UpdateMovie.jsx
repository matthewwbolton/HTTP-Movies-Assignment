import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import Axios from "axios";

const UpdateMovie = props => {
  const [state, setState] = useState({
    title: "",
    director: "",
    metascore: "",
    stars: ""
  });

  const params = useParams();
  console.log("This is params.id", params.id);

  const { push } = useHistory();

  const handleChange = e => {
    e.preventDefault();

    let value = e.target.value;
    if (value === "stars") {
      value = Array.from(value.split(","));
    }

    setState({ ...state, [e.target.name]: value });

    // setState({ ...state, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    const movieToUpdate = props.movie.find(elem => `${elem.id}` === params.id);
    if (movieToUpdate) {
      setState(movieToUpdate);
    }
  }, [props.movie, params.id]);

  const handleSubmit = e => {
    e.preventDefault();
    Axios.put(`http://localhost:5000/api/movies/${params.id}`, state)
      .then(res => {
        console.log(res);
        props.setMovieList(props.movie);
        push(`/`);
        props.getMovieList();
      })
      .catch(err => console.log(err));
  };

  return (
    <div className="saved-list">
      <form onSubmit={handleSubmit}>
        <label>
          Title:
          <input
            onChange={handleChange}
            name="title"
            value={state.title}
            placeholder="Title"
          />
        </label>
        <label>
          Director:
          <input
            onChange={handleChange}
            name="director"
            value={state.director}
            placeholder="Director"
          />
        </label>
        <label>
          Metascore:
          <input
            onChange={handleChange}
            name="metascore"
            value={state.metascore}
            placeholder="Metascore"
          />
        </label>
        <label>
          Stars:
          <input
            onChange={handleChange}
            name="stars"
            value={state.stars}
            placeholder="Stars"
          />
        </label>
        <button onClick={handleSubmit}>Update Movie</button>
      </form>
    </div>
  );
};

export default UpdateMovie;
