import { useQuery } from "@tanstack/react-query";
import api from "../utils/api";

const fetchNowPlayMovie = () => {
  return api.get(`/movie/now_playing`);
};

export const useNowPlayMoviesQuery = () => {
  return useQuery({
    queryKey: ["movie-now_playing"],
    queryFn: fetchNowPlayMovie,
    select: (result) => result.data,
  });
};
