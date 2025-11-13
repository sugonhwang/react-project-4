// common/MovieCard/MovieCard.jsx
import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Badge } from "react-bootstrap";
import YouTube from "react-youtube";
import { useMovieVideosQuery } from "../../hook/useMovieVideos";
import { useMovieGenreQuery } from "../../hook/useMovieGenre";
import "./MovieCard.style.css";

const MovieCard = ({ movie }) => {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);
  const [showTrailer, setShowTrailer] = useState(false);
  const hoverTimeoutRef = useRef(null);

  const { data: trailer } = useMovieVideosQuery(isHovered ? movie.id : null);
  const { data: genreData } = useMovieGenreQuery();

  // 장르 ID를 이름으로 변환
  const getGenreName = (genreId) => {
    const genre = genreData?.find((g) => g.id === genreId);
    return genre ? genre.name : "";
  };

  useEffect(() => {
    if (isHovered) {
      // 1초 후에 예고편 표시
      hoverTimeoutRef.current = setTimeout(() => {
        setShowTrailer(true);
      }, 300);
    } else {
      // hover 해제 시 타이머 취소 및 예고편 숨김
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
      }
      setShowTrailer(false);
    }

    return () => {
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
      }
    };
  }, [isHovered]);

  const handleClick = () => {
    if (!showTrailer) {
      navigate(`/movies/${movie.id}`);
    }
  };

  const opts = {
    width: "100%",
    height: "200",
    playerVars: {
      autoplay: 1,
      mute: 1,
      controls: 0,
      modestbranding: 1,
      rel: 0,
    },
  };

  return (
    <div className={`movie-card ${isHovered ? "hovered" : ""}`} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)} onClick={handleClick}>
      {showTrailer && trailer ? (
        <div className="movie-card-trailer">
          <YouTube videoId={trailer.key} opts={opts} />
        </div>
      ) : (
        <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} className="movie-card-img" />
      )}

      <div className="movie-card-overlay">
        <h5 className="movie-card-title">{movie.title}</h5>

        <div className="movie-card-genres">
          {movie.genre_ids?.slice(0, 2).map((id) => (
            <Badge key={id} bg="danger" className="me-1">
              {getGenreName(id)}
            </Badge>
          ))}
        </div>

        <div className="movie-card-info">
          <span className="info-item">
            <span className="info-icon">⭐</span>
            <span className="info-text">{movie.vote_average.toFixed(1)}</span>
          </span>
          <span className="info-item">
            <span className="info-icon">👁️</span>
            <span className="info-text">{movie.popularity.toFixed(0)}</span>
          </span>
          <span className="info-item">
            {movie.adult ? (
              <Badge bg="warning" text="dark">
                🔞
              </Badge>
            ) : (
              <Badge bg="success">전체</Badge>
            )}
          </span>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
