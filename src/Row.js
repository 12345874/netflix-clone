import React, { useState, useEffect } from "react";
import axios from "./axios";
import "./Row.css";
import YouTube from "react-youtube";
import movieTrailer from "movie-trailer";

const base_url = "https://image.tmdb.org/t/p/original/";

function Row({ title, fetchUrl, isLargeRow }) {
  const [movies, setMovies] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState("");

  // A snippet of code which runs based on a specific condition/variable

  useEffect(() => {
    // if [] is blank, run once when loads and don't run again
    // we are using async function as we are requesting the request to outside resuource it should be resync

    async function fetchData() {
      //await is going to say wait for the response to come back
      const request = await axios.get(fetchUrl);
      // we get this url => https://api.themoviedb.org/3/discover/tv?api_key=${API_KEY}&with_networks=213
      //   console.log(request);
      //we need to fetch data => results from request
      //   console.log(request.data.results);
      //we get the request.data.results and put in set movies
      setMovies(request.data.results);
      return request;
    }
    fetchData();
  }, [fetchUrl]);

  //   console.log(movies);

  // https://developers.google.com/youtube/player_parameters
  const opts = {
    height: "390",
    width: "100%",
    playerVars: {
      autoplay: 1,
    },
  };

  const handleClick = (movie) => {
    //if trailer is already opened then it will close it
    if (trailerUrl) {
      setTrailerUrl("");
    } else {
      movieTrailer(movie?.name || "")
        .then((url) => {
          const urlParams = new URLSearchParams(new URL(url).search);
          setTrailerUrl(urlParams.get("v"));
        })
        .catch((error) => console.log(error));
    }
  };

  return (
    <div className="row">
      {/* title */}
      <h2>{title}</h2>
      <div className="row_posters">
        {/* several row_poster */}

        {movies.map((movie) => (
          //base_url/riYInlsq2kf1AWoGm80JQW5dLKp.jpg

          <img
            key={movie.id}
            onClick={() => handleClick(movie)}
            className={`row_poster ${isLargeRow && "row_posterLarge"}`}
            src={`${base_url}${
              isLargeRow ? movie.poster_path : movie.backdrop_path
            }`}
            alt={movie.name}
          />
        ))}
      </div>
      {/* //https://youtu.be/XtMThy8QKqU?t=9969 */}
      {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
    </div>
  );
}

export default Row;
