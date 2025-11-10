import React from "react";
import { useNowPlayMovies } from "../../../../hook/useNowPlayMovies";
import { Alert } from "react-bootstrap";
import MovieCard from "../MovieCard/MovieCard";
import "react-multi-carousel/lib/styles.css";
import "./NowPlayMovies.style.css";
import Carousel from "react-multi-carousel";

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 6,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

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
      <h3>현재 상영작</h3>
      <Carousel infinite={true} centerMode={true} itemClass="movie-slider p-1" containerClass="carousel-container" responsive={responsive}>
        {data.results.map((movie, index) => (
          <MovieCard movie={movie} key={index} />
        ))}
      </Carousel>
    </div>
  );
};

export default NowPlayMovies;
