import { createRouter, createWebHistory } from "vue-router";

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

export default router;
