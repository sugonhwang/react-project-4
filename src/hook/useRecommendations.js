import { useQuery } from "@tanstack/react-query";
import api from "../utils/api";

const fetchRecommendations = (id) => {
  return api.get(`/movie/${id}/recommendations`);
};

export const useRecommendationsQuery = (id) => {
  return useQuery({
    queryKey: ["movie-recommendations", id],
    queryFn: () => fetchRecommendations(id),
    select: (result) => {
      console.log("Raw recommendations data:", result.data); // 디버깅 로그
      return result.data.results.slice(0, 6); // 상위 6개만
    },
  });
};
