import { http } from "./http";

export const favoritesApi = {
  list: () => http.get("/favorite-lists"),
  create: (name: string) => http.post("/favorite-lists", { name }),
  addItem: (listId: number, campSlug: string) => http.post(`/favorite-lists/${listId}/items`, { campSlug }),
  removeItem: (listId: number, campId: number) => http.delete(`/favorite-lists/${listId}/items/${campId}`),
};
