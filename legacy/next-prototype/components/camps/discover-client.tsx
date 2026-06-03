"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

import { CampCard } from "@/components/camps/camp-card";
import { serializeSearchParams } from "@/lib/utils";

type CampItem = {
  id: string;
  slug: string;
  name: string;
  city: string;
  district: string;
  summary: string;
  coverImage: string;
  priceMin?: number | null;
  priceMax?: number | null;
  bestSeason: string;
  ratingAvg: number;
  reviewCount: number;
  tags: Array<{ id: string; name: string; slug: string }>;
  mapRegionKey: string;
  mapX: number;
  mapY: number;
  facility: {
    canOvernight: boolean;
    familyFriendly: boolean;
    hasToilet: boolean;
  } | null;
};

type DiscoverClientProps = {
  camps: CampItem[];
  cities: string[];
  tags: Array<{ id: string; name: string; slug: string; category: string }>;
  selected: Record<string, string | undefined>;
};

const booleanFilters = [
  ["canOvernight", "可过夜"],
  ["allowFire", "可明火"],
  ["petFriendly", "宠物友好"],
  ["familyFriendly", "亲子友好"],
  ["hasToilet", "有卫生间"],
  ["hasShower", "有淋浴"],
  ["hasPower", "有电源"],
  ["carAccessible", "车可到附近"],
] as const;

export function DiscoverClient({ camps, cities, tags, selected }: DiscoverClientProps) {
  const [highlightedId, setHighlightedId] = useState<string | null>(camps[0]?.id ?? null);

  const mapPoints = useMemo(() => camps.map((camp) => ({ id: camp.id, x: camp.mapX, y: camp.mapY, name: camp.name })), [camps]);

  return (
    <div className="grid gap-6 lg:grid-cols-[380px_minmax(0,1fr)]">
      <section className="space-y-4">
        <form className="card rounded-[28px] p-5" method="get">
          <div className="space-y-5">
            <div>
              <label className="mb-2 block text-sm font-semibold">关键词</label>
              <input
                name="keyword"
                defaultValue={selected.keyword}
                className="w-full rounded-2xl border border-[var(--line)] bg-white/60 px-4 py-3 outline-none"
                placeholder="搜索营地、区域、特点"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold">城市</label>
              <select
                name="city"
                defaultValue={selected.city ?? ""}
                className="w-full rounded-2xl border border-[var(--line)] bg-white/60 px-4 py-3 outline-none"
              >
                <option value="">全部城市</option>
                {cities.map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="mb-3 block text-sm font-semibold">主题标签</label>
              <div className="flex flex-wrap gap-2">
                {tags.slice(0, 10).map((tag) => {
                  const href = `/discover?${serializeSearchParams({ ...selected, theme: tag.slug })}`;
                  return (
                    <Link
                      key={tag.id}
                      href={href}
                      className={`rounded-full px-3 py-2 text-xs ${
                        selected.theme === tag.slug
                          ? "bg-[var(--accent)] text-white"
                          : "border border-[var(--line)] text-[var(--muted)]"
                      }`}
                    >
                      {tag.name}
                    </Link>
                  );
                })}
              </div>
            </div>

            <div>
              <label className="mb-3 block text-sm font-semibold">设施条件</label>
              <div className="grid grid-cols-2 gap-3 text-sm">
                {booleanFilters.map(([name, label]) => (
                  <label key={name} className="flex items-center gap-2 rounded-2xl border border-[var(--line)] px-3 py-2">
                    <input
                      type="checkbox"
                      name={name}
                      value="true"
                      defaultChecked={selected[name] === "true"}
                    />
                    <span>{label}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold">排序</label>
              <select
                name="sortBy"
                defaultValue={selected.sortBy ?? "recommended"}
                className="w-full rounded-2xl border border-[var(--line)] bg-white/60 px-4 py-3 outline-none"
              >
                <option value="recommended">推荐优先</option>
                <option value="rating">评分最高</option>
                <option value="newbie">最适合新手</option>
                <option value="price">价格友好</option>
              </select>
            </div>

            <button className="w-full rounded-full bg-[var(--accent)] px-4 py-3 font-semibold text-white">
              更新结果
            </button>
          </div>
        </form>

        <div className="space-y-4">
          {camps.length > 0 ? (
            camps.map((camp) => (
              <div key={camp.id} onMouseEnter={() => setHighlightedId(camp.id)}>
                <CampCard camp={camp} compact highlighted={highlightedId === camp.id} />
              </div>
            ))
          ) : (
            <div className="card rounded-[28px] p-6 text-sm text-[var(--muted)]">
              没有找到符合条件的营地。建议去掉 1 到 2 个限制条件，或先改成热门城市查看。
            </div>
          )}
        </div>
      </section>

      <section className="card sticky top-24 h-[calc(100vh-140px)] overflow-hidden rounded-[34px] p-4">
        <div className="grid-lines relative h-full rounded-[28px] bg-[linear-gradient(160deg,#e7efe7_0%,#f6f2e9_100%)]">
          <div className="absolute left-5 top-5 rounded-full bg-white/80 px-4 py-2 text-xs font-semibold text-[var(--accent-strong)]">
            静态地图模拟
          </div>
          <div className="absolute right-5 top-5 rounded-full border border-[var(--line)] bg-white/70 px-4 py-2 text-xs text-[var(--muted)]">
            {camps.length} 个结果
          </div>

          {mapPoints.map((point) => (
            <button
              key={point.id}
              type="button"
              onMouseEnter={() => setHighlightedId(point.id)}
              className={`absolute grid h-8 w-8 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full text-xs font-bold text-white shadow-lg transition-all ${
                highlightedId === point.id ? "scale-125 bg-[var(--warning)]" : "bg-[var(--accent)]"
              }`}
              style={{ left: `${point.x}%`, top: `${point.y}%` }}
              title={point.name}
            >
              营
            </button>
          ))}

          <div className="absolute bottom-5 left-5 right-5 rounded-[24px] bg-[rgba(255,251,244,0.88)] p-4 shadow-lg backdrop-blur">
            <div className="text-sm font-semibold">当前地图说明</div>
            <div className="mt-2 text-sm leading-7 text-[var(--muted)]">
              这一版故意不接入真实地图 SDK，重点验证筛选、点位联动、营地详情和收藏决策链路。等 MVP 跑顺后，可直接替换为高德或 Mapbox 渲染层。
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
