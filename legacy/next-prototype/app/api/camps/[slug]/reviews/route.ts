import { apiError, apiSuccess } from "@/lib/api";
import { prisma } from "@/lib/db";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;
  const camp = await prisma.camp.findUnique({ where: { slug } });
  if (!camp) return apiError("营地不存在", 404);

  const reviews = await prisma.review.findMany({
    where: { campId: camp.id, status: "APPROVED" },
    include: { user: true, tags: { include: { tag: true } }, images: true },
    orderBy: { createdAt: "desc" },
  });

  return apiSuccess(reviews);
}
