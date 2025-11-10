import React from "react";
import { Badge } from "react-bootstrap";
import "./MovieCard.style.css";
import { useMovieGenreQuery } from "../../hook/useMovieGenre";

const MovieCard = ({ movie }) => {
  const { data: genreData } = useMovieGenreQuery();

  const showGenre = (genreIdList) => {
    if (!genreData) return [];
    const genreNameList = genreIdList.map((id) => {
      const genreObj = genreData.find((genre) => genre.id === id);
      return genreObj.name;
    });

    return genreNameList;
  };
  return (
    <div style={{ backgroundImage: "url(" + `https://www.themoviedb.org/t/p/w600_and_h900_bestv2${movie.poster_path}` + ")" }} className="movie-card">
      <div className="overlay">
        <h1>{movie.title}</h1>
        {showGenre(movie.genre_ids).map((genre, index) => (
          <Badge key={index} bg="danger">
            {genre}
          </Badge>
        ))}
        <div className="movie-stats">
          <span>⭐ {movie.vote_average.toFixed(1)}</span>
          <span>▶️ {movie.popularity.toFixed(0)}</span>
          <span>{movie.adult ? "🔞" : "✅"}</span>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
