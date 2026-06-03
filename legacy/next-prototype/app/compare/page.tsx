import Link from "next/link";

import { prisma } from "@/lib/db";
import { mapCampCard } from "@/lib/mappers/camp";

export default async function ComparePage({
  searchParams,
}: {
  searchParams: Promise<{ ids?: string | string[] }>;
}) {
  const resolved = await searchParams;
  const idsParam = Array.isArray(resolved.ids) ? resolved.ids[0] : resolved.ids;
  const ids = idsParam ? idsParam.split(",").slice(0, 4) : [];

  const camps = ids.length
    ? await prisma.camp.findMany({
        where: { id: { in: ids } },
        include: {
          facility: true,
          tags: { include: { tag: true } },
          reviews: { where: { status: "APPROVED" } },
          _count: { select: { reviews: true, favoriteItems: true } },
        },
      })
    : [];

  const items = camps.map(mapCampCard);

  return (
    <div className="shell py-10">
      <div className="mb-6 space-y-2">
        <div className="text-sm font-semibold text-[var(--muted)]">营地对比</div>
        <h1 className="text-4xl font-bold">最多并排看 4 个候选营地。</h1>
      </div>

      {items.length === 0 ? (
        <div className="card rounded-[32px] p-8 text-sm text-[var(--muted)]">
          当前还没有选择对比项。可以先去 <Link href="/favorites" className="font-semibold text-[var(--accent)]">收藏页</Link> 选择候选营地。
        </div>
      ) : (
        <div className="card overflow-x-auto rounded-[32px] p-6">
          <table className="min-w-full border-separate border-spacing-0 text-sm">
            <thead>
              <tr>
                <th className="border-b border-[var(--line)] px-4 py-3 text-left">字段</th>
                {items.map((camp) => (
                  <th key={camp.id} className="border-b border-[var(--line)] px-4 py-3 text-left">
                    <div className="font-semibold">{camp.name}</div>
                    <div className="mt-1 text-xs text-[var(--muted)]">{camp.city} · {camp.district}</div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                ["价格", (camp: (typeof items)[number]) => `${camp.priceMin ?? 0}-${camp.priceMax ?? 0}`],
                ["评分", (camp) => `${camp.ratingAvg || "暂无"}`],
                ["可过夜", (camp) => (camp.facility?.canOvernight ? "是" : "否")],
                ["卫生间", (camp) => (camp.facility?.hasToilet ? "有" : "无")],
                ["亲子友好", (camp) => (camp.facility?.familyFriendly ? "是" : "否")],
                ["最佳季节", (camp) => camp.bestSeason],
              ].map(([label, render]) => (
                <tr key={label}>
                  <td className="border-b border-[var(--line)] px-4 py-4 font-semibold">{label}</td>
                  {items.map((camp) => (
                    <td key={camp.id + label} className="border-b border-[var(--line)] px-4 py-4 text-[var(--muted)]">
                      {render(camp)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
