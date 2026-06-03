import { http } from "./http";

export const authApi = {
  login: (payload: { email: string; password: string }) => http.post("/auth/login", payload),
  register: (payload: { name: string; email: string; password: string }) =>
    http.post("/auth/register", payload),
  session: () => http.get("/auth/session"),
};
