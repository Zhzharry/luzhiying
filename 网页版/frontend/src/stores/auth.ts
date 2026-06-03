import { defineStore } from "pinia";
import { authApi } from "@/api/auth";
import type { ApiResponse, SessionUser } from "@/types/api";

const STORAGE_KEY = "luying-auth-session";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    session: null as SessionUser | null,
    token: "",
  }),
  getters: {
    isAuthenticated: (state) => Boolean(state.session && state.token),
    isAdmin: (state) => state.session?.role === "ADMIN",
  },
  actions: {
    hydrate() {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) {
        return;
      }
      try {
        const parsed = JSON.parse(raw) as { session: SessionUser; token: string };
        this.session = parsed.session;
        this.token = parsed.token;
      } catch {
        localStorage.removeItem(STORAGE_KEY);
      }
    },
    persist() {
      if (!this.session || !this.token) {
        localStorage.removeItem(STORAGE_KEY);
        return;
      }
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          session: this.session,
          token: this.token,
        }),
      );
    },
    setSession(session: SessionUser | null, token = "") {
      this.session = session;
      this.token = token;
      this.persist();
    },
    async login(payload: { email: string; password: string }) {
      const response = await authApi.login(payload);
      const session = (response.data as ApiResponse<SessionUser>).data;
      this.setSession(session, session.token);
      return session;
    },
    async register(payload: { name: string; email: string; password: string }) {
      const response = await authApi.register(payload);
      const session = (response.data as ApiResponse<SessionUser>).data;
      this.setSession(session, session.token);
      return session;
    },
    async fetchSession() {
      if (!this.token) {
        return null;
      }
      try {
        const response = await authApi.session();
        const session = (response.data as ApiResponse<SessionUser | null>).data;
        if (session) {
          this.setSession(session, session.token);
        } else {
          this.logout();
        }
        return session;
      } catch {
        this.logout();
        return null;
      }
    },
    logout() {
      this.session = null;
      this.token = "";
      this.persist();
    },
  },
});
