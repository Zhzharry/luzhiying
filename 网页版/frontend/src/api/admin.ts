import { http } from "./http";

export const adminApi = {
  camps: () => http.get("/admin/camps"),
  guides: () => http.get("/admin/guides"),
  reviews: () => http.get("/admin/reviews"),
};
