// components/NowPlayMovies/NowPlayMovies.jsx
import React from "react";
import MovieSlider from "../../../../common/MovieSlider/MovieSlider";
import "./NowPlayMovies.style.css";
import { responsive } from "../../../../constants/responsive"; // import 추가

const NowPlayMovies = ({ movies }) => {
  if (!movies || movies.length === 0) return null;

  return <MovieSlider title="현재 상영중" movies={movies} responsive={responsive} />;
};

export default NowPlayMovies;
