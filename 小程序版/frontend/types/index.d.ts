export interface MiniUserSession {
  id: number;
  name: string;
  email: string;
  role: "USER" | "ADMIN";
}
