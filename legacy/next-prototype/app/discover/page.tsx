import { DiscoverClient } from "@/components/camps/discover-client";
import { getCampFilters, getCampList } from "@/lib/queries/camps";
import { campQuerySchema } from "@/lib/validators/camp";
import type { SearchParams } from "@/types";

export default async function DiscoverPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const resolved = await searchParams;
  const parsed = campQuerySchema.parse({
    ...resolved,
    keyword: Array.isArray(resolved.keyword) ? resolved.keyword[0] : resolved.keyword,
    city: Array.isArray(resolved.city) ? resolved.city[0] : resolved.city,
    theme: Array.isArray(resolved.theme) ? resolved.theme[0] : resolved.theme,
    sortBy: Array.isArray(resolved.sortBy) ? resolved.sortBy[0] : resolved.sortBy,
    canOvernight: Array.isArray(resolved.canOvernight) ? resolved.canOvernight[0] : resolved.canOvernight,
    allowFire: Array.isArray(resolved.allowFire) ? resolved.allowFire[0] : resolved.allowFire,
    petFriendly: Array.isArray(resolved.petFriendly) ? resolved.petFriendly[0] : resolved.petFriendly,
    familyFriendly: Array.isArray(resolved.familyFriendly) ? resolved.familyFriendly[0] : resolved.familyFriendly,
    hasToilet: Array.isArray(resolved.hasToilet) ? resolved.hasToilet[0] : resolved.hasToilet,
    hasShower: Array.isArray(resolved.hasShower) ? resolved.hasShower[0] : resolved.hasShower,
    hasPower: Array.isArray(resolved.hasPower) ? resolved.hasPower[0] : resolved.hasPower,
    carAccessible: Array.isArray(resolved.carAccessible) ? resolved.carAccessible[0] : resolved.carAccessible,
  });

  const [filters, result] = await Promise.all([
    getCampFilters(),
    getCampList(parsed),
  ]);

  return (
    <div className="shell py-10">
      <div className="mb-6 space-y-2">
        <div className="text-sm font-semibold text-[var(--muted)]">找营地</div>
        <h1 className="text-4xl font-bold">用结构化信息把候选营地缩小到 2 到 4 个。</h1>
        <p className="max-w-3xl text-sm leading-7 text-[var(--muted)]">
          这一页是露之营的核心。先筛条件，再看地图点位，再进详情页判断值不值得去。
        </p>
      </div>

      <DiscoverClient
        camps={result.items}
        cities={filters.cities}
        tags={filters.tags}
        selected={Object.fromEntries(Object.entries(parsed).map(([key, value]) => [key, value === undefined ? undefined : String(value)]))}
      />
    </div>
  );
}
