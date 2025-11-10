import { useQuery } from "@tanstack/react-query";
import api from "../utils/api";

const fetchTopMovies = () => {
  return api.get(`/movie/top_rated`);
};

export const useTopRateMoviesQuery = () => {
  return useQuery({
    queryKey: ["movie-top_rated"],
    queryFn: fetchTopMovies,
    select: (result) => result.data,
  });
};
