import { apiError, apiSuccess } from "@/lib/api";
import { requireAdmin } from "@/lib/auth/current-user";
import { prisma } from "@/lib/db";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    await requireAdmin();
    const { id } = await params;
    const body = await request.json();
    const review = await prisma.review.update({
      where: { id },
      data: { status: body.status },
    });
    return apiSuccess(review);
  } catch {
    return apiError("审核失败", 400);
  }
}
