import { notFound } from "next/navigation";

import { CampCard } from "@/components/camps/camp-card";
import { getGuideBySlug } from "@/lib/queries/guides";
import { mapCampCard } from "@/lib/mappers/camp";

export default async function GuideDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const result = await getGuideBySlug(slug);
  if (!result) notFound();

  return (
    <div className="shell py-10">
      <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <aside className="card h-fit rounded-[32px] p-6">
          <div className="text-sm font-semibold text-[var(--muted)]">{result.guide.category}</div>
          <h1 className="mt-3 text-4xl font-bold">{result.guide.title}</h1>
          <p className="mt-4 text-sm leading-8 text-[var(--muted)]">{result.guide.summary}</p>
          <div className="mt-6 rounded-[24px] bg-[var(--accent-soft)] p-4 text-sm text-[var(--accent-strong)]">
            城市范围：{result.guide.cityScope}
          </div>
        </aside>

        <section className="space-y-6">
          <article className="card rich-text rounded-[32px] p-8">
            {result.guide.content.split("\n").map((line, index) => {
              if (line.startsWith("## ")) return <h2 key={index}>{line.replace("## ", "")}</h2>;
              if (!line) return <div key={index} className="h-3" />;
              if (line.startsWith("- ")) return <li key={index}>{line.replace("- ", "")}</li>;
              return <p key={index}>{line}</p>;
            })}
          </article>

          <div>
            <div className="mb-4 text-sm font-semibold text-[var(--muted)]">相关营地</div>
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {result.relatedCamps.map((camp) => (
                <CampCard key={camp.id} camp={mapCampCard(camp)} compact />
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
