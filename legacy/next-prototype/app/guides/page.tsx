import Link from "next/link";

import { getPublishedGuides } from "@/lib/queries/guides";

export default async function GuidesPage() {
  const guides = await getPublishedGuides();

  return (
    <div className="shell py-10">
      <div className="mb-6 space-y-2">
        <div className="text-sm font-semibold text-[var(--muted)]">攻略</div>
        <h1 className="text-4xl font-bold">把内容服务于决策，而不是变成内容流。</h1>
      </div>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {guides.map((guide) => (
          <Link key={guide.id} href={`/guides/${guide.slug}`} className="card rounded-[32px] p-6 transition hover:-translate-y-1">
            <div className="text-xs font-semibold tracking-[0.24em] text-[var(--muted)]">{guide.category}</div>
            <div className="mt-4 text-2xl font-semibold">{guide.title}</div>
            <p className="mt-3 text-sm leading-8 text-[var(--muted)]">{guide.summary}</p>
            <div className="mt-4 text-sm font-semibold text-[var(--accent)]">{guide.cityScope}</div>
          </Link>
        ))}
      </div>
    </div>
  );
}
