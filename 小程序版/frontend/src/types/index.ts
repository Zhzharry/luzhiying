export interface SessionUser {
  id: number;
  name: string;
  email: string;
  role: "USER" | "ADMIN";
  token: string;
  expiresAt?: string;
}

export interface CampCardItem {
  id: number;
  slug: string;
  name: string;
  city: string;
  district: string;
  summary: string;
  priceText: string;
  score: number;
  distanceKm?: number | null;
}

export interface GuideItem {
  id: number;
  slug: string;
  title: string;
  summary: string;
  category: string;
  cityScope: string;
}
