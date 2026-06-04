import { request } from "./http";
import type { CampCardItem } from "@/types";

export function fetchCamps(params?: Record<string, unknown>) {
  return request<{ list: CampCardItem[] }>({
    url: "/camps",
    method: "GET",
    data: params,
  });
}
