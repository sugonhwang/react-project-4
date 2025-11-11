import { useQuery } from "@tanstack/react-query";
import api from "../utils/api";

const fetchSearchMovie = ({ keyword, page, sortBy }) => {
  if (keyword) {
    return api.get(`/search/movie?query=${keyword}&page=${page}`);
  }

  return api.get(`/discover/movie?sort_by=${sortBy}&page=${page}`);
  // return keyword ? api.get(`/search/movie?query=${keyword}&page=${page}`) : api.get(`/movie/popular?page=${page}`);
};

export const useSearchMovieQuery = ({ keyword, page, sortBy = "popularity.desc" }) => {
  return useQuery({
    queryKey: ["movie-search", keyword, page, sortBy],
    queryFn: () => fetchSearchMovie({ keyword, page, sortBy }),
    select: (result) => result.data,
  });
};
