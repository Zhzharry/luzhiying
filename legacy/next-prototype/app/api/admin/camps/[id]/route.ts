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
    const camp = await prisma.camp.update({
      where: { id },
      data: body,
    });
    return apiSuccess(camp);
  } catch {
    return apiError("更新失败", 400);
  }
}
