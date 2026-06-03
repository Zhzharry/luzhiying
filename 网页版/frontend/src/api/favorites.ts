import { http } from "./http";

export const favoritesApi = {
  list: () => http.get("/favorite-lists"),
  create: (name: string) => http.post("/favorite-lists", { name }),
};
