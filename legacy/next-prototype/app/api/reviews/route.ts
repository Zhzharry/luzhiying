import { apiError, apiSuccess } from "@/lib/api";
import { requireUser } from "@/lib/auth/current-user";
import { prisma } from "@/lib/db";
import { reviewCreateSchema } from "@/lib/validators/camp";

export async function POST(request: Request) {
  try {
    const user = await requireUser();
    const body = await request.json();
    const parsed = reviewCreateSchema.safeParse(body);
    if (!parsed.success) return apiError(parsed.error.issues[0]?.message ?? "参数错误");

    const camp = await prisma.camp.findUnique({
      where: { id: parsed.data.campId },
    });
    if (!camp) return apiError("营地不存在", 404);

    const review = await prisma.review.create({
      data: {
        campId: parsed.data.campId,
        userId: user.id,
        overallScore: parsed.data.overallScore,
        sceneScore: parsed.data.sceneScore,
        cleanScore: parsed.data.cleanScore,
        quietScore: parsed.data.quietScore,
        accessScore: parsed.data.accessScore,
        newbieScore: parsed.data.newbieScore,
        familyScore: parsed.data.familyScore,
        costScore: parsed.data.costScore,
        text: parsed.data.text,
        visitDate: new Date(parsed.data.visitDate),
        tags: {
          create: parsed.data.tagIds.map((tagId) => ({ tagId })),
        },
        images: {
          create: parsed.data.imageUrls.map((url, index) => ({ url, sortOrder: index })),
        },
      },
    });

    return apiSuccess({
      reviewId: review.id,
      campSlug: camp.slug,
    });
  } catch (error) {
    if (error instanceof Error && error.message === "UNAUTHORIZED") {
      return apiError("请先登录", 401);
    }
    return apiError("提交评论失败");
  }
}
