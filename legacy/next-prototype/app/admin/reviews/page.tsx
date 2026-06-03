import { ReviewStatusButton } from "@/components/admin/review-status-button";
import { prisma } from "@/lib/db";

export default async function AdminReviewsPage() {
  const reviews = await prisma.review.findMany({
    include: {
      camp: true,
      user: true,
    },
    orderBy: { createdAt: "desc" },
    take: 30,
  });

  return (
    <section className="card rounded-[32px] p-6">
      <div className="mb-4 text-lg font-semibold">评论审核</div>
      <div className="space-y-4">
        {reviews.map((review) => (
          <article key={review.id} className="rounded-[24px] border border-[var(--line)] p-5">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <div className="font-semibold">{review.camp.name}</div>
                <div className="text-sm text-[var(--muted)]">
                  {review.user.name} · {review.status}
                </div>
              </div>
              <div className="flex gap-2">
                <ReviewStatusButton reviewId={review.id} status="APPROVED" />
                <ReviewStatusButton reviewId={review.id} status="REJECTED" />
              </div>
            </div>
            <p className="mt-4 text-sm leading-7 text-[var(--muted)]">{review.text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
