import { request } from "./http";

export function fetchMeOverview() {
  return request<Record<string, unknown>>({
    url: "/me/overview",
    method: "GET",
  });
}
