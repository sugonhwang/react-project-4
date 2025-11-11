import React, { useState, useEffect } from "react";
import { useSearchMovieQuery } from "../../hook/useSearchMovie";
import { useSearchParams } from "react-router-dom";
import { Alert, Col, Container, Row, Spinner } from "react-bootstrap";
import MovieCard from "../../common/MovieCard/MovieCard";
import ReactPaginate from "react-paginate";
import "./MoviePage.style.css";

const MoviePage = () => {
  const [query, setQuery] = useSearchParams();
  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState("popularity.desc");

  const keyword = query.get("q");
  const { data, isLoading, isError, error } = useSearchMovieQuery({ keyword, page, sortBy });

  const handlePageClick = ({ selected }) => {
    setPage(selected + 1);
  };

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
    setPage(1);
  };

  // keyword가 바뀌면 page를 1로 초기화
  useEffect(() => {
    setPage(1);
  }, [keyword]);

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
          {!keyword && (
            <div className="mb-3">
              <label htmlFor="sort-select" className="form-label fw-bold">
                정렬
              </label>
              <select id="sort-select" className="form-select" value={sortBy} onChange={handleSortChange}>
                <option value="popularity.desc">인기도 높은순</option>
                <option value="popularity.asc">인기도 낮은순</option>
                <option value="vote_average.desc">평점 높은순</option>
                <option value="vote_average.asc">평점 낮은순</option>
                <option value="release_date.desc">최신순</option>
                <option value="release_date.asc">오래된순</option>
                <option value="revenue.desc">수익 높은순</option>
              </select>
            </div>
          )}
        </Col>

        <Col lg={8} xs={12}>
          <Row>
            {data?.results.map((movie, index) => (
              <Col key={index} lg={4} xs={12}>
                <MovieCard movie={movie} />
              </Col>
            ))}
          </Row>

          <ReactPaginate nextLabel="next >" onPageChange={handlePageClick} pageRangeDisplayed={2} marginPagesDisplayed={1} pageCount={Math.min(data?.total_pages, 500)} previousLabel="< prev" pageClassName="page-item" pageLinkClassName="page-link" previousClassName="page-item" previousLinkClassName="page-link" nextClassName="page-item" nextLinkClassName="page-link" breakLabel="..." breakClassName="page-item" breakLinkClassName="page-link" containerClassName="pagination" activeClassName="active" renderOnZeroPageCount={null} forcePage={page - 1} />
        </Col>
      </Row>
    </Container>
  );
};

export default MoviePage;
