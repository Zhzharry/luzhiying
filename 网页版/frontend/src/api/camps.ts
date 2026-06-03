import { http } from "./http";

export const campsApi = {
  list: (params?: Record<string, unknown>) => http.get("/camps", { params }),
  detail: (slug: string) => http.get(`/camps/${slug}`),
  reviews: (slug: string) => http.get(`/camps/${slug}/reviews`),
  similar: (slug: string) => http.get(`/camps/${slug}/similar`),
  compare: (slugs: string[]) => http.post("/compare", { slugs }),
};
