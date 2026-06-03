import { apiError, apiSuccess } from "@/lib/api";
import { requireUser } from "@/lib/auth/current-user";
import { prisma } from "@/lib/db";
import { correctionSchema } from "@/lib/validators/camp";

export async function POST(request: Request) {
  try {
    const user = await requireUser();
    const body = await request.json();
    const parsed = correctionSchema.safeParse(body);
    if (!parsed.success) return apiError(parsed.error.issues[0]?.message ?? "参数错误");

    const item = await prisma.correctionFeedback.create({
      data: {
        userId: user.id,
        ...parsed.data,
      },
    });
    return apiSuccess(item);
  } catch {
    return apiError("请先登录", 401);
  }
}
