// components/TopRateMovies/TopRateMovies.jsx
import React from "react";
import MovieSlider from "../../../../common/MovieSlider/MovieSlider";
import "./TopRateMovies.style.css";
import { responsive } from "../../../../constants/responsive"; // import 추가

const TopRateMovies = ({ movies }) => {
  if (!movies || movies.length === 0) return null;

  return <MovieSlider title="높은 평점 영화" movies={movies} responsive={responsive} />;
};

export default TopRateMovies;
