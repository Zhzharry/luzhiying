import { apiError, apiSuccess } from "@/lib/api";
import { requireAdmin } from "@/lib/auth/current-user";
import { prisma } from "@/lib/db";

export async function GET() {
  try {
    await requireAdmin();
    const reviews = await prisma.review.findMany({
      include: { camp: true, user: true },
      orderBy: { createdAt: "desc" },
    });
    return apiSuccess(reviews);
  } catch {
    return apiError("无权限", 403);
  }
}
