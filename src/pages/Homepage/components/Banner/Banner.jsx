// components/Banner/Banner.jsx
import React from "react";
import "./Banner.style.css";

const Banner = ({ movie }) => {
  if (!movie) return null;

  const backdropUrl = movie.backdrop_path ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}` : "https://media.istockphoto.com/id/1396814518/ko/%EB%B2%A1%ED%84%B0/%EC%9D%B4%EB%AF%B8%EC%A7%80%EA%B0%80-%EA%B3%A7-%EC%B6%9C%EC%8B%9C-%EB%90%A0-%EC%98%88%EC%A0%95%EC%9E%85%EB%8B%88%EB%8B%A4-%EC%82%AC%EC%A7%84%EC%9D%B4-%EC%97%86%EC%9C%BC%EB%A9%B0-%EC%8D%B8%EB%84%A4%EC%9D%BC-%EC%9D%B4%EB%AF%B8%EC%A7%80%EB%A5%BC-%EC%82%AC%EC%9A%A9%ED%95%A0-%EC%88%98-%EC%97%86%EC%8A%B5%EB%8B%88%EB%8B%A4-%EB%B2%A1%ED%84%B0-%EC%9D%BC%EB%9F%AC%EC%8A%A4%ED%8A%B8-%EB%A0%88%EC%9D%B4-%EC%85%98.jpg?s=612x612&w=0&k=20&c=1h_M2LcQTtyn0tc_aE0CU8OBki5dYkNwiCANxmOBqQM=";

  return (
    <div
      className="banner"
      style={{
        backgroundImage: `url(${backdropUrl})`,
      }}
    >
      <div className="banner-content">
        <h1 className="banner-title">{movie.title}</h1>
        <p className="banner-overview">{movie.overview}</p>
        <div className="banner-info">
          <span>⭐ {movie.vote_average.toFixed(1)}</span>
          <span>👁️ {movie.popularity.toFixed(0)}</span>
          {movie.adult && <span>🔞</span>}
        </div>
      </div>
    </div>
  );
};

export default Banner;
