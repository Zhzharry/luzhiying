import { http } from "./http";

export const adminApi = {
  camps: () => http.get("/admin/camps"),
  guides: () => http.get("/admin/guides"),
  reviews: () => http.get("/admin/reviews"),
  updateReviewStatus: (id: number, status: string) => http.patch(`/admin/reviews/${id}/status`, { status }),
};
