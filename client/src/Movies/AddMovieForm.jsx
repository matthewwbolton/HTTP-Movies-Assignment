import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Axios from "axios";

const AddMovieForm = props => {
  const [newMovie, setNewMovie] = useState({
    title: "",
    director: "",
    metascore: "",
    stars: ""
  });

  const { push } = useHistory();

  const handleChanges = e => {
    // e.persist();
    let value = e.target.value;
    if (e.target.name === "stars") {
      value = Array.from(value.split(","));
    }

    setNewMovie({ ...newMovie, [e.target.name]: value });

    // setNewMovie({ ...newMovie, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    Axios.post("http://localhost:5000/api/movies", newMovie)
      .then(res => {
        console.log("This is .POST RES", res);
        props.setMovieList(res.data);
        push("/");
      })
      .catch(err => console.log("This is .POST ERR", err));
  };

  return (
    <div className="saved-list">
      <form onSubmit={handleSubmit}>
        <label>
          Title:
          <input
            onChange={handleChanges}
            name="title"
            value={newMovie.title}
            placeholder="Title"
          />
        </label>
        <label>
          Director:
          <input
            onChange={handleChanges}
            name="director"
            value={newMovie.director}
            placeholder="Director"
          />
        </label>
        <label>
          Metascore:
          <input
            onChange={handleChanges}
            name="metascore"
            value={newMovie.metascore}
            placeholder="Metascore"
          />
        </label>
        <label>
          Stars:
          <input
            onChange={handleChanges}
            name="stars"
            value={newMovie.stars}
            placeholder="Stars"
          />
        </label>
        <button onClick={handleSubmit}>Add Movie</button>
      </form>
    </div>
  );
};

export default AddMovieForm;
