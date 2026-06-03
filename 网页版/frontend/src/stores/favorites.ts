import { defineStore } from "pinia";

export const useFavoritesStore = defineStore("favorites", {
  state: () => ({
    activeListId: "",
    compareIds: [] as string[],
  }),
});
