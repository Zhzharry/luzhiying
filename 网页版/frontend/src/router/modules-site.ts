import type { RouteRecordRaw } from "vue-router";

import SiteLayout from "@/layouts/SiteLayout.vue";

export const siteRoutes: RouteRecordRaw[] = [
  {
    path: "/",
    component: SiteLayout,
    children: [
      { path: "", name: "home", component: () => import("@/views/site/HomeView.vue") },
      { path: "discover", name: "discover", component: () => import("@/views/site/DiscoverView.vue") },
      { path: "camps/:slug", name: "camp-detail", component: () => import("@/views/site/CampDetailView.vue") },
      { path: "favorites", name: "favorites", meta: { requiresAuth: true }, component: () => import("@/views/site/FavoritesView.vue") },
      { path: "compare", name: "compare", component: () => import("@/views/site/CompareView.vue") },
      { path: "guides", name: "guides", meta: { requiresAuth: true }, component: () => import("@/views/site/GuidesView.vue") },
      { path: "guides/:slug", name: "guide-detail", meta: { requiresAuth: true }, component: () => import("@/views/site/GuideDetailView.vue") },
      { path: "login", name: "login", component: () => import("@/views/site/LoginView.vue") },
      { path: "register", name: "register", component: () => import("@/views/site/RegisterView.vue") },
      { path: "me", name: "me", meta: { requiresAuth: true }, component: () => import("@/views/site/MeView.vue") },
      { path: "reviews/new", name: "review-create", meta: { requiresAuth: true }, component: () => import("@/views/site/ReviewCreateView.vue") },
    ],
  },
];
