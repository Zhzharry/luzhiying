import { defineStore } from "pinia";

export const useAppStore = defineStore("app", {
  state: () => ({
    appName: "露之营",
    backendBaseUrl: "http://localhost:8080/api",
  }),
});
