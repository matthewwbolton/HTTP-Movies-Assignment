import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const UpdateMovie = props => {
  const [state, setState] = useState({
    title: "",
    director: "",
    metascore: ""
  });

  const params = useParams();
  console.log("This is params.id", params.id);

  const handleChange = e => {
    e.preventDefault();
    setState({ ...state, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    const movieToUpdate = props.movie.find(elem => `${elem.id}` === params.id);
    if (movieToUpdate) {
      setState(movieToUpdate);
    }
  }, [props.movie, params.id]);

  const handleSubmit = e => {};

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
      </form>
    </div>
  );
};

export default UpdateMovie;
