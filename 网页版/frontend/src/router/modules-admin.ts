import type { RouteRecordRaw } from "vue-router";

import AdminLayout from "@/layouts/AdminLayout.vue";

export const adminRoutes: RouteRecordRaw[] = [
  {
    path: "/admin",
    component: AdminLayout,
    children: [
      { path: "camps", name: "admin-camps", component: () => import("@/views/admin/CampsAdminView.vue") },
      { path: "guides", name: "admin-guides", component: () => import("@/views/admin/GuidesAdminView.vue") },
      { path: "reviews", name: "admin-reviews", component: () => import("@/views/admin/ReviewsAdminView.vue") },
    ],
  },
];
