import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "@/stores/auth";

import { adminRoutes } from "./modules-admin";
import { siteRoutes } from "./modules-site";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    ...siteRoutes,
    ...adminRoutes,
    {
      path: "/:pathMatch(.*)*",
      redirect: "/",
    },
  ],
});

router.beforeEach((to) => {
  const authStore = useAuthStore();
  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    return {
      name: "login",
      query: { redirect: to.fullPath },
    };
  }
  if (to.path.startsWith("/admin") && !authStore.isAdmin) {
    return authStore.isAuthenticated ? { name: "home" } : { name: "login", query: { redirect: to.fullPath } };
  }
  return true;
});

export default router;
