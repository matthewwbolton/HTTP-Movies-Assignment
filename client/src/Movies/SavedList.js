import React from "react";
import { NavLink, Link } from "react-router-dom";
import styled from "styled-components";

const NewDiv = styled.div`
  display: flex;
  width: 15%;
`;

const NewLink = styled(Link)`
  margin: 2%;
`;

function SavedList({ list }) {
  return (
    <div className="saved-list">
      <h3>Saved Movies:</h3>
      {list.map(movie => {
        return (
          <NavLink
            to={`/movies/${movie.id}`}
            key={movie.id}
            activeClassName="saved-active"
          >
            <span className="saved-movie">{movie.title}</span>
          </NavLink>
        );
      })}
      <NewDiv className="home-button">
        <NewLink to="/">Home</NewLink>
        <NewLink to="/add-movie">Add Movie</NewLink>
      </NewDiv>
    </div>
  );
}

export default SavedList;
