import React, { useState, useEffect } from "react";
import classes from "./Banner.module.css";
import axios from "../axios";
import requests from "../Request";
const Banner = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get(requests.fetchNetflixOriginals);
      setMovies(
        response.data.results[
          Math.floor(Math.random() * response.data.results.length - 1)
        ]
      );
      return response;
    }
    fetchData();
  }, []);
  console.log(movies);
  const truncate = (str, n) => {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  };
  return (
    <header
      className={classes.banner}
      style={{
        backgroundSize: "cover",
        backgroundImage: `url("https://image.tmdb.org/t/p/original/${movies?.backdrop_path}") `,
        backgroundPosition: "  center center",
      }}
    >
      <div className={classes.banner__contents}>
        <h1 className={classes.banner__title}>
          {movies?.title || movies?.name || movies?.orignal_name}
        </h1>
        <div className={classes.banner__buttons}>
          <button className={classes.banner__button}>Play</button>
          <button className={classes.banner__button}>My List</button>
        </div>
        <h1 className={classes.banner__description}>
          {truncate(movies?.overview, 150)}
        </h1>
      </div>
      <div className={classes.banner__fadebottom} />
    </header>
  );
};

export default Banner;
