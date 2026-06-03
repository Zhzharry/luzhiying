import { http } from "./http";

export const guidesApi = {
  list: () => http.get("/guides"),
  detail: (slug: string) => http.get(`/guides/${slug}`),
};
