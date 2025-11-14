import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Row, Col, Badge, Alert, Spinner, Button, Modal } from "react-bootstrap";
import YouTube from "react-youtube";
import { useMovieDetailQuery } from "../../hook/useMovieDetail";
import { useMovieReviewsQuery } from "../../hook/useMovieReviews";
import { useMovieVideosQuery } from "../../hook/useMovieVideos";
import ReviewItem from "../../pages/Homepage/components/ReviewItem/ReviewItem";
import "./MovieDetailPage.style.css";
import { useRecommendationsQuery } from "../../hook/useRecommendations";
import MovieCard from "../../common/MovieCard/MovieCard";

const MovieDetailPage = () => {
  const { id } = useParams();
  const [showTrailerModal, setShowTrailerModal] = useState(false);

  const { data: movie, isLoading, isError, error } = useMovieDetailQuery(id);
  const { data: reviews, isLoading: reviewsLoading } = useMovieReviewsQuery(id);
  const { data: trailer } = useMovieVideosQuery(id);
  const { data: recommendations, isLoading: recommendationsLoading } = useRecommendationsQuery(id);

  // 디버깅용 로그
  console.log("Movie ID:", id);
  console.log("Recommendations:", recommendations);
  console.log("Recommendations Loading:", recommendationsLoading);

  const defaultImage = "https://media.istockphoto.com/id/1396814518/ko/%EB%B2%A1%ED%84%B0/%EC%9D%B4%EB%AF%B8%EC%A7%80%EA%B0%80-%EA%B3%A7-%EC%B6%9C%EC%8B%9C-%EB%90%A0-%EC%98%88%EC%A0%95%EC%9E%85%EB%8B%88%EB%8B%A4-%EC%82%AC%EC%A7%84%EC%9D%B4-%EC%97%86%EC%9C%BC%EB%A9%B0-%EC%8D%B8%EB%84%A4%EC%9D%BC-%EC%9D%B4%EB%AF%B8%EC%A7%80%EB%A5%BC-%EC%82%AC%EC%9A%A9%ED%95%A0-%EC%88%98-%EC%97%86%EC%8A%B5%EB%8B%88%EB%8B%A4-%EB%B2%A1%ED%84%B0-%EC%9D%BC%EB%9F%AC%EC%8A%A4%ED%8A%B8-%EB%A0%88%EC%9D%B4-%EC%85%98.jpg?s=612x612&w=0&k=20&c=1h_M2LcQTtyn0tc_aE0CU8OBki5dYkNwiCANxmOBqQM=";

  if (isLoading) {
    return (
      <div className="spinner-area">
        <Spinner animation="border" variant="danger" style={{ width: "5rem", height: "5rem" }} />
      </div>
    );
  }

  if (isError) {
    return <Alert variant="danger">{error.message}</Alert>;
  }

  const trailerOpts = {
    width: "100%",
    height: "500",
    playerVars: {
      autoplay: 1,
    },
  };
  const posterUrl = movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : defaultImage;
  return (
    <div className="movie-detail-page">
      {/* 배경 이미지 */}
      <div
        className="movie-backdrop"
        style={{
          backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.9) 30%, rgba(0,0,0,0.5) 70%, rgba(0,0,0,0.9)), url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
        }}
      />

      <Container className="movie-detail-content">
        <Row>
          {/* 포스터 */}
          <Col lg={3} md={4} className="mb-4">
            <img src={posterUrl} alt={movie.title} className="movie-detail-poster" onError={(e) => (e.target.src = defaultImage)} />

            {/* 예고편 버튼 */}
            {trailer && (
              <Button variant="danger" className="w-100 mt-3 trailer-btn" onClick={() => setShowTrailerModal(true)}>
                <span className="me-2">▶</span>
                예고편
              </Button>
            )}
          </Col>

          {/* 영화 정보 */}
          <Col lg={9} md={8}>
            <div className="movie-detail-info">
              {/* 제목 */}
              <h1 className="movie-title">{movie.title}</h1>

              {/* 태그라인 */}
              {movie.tagline && <p className="movie-tagline">"{movie.tagline}"</p>}

              {/* 장르 */}
              <div className="movie-genres mb-3">
                {movie.genres.map((genre) => (
                  <Badge key={genre.id} bg="danger" className="me-2">
                    {genre.name}
                  </Badge>
                ))}
              </div>

              {/* 평점 및 기본 정보 */}
              <div className="movie-stats mb-4">
                <div className="stat-item">
                  <span className="stat-icon">⭐</span>
                  <div>
                    <div className="stat-value">{movie.vote_average.toFixed(1)}</div>
                    <div className="stat-label">평점</div>
                  </div>
                </div>
                <div className="stat-item">
                  <span className="stat-icon">👥</span>
                  <div>
                    <div className="stat-value">{movie.vote_count.toLocaleString()}</div>
                    <div className="stat-label">투표수</div>
                  </div>
                </div>
                <div className="stat-item">
                  <span className="stat-icon">👍</span>
                  <div>
                    <div className="stat-value">{movie.popularity.toFixed(0)}</div>
                    <div className="stat-label">인기도</div>
                  </div>
                </div>
                {movie.adult && (
                  <div className="stat-item">
                    <Badge bg="warning" text="dark">
                      🔞
                    </Badge>
                  </div>
                )}
              </div>

              {/* 상세 정보 */}
              <div className="movie-details mb-4">
                <div className="detail-row">
                  <span className="detail-label">개봉일:</span>
                  <span className="detail-value">{movie.release_date}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">상영시간:</span>
                  <span className="detail-value">{movie.runtime}분</span>
                </div>
                {movie.revenue > 0 && (
                  <div className="detail-row">
                    <span className="detail-label">수익:</span>
                    <span className="detail-value">${movie.revenue.toLocaleString()}</span>
                  </div>
                )}
                {movie.budget > 0 && (
                  <div className="detail-row">
                    <span className="detail-label">제작비:</span>
                    <span className="detail-value">${movie.budget.toLocaleString()}</span>
                  </div>
                )}
              </div>

              {/* 줄거리 */}
              <div className="movie-overview">
                <h4>줄거리:</h4>
                <p>{movie.overview || "줄거리 정보가 없습니다."}</p>
              </div>
            </div>
          </Col>
        </Row>
        {/* 추천 영화 섹션 */}
        <Row className="mt-5">
          <Col>
            <h3 className="section-title">추천 영화</h3>
            {recommendationsLoading ? (
              <div className="text-center">
                <Spinner animation="border" variant="danger" />
              </div>
            ) : recommendations && recommendations.length > 0 ? (
              <Row>
                {recommendations.map((movie) => (
                  <Col key={movie.id} lg={2} md={4} sm={6} xs={6}>
                    <MovieCard movie={movie} />
                  </Col>
                ))}
              </Row>
            ) : (
              <Alert variant="secondary">추천 영화가 없습니다.</Alert>
            )}
          </Col>
        </Row>

        {/* 리뷰 섹션 */}
        <Row className="mt-5">
          <Col>
            <h3 className="section-title">리뷰</h3>
            {reviewsLoading ? (
              <Spinner animation="border" variant="danger" />
            ) : reviews && reviews.length > 0 ? (
              <div className="reviews-container">
                {reviews.map((review) => (
                  <ReviewItem key={review.id} review={review} />
                ))}
              </div>
            ) : (
              <Alert variant="secondary">아직 작성된 리뷰가 없습니다.</Alert>
            )}
          </Col>
        </Row>
      </Container>

      {/* 예고편 모달 */}
      <Modal show={showTrailerModal} onHide={() => setShowTrailerModal(false)} size="xl" centered className="trailer-modal">
        <Modal.Header closeButton className="border-0 bg-dark text-white">
          <Modal.Title>예고편</Modal.Title>
        </Modal.Header>
        <Modal.Body className="bg-dark p-0">{trailer && <YouTube videoId={trailer.key} opts={trailerOpts} />}</Modal.Body>
      </Modal>
    </div>
  );
};

export default MovieDetailPage;
