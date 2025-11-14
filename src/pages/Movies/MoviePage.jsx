import React, { useState, useEffect, useMemo } from "react";
import { useSearchMovieQuery } from "../../hook/useSearchMovie";
import { useSearchParams } from "react-router-dom";
import { Alert, Col, Container, Row, Spinner } from "react-bootstrap";
import MovieCard from "../../common/MovieCard/MovieCard";
import ReactPaginate from "react-paginate";
import "./MoviePage.style.css";
import { useMovieGenreQuery } from "../../hook/useMovieGenre";

const MoviePage = () => {
  const [query, setQuery] = useSearchParams();
  const [sortBy, setSortBy] = useState("popularity.desc");
  const [selectedGenre, setSelectedGenre] = useState("");
  const [windowWidth, setWindowWidth] = useState(window.innerWidth); // innnerWidth 오타 수정

  // URL에서 페이지와 키워드 가져오기
  const keyword = query.get("q");
  const page = parseInt(query.get("page")) || 1;

  const { data, isLoading, isError, error } = useSearchMovieQuery({
    keyword,
    page,
    sortBy,
    genreId: keyword ? undefined : selectedGenre,
  });

  const { data: genreData } = useMovieGenreQuery();

  // 반응형을 위한 window resize 감지
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // 화면 크기에 따라 페이지네이션 설정
  const getPageRangeDisplayed = () => {
    if (windowWidth < 576) return 1;
    if (windowWidth < 768) return 2; // 부등호 방향 수정
    return 3;
  };

  const getMarginPagesDisplayed = () => {
    if (windowWidth < 576) return 1;
    return 2;
  };

  // 키워드 검색했을 때 클라이언트에서 장르 필터링 & 정렬
  const filteredAndSortedMovies = useMemo(() => {
    if (!data?.results) return [];

    let movies = [...data.results];

    // 검색했을 때 클라이언트 처리
    if (keyword) {
      // 장르 필터링
      if (selectedGenre) {
        movies = movies.filter((movie) => movie.genre_ids?.includes(Number(selectedGenre)));
      }

      // 인기도 정렬
      if (sortBy === "popularity.desc") {
        movies.sort((a, b) => b.popularity - a.popularity);
      } else if (sortBy === "popularity.asc") {
        movies.sort((a, b) => a.popularity - b.popularity);
      }
    }

    return movies;
  }, [data?.results, keyword, selectedGenre, sortBy]);

  const handlePageClick = ({ selected }) => {
    const newPage = selected + 1;

    // 현재 쿼리 파라미터 유지하면서 페이지만 변경
    const newQuery = {};
    query.forEach((value, key) => {
      newQuery[key] = value;
    });
    newQuery.page = newPage;

    setQuery(newQuery);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSortChange = (e) => {
    setSortBy(e.target.value);

    // 정렬 변경 시 1페이지로
    const newQuery = {};
    query.forEach((value, key) => {
      if (key !== "page") {
        newQuery[key] = value;
      }
    });
    newQuery.page = 1;
    setQuery(newQuery);
  };

  const handleGenreChange = (e) => {
    setSelectedGenre(e.target.value);

    if (!keyword) {
      // 장르 변경 시 1페이지로
      const newQuery = {};
      query.forEach((value, key) => {
        if (key !== "page") {
          newQuery[key] = value;
        }
      });
      newQuery.page = 1;
      setQuery(newQuery);
    }
  };

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

  return (
    <Container>
      <Row>
        <Col lg={4} xs={12}>
          {/* 장르 필터 */}
          <div className="mb-3">
            <label htmlFor="genre-select" className="form-label fw-bold">
              장르
            </label>
            <select id="genre-select" className="form-select" value={selectedGenre} onChange={handleGenreChange}>
              <option value="">전체</option>
              {genreData?.map((genre) => (
                <option key={genre.id} value={genre.id}>
                  {genre.name}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-3">
            <label htmlFor="sort-select" className="form-label fw-bold">
              정렬
            </label>
            <select id="sort-select" className="form-select" value={sortBy} onChange={handleSortChange}>
              {keyword ? (
                <>
                  <option value="popularity.desc">인기도 높은순</option>
                  <option value="popularity.asc">인기도 낮은순</option>
                </>
              ) : (
                <>
                  <option value="popularity.desc">인기도 높은순</option>
                  <option value="popularity.asc">인기도 낮은순</option>
                  <option value="vote_average.desc">평점 높은순</option>
                  <option value="vote_average.asc">평점 낮은순</option>
                  <option value="release_date.desc">최신순</option>
                  <option value="release_date.asc">오래된순</option>
                  <option value="revenue.desc">수익 높은순</option>
                </>
              )}
            </select>
          </div>
        </Col>

        <Col lg={8} xs={12}>
          <Row>
            {filteredAndSortedMovies.map((movie) => (
              <Col key={movie.id} lg={4} md={6} xs={12}>
                {" "}
                <MovieCard movie={movie} />
              </Col>
            ))}
          </Row>

          {filteredAndSortedMovies.length === 0 && <Alert variant="warning">조건에 맞는 영화가 없습니다.</Alert>}

          <ReactPaginate
            nextLabel="next >"
            onPageChange={handlePageClick}
            pageRangeDisplayed={getPageRangeDisplayed()} // 함수 호출 추가
            marginPagesDisplayed={getMarginPagesDisplayed()} // 함수 호출 추가
            pageCount={Math.min(data?.total_pages, 500)}
            previousLabel="< previous" // prev -> previous
            pageClassName="page-item"
            pageLinkClassName="page-link"
            previousClassName="page-item"
            previousLinkClassName="page-link"
            nextClassName="page-item"
            nextLinkClassName="page-link"
            breakLabel="..."
            breakClassName="page-item"
            breakLinkClassName="page-link"
            containerClassName="pagination"
            activeClassName="active"
            renderOnZeroPageCount={null}
            forcePage={page - 1}
          />
        </Col>
      </Row>
    </Container>
  );
};

export default MoviePage;
