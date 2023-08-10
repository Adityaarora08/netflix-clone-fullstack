import React, { useState, useEffect } from "react";
import classes from "./Row.module.css";
import axios from "../axios";
function Row({ title, fetchUrl, isLargeRow }) {
  const [movies, setMovies] = useState([]);
  const base_url = "https://image.tmdb.org/t/p/original/";
  useEffect(() => {
    async function fetchData() {
      console.log(fetchUrl);
      const response = await axios.get(fetchUrl);
      setMovies(response.data.results);
      return response;
    }
    fetchData();
  }, []);
  return (
    <div className={classes.row}>
      <h2>{title}</h2>
      <div className={classes.row__posters}>
        {movies.map((movie) => (
          <img
            key={movie.id}
            className={ !isLargeRow ?
              classes.row__poster : classes.row__posterlarger
            }
            src={`${base_url}${
              isLargeRow ? movie.poster_path : movie.backdrop_path
            }`}
            alt={movie.name}
          />
        ))}
      </div>
    </div>
  );
}

export default Row;
