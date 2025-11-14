// components/PopularMovieSlide/PopularMovieSlide.jsx
import React from "react";
import MovieSlider from "../../../../common/MovieSlider/MovieSlider";
import { responsive } from "../../../../constants/responsive"; // import 추가

const PopularMovieSlide = ({ movies }) => {
  if (!movies || movies.length === 0) return null;

  return <MovieSlider title="인기 영화" movies={movies} responsive={responsive} />;
};

export default PopularMovieSlide;
