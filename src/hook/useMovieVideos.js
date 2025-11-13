import { useQuery } from "@tanstack/react-query";
import api from "../utils/api";

const fetchMovieVideos = (id) => {
  return api.get(`/movie/${id}/videos`);
};

export const useMovieVideosQuery = (id) => {
  return useQuery({
    queryKey: ["movie-videos", id],
    queryFn: () => fetchMovieVideos(id),
    select: (result) => {
      // YouTube 예고편만 필터링
      const videos = result.data.results;
      return videos.find((video) => video.type === "Trailer" && video.site === "YouTube") || videos[0];
    },
    enabled: !!id, // id가 있을 때만 실행
  });
};
