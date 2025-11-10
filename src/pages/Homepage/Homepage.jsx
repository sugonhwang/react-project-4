import React from "react";
import Banner from "./components/Banner/Banner";
import PopularMovieSlide from "./components/PopularMovieSlide/PopularMovieSlide";
import TopRateMovies from "./components/TopRateMovies/TopRateMovies";
import NowPlayMovies from "./components/NowPlayMovies/NowPlayMovies";

const Homepage = () => {
  return (
    <div>
      <Banner />
      <PopularMovieSlide />
      <TopRateMovies />
      <NowPlayMovies />
    </div>
  );
};

export default Homepage;
