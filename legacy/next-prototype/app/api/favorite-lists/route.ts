import { apiError, apiSuccess } from "@/lib/api";
import { requireUser } from "@/lib/auth/current-user";
import { prisma } from "@/lib/db";

export async function GET() {
  try {
    const user = await requireUser();
    const lists = await prisma.favoriteList.findMany({
      where: { userId: user.id },
      include: { items: true },
      orderBy: { createdAt: "asc" },
    });
    return apiSuccess(lists);
  } catch {
    return apiError("请先登录", 401);
  }
}

export async function POST(request: Request) {
  try {
    const user = await requireUser();
    const body = await request.json();
    if (!body.name) return apiError("收藏夹名称不能为空");
    const list = await prisma.favoriteList.create({
      data: {
        userId: user.id,
        name: body.name,
      },
    });
    return apiSuccess(list);
  } catch {
    return apiError("请先登录", 401);
  }
}
