import { defineStore } from "pinia";

type UserSession = {
  id: string;
  name: string;
  email: string;
  role: "USER" | "ADMIN";
} | null;

export const useAuthStore = defineStore("auth", {
  state: () => ({
    session: null as UserSession,
    token: "",
  }),
  actions: {
    setSession(session: UserSession, token = "") {
      this.session = session;
      this.token = token;
    },
    logout() {
      this.session = null;
      this.token = "";
    },
  },
});
