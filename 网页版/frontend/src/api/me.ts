import { http } from "./http";

export const meApi = {
  overview: () => http.get("/me/overview"),
  reviews: () => http.get("/me/reviews"),
};
