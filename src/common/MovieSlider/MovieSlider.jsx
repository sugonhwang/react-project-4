import React from "react";
import "./MovieSlider.style.css";
import "react-multi-carousel/lib/styles.css";
import Carousel from "react-multi-carousel";
import MovieCard from "../MovieCard/MovieCard";
import { responsive as defaultResponsive } from "../../constants/responsive";

const MovieSlider = ({ title, movies, responsive = defaultResponsive }) => {
  if (!movies || movies.length === 0) {
    return null;
  }
  return (
    <div>
      <h3>{title}</h3>
      <Carousel infinite={true} centerMode={true} itemClass="movie-slider p-1" containerClass="carousel-container" responsive={responsive}>
        {movies.map((movie, index) => (
          <MovieCard movie={movie} key={index} />
        ))}
      </Carousel>
    </div>
  );
};

export default MovieSlider;
