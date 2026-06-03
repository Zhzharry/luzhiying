import { AdminGuideForm } from "@/components/admin/admin-guide-form";
import { prisma } from "@/lib/db";

export default async function AdminGuidesPage() {
  const guides = await prisma.guide.findMany({
    orderBy: { updatedAt: "desc" },
    take: 20,
  });

  return (
    <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
      <AdminGuideForm />
      <section className="card rounded-[32px] p-6">
        <div className="mb-4 text-lg font-semibold">最近攻略</div>
        <div className="space-y-3">
          {guides.map((guide) => (
            <div key={guide.id} className="rounded-2xl border border-[var(--line)] px-4 py-3 text-sm">
              <div className="font-semibold">{guide.title}</div>
              <div className="text-[var(--muted)]">
                {guide.cityScope} · {guide.category} · {guide.status}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
