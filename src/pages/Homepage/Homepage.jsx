import React from "react";
import { usePopularMoviesQuery } from "../../hook/usePopularMovies";
import { useTopRateMoviesQuery } from "../../hook/useTopRateMovies";
import { useNowPlayMoviesQuery } from "../../hook/useNowPlayMovies";
import { Spinner, Alert } from "react-bootstrap";
import Banner from "./components/Banner/Banner";
import PopularMovieSlide from "./components/PopularMovieSlide/PopularMovieSlide";
import TopRateMovies from "./components/TopRateMovies/TopRateMovies";
import NowPlayMovies from "./components/NowPlayMovies/NowPlayMovies";
import "./Homepage.style.css";

const Homepage = () => {
  const { data: popularMovies, isLoading: popularLoading, isError: popularError, error: popularErrorData } = usePopularMoviesQuery();
  const { data: topRatedMovies, isLoading: topRatedLoading, isError: topRatedError, error: topRatedErrorData } = useTopRateMoviesQuery();
  const { data: nowPlayingMovies, isLoading: nowPlayingLoading, isError: nowPlayingError, error: nowPlayingErrorData } = useNowPlayMoviesQuery();

  // 모든 데이터 로딩 체크
  if (popularLoading || topRatedLoading || nowPlayingLoading) {
    return (
      <div className="spinner-area">
        <Spinner animation="border" variant="danger" style={{ width: "5rem", height: "5rem" }} />
      </div>
    );
  }

  // 에러 처리
  if (popularError) {
    return <Alert variant="danger">{popularErrorData.message}</Alert>;
  }
  if (topRatedError) {
    return <Alert variant="danger">{topRatedErrorData.message}</Alert>;
  }
  if (nowPlayingError) {
    return <Alert variant="danger">{nowPlayingErrorData.message}</Alert>;
  }

  return (
    <div>
      <Banner movie={popularMovies?.results[0]} />
      <PopularMovieSlide movies={popularMovies?.results} />
      <TopRateMovies movies={topRatedMovies?.results} />
      <NowPlayMovies movies={nowPlayingMovies?.results} />
    </div>
  );
};

export default Homepage;
