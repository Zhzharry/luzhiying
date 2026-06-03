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
    const guide = await prisma.guide.update({
      where: { id },
      data: body,
    });
    return apiSuccess(guide);
  } catch {
    return apiError("更新攻略失败", 400);
  }
}
