import Link from "next/link";
import { redirect } from "next/navigation";

import { CampCard } from "@/components/camps/camp-card";
import { getCurrentUser } from "@/lib/auth/current-user";
import { mapCampCard } from "@/lib/mappers/camp";
import { getUserDashboard } from "@/lib/queries/user";

export default async function FavoritesPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/login?next=/favorites");

  const dashboard = await getUserDashboard(user.id);

  return (
    <div className="shell py-10">
      <div className="mb-6 flex items-end justify-between">
        <div>
          <div className="text-sm font-semibold text-[var(--muted)]">我的收藏</div>
          <h1 className="text-4xl font-bold">把候选营地放在一起看。</h1>
        </div>
      </div>

      <div className="space-y-8">
        {dashboard.favoriteLists.map((list) => (
          <section key={list.id} className="card rounded-[32px] p-6">
            <div className="mb-5 flex items-center justify-between">
              <div>
                <div className="text-2xl font-semibold">{list.name}</div>
                <div className="text-sm text-[var(--muted)]">{list.items.length} 个营地</div>
              </div>
              <Link
                href={`/compare?ids=${list.items.map((item) => item.campId).join(",")}`}
                className="rounded-full bg-[var(--accent)] px-4 py-2 text-sm font-semibold text-white"
              >
                进入对比
              </Link>
            </div>
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {list.items.map((item) => (
                <CampCard key={item.id} camp={mapCampCard(item.camp)} compact />
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
