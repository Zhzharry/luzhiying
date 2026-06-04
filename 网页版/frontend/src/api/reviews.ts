import { http } from "./http";

export const reviewsApi = {
  create: (payload: Record<string, unknown>) => http.post("/reviews", payload),
  mine: () => http.get("/me/reviews"),
  helpful: (id: number) => http.patch(`/reviews/${id}/helpful`),
  byCamp: (slug: string, sortBy = "latest") => http.get(`/reviews/camp/${slug}`, { params: { sortBy } }),
};
