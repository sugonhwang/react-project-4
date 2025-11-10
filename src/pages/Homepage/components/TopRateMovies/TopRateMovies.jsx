import React from "react";
import { Alert } from "react-bootstrap";
import "react-multi-carousel/lib/styles.css";
import { responsive } from "../../../../constants/responsive";
import "./TopRateMovies.style.css";
import { useTopRateMoviesQuery } from "../../../../hook/useTopRateMovies";
import MovieSlider from "../../../../common/MovieSlider/MovieSlider";

const TopRateMovies = () => {
  const { data, isLoading, isError, error } = useTopRateMoviesQuery();
  if (isLoading) {
    return <h1>Loading...</h1>;
  }
  if (isError) {
    return <Alert variant="danger">{error.message}</Alert>;
  }
  return (
    <div>
      <MovieSlider title="평점 좋은 영화" movies={data.results} responsive={responsive} />
    </div>
  );
};

export default TopRateMovies;
