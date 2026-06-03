import { defineStore } from "pinia";

export const useDiscoverStore = defineStore("discover", {
  state: () => ({
    keyword: "",
    city: "",
    theme: "",
    sortBy: "recommended",
  }),
});
