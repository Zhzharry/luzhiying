import { http } from "./http";

export const correctionsApi = {
  create: (payload: Record<string, unknown>) => http.post("/corrections", payload),
};
