import { http } from "./http";

export const guidesApi = {
  list: (params?: Record<string, unknown>) => http.get("/guides", { params }),
  detail: (slug: string) => http.get(`/guides/${slug}`),
};
