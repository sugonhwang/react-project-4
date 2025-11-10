import React from "react";
import { useNowPlayMovies } from "../../../../hook/useNowPlayMovies";
import { Alert } from "react-bootstrap";
import "react-multi-carousel/lib/styles.css";
import "./NowPlayMovies.style.css";
import MovieSlider from "../../../../common/MovieSlider/MovieSlider";
import { responsive } from "../../../../constants/responsive";

const NowPlayMovies = () => {
  const { data, isLoading, isError, error } = useNowPlayMovies();
  if (isLoading) {
    return <h1>Loading..</h1>;
  }
  if (isError) {
    return <Alert variant="danger">{error.message}</Alert>;
  }
  return (
    <div>
      <MovieSlider title="현재 상영작" movies={data.results} responsive={responsive} />
    </div>
  );
};

export default NowPlayMovies;
