import { request } from "./http";
import type { GuideItem } from "@/types";

export function fetchGuides(params?: Record<string, unknown>) {
  return request<GuideItem[]>({
    url: "/guides",
    method: "GET",
    data: params,
  });
}
