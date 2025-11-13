import { useQuery } from "@tanstack/react-query";
import api from "../utils/api";

const fetchSearchMovie = ({ keyword, page, sortBy, genreId }) => {
  // 키워드가 있으면 검색 API 사용
  if (keyword) {
    return api.get(`/search/movie`, {
      params: {
        query: keyword,
        page: page,
      },
    });
  }
  // 키워드가 없으면 discover API 사용(정렬, 장르 필터 기능)
  const params = {
    sort_by: sortBy,
    page: page,
  };
  // 장르가 선택되었으면 추가
  if (genreId) {
    params.with_genres = genreId;
  }
  return api.get(`/discover/movie`, { params });
};

export const useSearchMovieQuery = ({ keyword, page, sortBy = "popularity.desc", genreId }) => {
  return useQuery({
    queryKey: ["movie-search", keyword, page, sortBy, genreId],
    queryFn: () => fetchSearchMovie({ keyword, page, sortBy, genreId }),
    select: (result) => result.data,
  });
};
