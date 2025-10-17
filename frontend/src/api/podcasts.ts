import { http } from "./http";
import type {
  ApiResponse,
  Episode,
  FeaturedEpisode,
  Pagination,
} from "@/types";

export interface ListEpisodesParams {
  page?: number;
  limit?: number;
  query?: string;
  category?: string;
  sortBy?:
    | "relevance"
    | "rating"
    | "newest"
    | "popular"
    | "duration"
    | "oldest";
}

export interface ListEpisodesResponse {
  items: Episode[];
  pagination: Pagination;
}

export async function fetchFeaturedEpisodes(): Promise<FeaturedEpisode[]> {
  const res = await http<ApiResponse<FeaturedEpisode[]>>("api/episodes/featured");
  return res.data;
}

export async function fetchEpisodes(
  params: ListEpisodesParams = {}
): Promise<ListEpisodesResponse> {
  const res = await http<ApiResponse<ListEpisodesResponse>>("api/episodes", {
    query: { ...params } as Record<
      string,
      string | number | boolean | undefined
    >,
  });
  return res.data;
}

export async function fetchEpisodeById(id: string | number): Promise<Episode> {
  const res = await http<ApiResponse<Episode>>(`api/episodes/${id}`);
  return res.data;
}
