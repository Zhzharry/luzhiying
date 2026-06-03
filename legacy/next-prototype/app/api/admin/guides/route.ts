import { apiError, apiSuccess } from "@/lib/api";
import { requireAdmin } from "@/lib/auth/current-user";
import { prisma } from "@/lib/db";

export async function GET() {
  try {
    await requireAdmin();
    const guides = await prisma.guide.findMany({
      orderBy: { updatedAt: "desc" },
    });
    return apiSuccess(guides);
  } catch {
    return apiError("无权限", 403);
  }
}

export async function POST(request: Request) {
  try {
    await requireAdmin();
    const body = await request.json();
    const guide = await prisma.guide.create({
      data: {
        slug: body.slug,
        title: body.title,
        summary: body.summary,
        category: body.category,
        cityScope: body.cityScope,
        content: body.content,
        status: "PUBLISHED",
        publishedAt: new Date(),
        coverImage: "/camp/camp-2.jpg",
      },
    });
    return apiSuccess(guide);
  } catch {
    return apiError("创建攻略失败", 400);
  }
}
