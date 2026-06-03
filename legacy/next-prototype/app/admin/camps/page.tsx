import { AdminCampForm } from "@/components/admin/admin-camp-form";
import { prisma } from "@/lib/db";

export default async function AdminCampsPage() {
  const camps = await prisma.camp.findMany({
    orderBy: [{ city: "asc" }, { updatedAt: "desc" }],
    take: 20,
  });

  return (
    <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
      <AdminCampForm />
      <section className="card rounded-[32px] p-6">
        <div className="mb-4 text-lg font-semibold">最近营地</div>
        <div className="space-y-3">
          {camps.map((camp) => (
            <div key={camp.id} className="rounded-2xl border border-[var(--line)] px-4 py-3 text-sm">
              <div className="font-semibold">{camp.name}</div>
              <div className="text-[var(--muted)]">{camp.city} · {camp.district}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
