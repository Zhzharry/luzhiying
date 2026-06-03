import Link from "next/link";

import { cn, formatPrice, scoreLabel } from "@/lib/utils";

type CampCardProps = {
  camp: {
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
    facility?: {
      canOvernight: boolean;
      familyFriendly: boolean;
      hasToilet: boolean;
    } | null;
  };
  compact?: boolean;
  highlighted?: boolean;
};

export function CampCard({ camp, compact, highlighted }: CampCardProps) {
  return (
    <Link
      href={`/camps/${camp.slug}`}
      className={cn(
        "card fade-in block overflow-hidden rounded-[28px] transition-transform duration-200 hover:-translate-y-1",
        highlighted && "ring-2 ring-[var(--accent)]",
      )}
    >
      <div className="h-44 bg-[radial-gradient(circle_at_top,#95b5ad,transparent_40%),linear-gradient(135deg,#496a55,#d7e0d2)]" />
      <div className="space-y-4 p-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="text-lg font-semibold">{camp.name}</div>
            <div className="text-sm text-[var(--muted)]">
              {camp.city} · {camp.district}
            </div>
          </div>
          <div className="rounded-full bg-[var(--accent-soft)] px-3 py-1 text-xs font-semibold text-[var(--accent-strong)]">
            {scoreLabel(camp.ratingAvg)}
          </div>
        </div>

        <p className={cn("text-sm leading-7 text-[var(--muted)]", compact && "line-clamp-2")}>
          {camp.summary}
        </p>

        <div className="flex flex-wrap gap-2">
          {camp.tags.slice(0, 4).map((tag) => (
            <span
              key={tag.id}
              className="rounded-full border border-[var(--line)] px-3 py-1 text-xs text-[var(--muted)]"
            >
              {tag.name}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between border-t border-[var(--line)] pt-4 text-sm">
          <div>
            <div className="font-semibold text-[var(--foreground)]">{formatPrice(camp.priceMin, camp.priceMax)}</div>
            <div className="text-[var(--muted)]">{camp.bestSeason}</div>
          </div>
          <div className="text-right">
            <div className="font-semibold">{camp.ratingAvg || "暂无"}</div>
            <div className="text-[var(--muted)]">{camp.reviewCount} 条评价</div>
          </div>
        </div>
      </div>
    </Link>
  );
}
