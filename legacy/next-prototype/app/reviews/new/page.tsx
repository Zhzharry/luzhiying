import { redirect } from "next/navigation";

import { ReviewForm } from "@/components/reviews/review-form";
import { getCurrentUser } from "@/lib/auth/current-user";
import { prisma } from "@/lib/db";

export default async function NewReviewPage({
  searchParams,
}: {
  searchParams: Promise<{ campId?: string | string[] }>;
}) {
  const user = await getCurrentUser();
  if (!user) redirect("/login?next=/reviews/new");

  const resolved = await searchParams;
  const campId = Array.isArray(resolved.campId) ? resolved.campId[0] : resolved.campId;
  if (!campId) redirect("/discover");

  const [camp, tags] = await Promise.all([
    prisma.camp.findUnique({ where: { id: campId } }),
    prisma.reviewTag.findMany({ orderBy: { name: "asc" } }),
  ]);

  if (!camp) redirect("/discover");

  return (
    <div className="shell py-10">
      <div className="mb-6 space-y-2">
        <div className="text-sm font-semibold text-[var(--muted)]">发布评论</div>
        <h1 className="text-4xl font-bold">补充你在 {camp.name} 的真实体验</h1>
      </div>
      <ReviewForm campId={campId} tags={tags.map((tag) => ({ id: tag.id, name: tag.name, kind: tag.kind }))} />
    </div>
  );
}
