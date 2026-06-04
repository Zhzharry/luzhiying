import { request } from "./http";
import type { SessionUser } from "@/types";

export function login(payload: { email: string; password: string }) {
  return request<SessionUser>({
    url: "/auth/login",
    method: "POST",
    data: payload,
  });
}

export function session() {
  return request<SessionUser | null>({
    url: "/auth/session",
    method: "GET",
  });
}
