import { redirect } from "next/navigation";

import { getCurrentUser } from "@/lib/auth/current-user";
import { getUserDashboard } from "@/lib/queries/user";

export default async function MePage() {
  const user = await getCurrentUser();
  if (!user) redirect("/login?next=/me");

  const dashboard = await getUserDashboard(user.id);

  return (
    <div className="shell py-10">
      <div className="mb-6 space-y-2">
        <div className="text-sm font-semibold text-[var(--muted)]">个人中心</div>
        <h1 className="text-4xl font-bold">{user.name} 的露营工作台</h1>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <section className="card rounded-[32px] p-6">
          <div className="text-sm font-semibold text-[var(--muted)]">账号信息</div>
          <div className="mt-4 space-y-3 text-sm">
            <div>邮箱：{user.email}</div>
            <div>角色：{user.role}</div>
            <div>创建时间：{new Date(user.createdAt).toLocaleDateString("zh-CN")}</div>
          </div>
        </section>

        <section className="card rounded-[32px] p-6">
          <div className="text-sm font-semibold text-[var(--muted)]">我的评论</div>
          <div className="mt-4 space-y-3 text-sm text-[var(--muted)]">
            {dashboard.reviews.slice(0, 5).map((review) => (
              <div key={review.id} className="rounded-2xl border border-[var(--line)] px-4 py-3">
                <div className="font-semibold text-[var(--foreground)]">{review.camp.name}</div>
                <div>状态：{review.status}</div>
              </div>
            ))}
          </div>
        </section>

        <section className="card rounded-[32px] p-6">
          <div className="text-sm font-semibold text-[var(--muted)]">纠错反馈</div>
          <div className="mt-4 space-y-3 text-sm text-[var(--muted)]">
            {dashboard.corrections.slice(0, 5).map((item) => (
              <div key={item.id} className="rounded-2xl border border-[var(--line)] px-4 py-3">
                <div className="font-semibold text-[var(--foreground)]">{item.camp.name}</div>
                <div>字段：{item.fieldName}</div>
                <div>状态：{item.status}</div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
