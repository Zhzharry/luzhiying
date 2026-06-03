import { http } from "./http";

export const reviewsApi = {
  create: (payload: Record<string, unknown>) => http.post("/reviews", payload),
};
