import { apiError, apiSuccess } from "@/lib/api";
import { requireUser } from "@/lib/auth/current-user";
import { prisma } from "@/lib/db";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const user = await requireUser();
    const { id } = await params;
    const list = await prisma.favoriteList.findFirst({
      where: { id, userId: user.id },
    });
    if (!list) return apiError("收藏夹不存在", 404);

    const body = await request.json();
    const item = await prisma.favoriteListItem.upsert({
      where: {
        listId_campId: {
          listId: id,
          campId: body.campId,
        },
      },
      create: {
        listId: id,
        campId: body.campId,
      },
      update: {},
    });
    return apiSuccess(item);
  } catch {
    return apiError("请先登录", 401);
  }
}
