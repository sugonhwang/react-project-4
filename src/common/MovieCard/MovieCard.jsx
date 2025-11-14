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
  // const [imageError, setImageError] = useState(false);
  const hoverTimeoutRef = useRef(null);

  const { data: trailer } = useMovieVideosQuery(isHovered ? movie.id : null);
  const { data: genreData } = useMovieGenreQuery();

  const defaultImage = "https://media.istockphoto.com/id/1396814518/ko/%EB%B2%A1%ED%84%B0/%EC%9D%B4%EB%AF%B8%EC%A7%80%EA%B0%80-%EA%B3%A7-%EC%B6%9C%EC%8B%9C-%EB%90%A0-%EC%98%88%EC%A0%95%EC%9E%85%EB%8B%88%EB%8B%A4-%EC%82%AC%EC%A7%84%EC%9D%B4-%EC%97%86%EC%9C%BC%EB%A9%B0-%EC%8D%B8%EB%84%A4%EC%9D%BC-%EC%9D%B4%EB%AF%B8%EC%A7%80%EB%A5%BC-%EC%82%AC%EC%9A%A9%ED%95%A0-%EC%88%98-%EC%97%86%EC%8A%B5%EB%8B%88%EB%8B%A4-%EB%B2%A1%ED%84%B0-%EC%9D%BC%EB%9F%AC%EC%8A%A4%ED%8A%B8-%EB%A0%88%EC%9D%B4-%EC%85%98.jpg?s=612x612&w=0&k=20&c=1h_M2LcQTtyn0tc_aE0CU8OBki5dYkNwiCANxmOBqQM=";

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

  // 안전한 이미지 URL 생성
  const posterUrl = movie?.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : defaultImage;

  return (
    <div className={`movie-card ${isHovered ? "hovered" : ""}`} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)} onClick={handleClick}>
      {showTrailer && trailer ? (
        <div className="movie-card-trailer">
          <YouTube videoId={trailer.key} opts={opts} />
        </div>
      ) : (
        <img
          src={posterUrl}
          alt={movie.title}
          className="movie-card-img"
          onError={(e) => {
            e.target.src = defaultImage;
          }}
        />
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
            <span className="info-icon">👍</span>
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
