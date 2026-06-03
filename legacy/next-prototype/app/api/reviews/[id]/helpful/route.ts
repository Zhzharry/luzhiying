import { apiSuccess } from "@/lib/api";
import { prisma } from "@/lib/db";

export async function PATCH(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const review = await prisma.review.update({
    where: { id },
    data: { helpfulCount: { increment: 1 } },
  });
  return apiSuccess(review);
}
