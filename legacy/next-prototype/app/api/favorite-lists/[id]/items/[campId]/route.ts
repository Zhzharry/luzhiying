import { apiError, apiSuccess } from "@/lib/api";
import { requireUser } from "@/lib/auth/current-user";
import { prisma } from "@/lib/db";

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string; campId: string }> },
) {
  try {
    const user = await requireUser();
    const { id, campId } = await params;
    const list = await prisma.favoriteList.findFirst({
      where: { id, userId: user.id },
    });
    if (!list) return apiError("收藏夹不存在", 404);

    await prisma.favoriteListItem.deleteMany({
      where: {
        listId: id,
        campId,
      },
    });

    return apiSuccess(true);
  } catch {
    return apiError("请先登录", 401);
  }
}
