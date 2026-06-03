import { prisma } from "@/lib/db";

export async function getUserDashboard(userId: string) {
  const [favoriteLists, reviews, recentlyViewed, corrections] = await Promise.all([
    prisma.favoriteList.findMany({
      where: { userId },
      include: {
        items: {
          include: {
            camp: {
              include: {
                facility: true,
                tags: { include: { tag: true } },
                reviews: { where: { status: "APPROVED" } },
                _count: { select: { reviews: true, favoriteItems: true } },
              },
            },
          },
        },
      },
      orderBy: { updatedAt: "desc" },
    }),
    prisma.review.findMany({
      where: { userId },
      include: { camp: true },
      orderBy: { createdAt: "desc" },
    }),
    prisma.recentlyViewed.findMany({
      where: { userId },
      include: {
        camp: {
          include: {
            facility: true,
            tags: { include: { tag: true } },
            reviews: { where: { status: "APPROVED" } },
            _count: { select: { reviews: true, favoriteItems: true } },
          },
        },
      },
      orderBy: { viewedAt: "desc" },
      take: 8,
    }),
    prisma.correctionFeedback.findMany({
      where: { userId },
      include: { camp: true },
      orderBy: { createdAt: "desc" },
      take: 8,
    }),
  ]);

  return {
    favoriteLists,
    reviews,
    recentlyViewed,
    corrections,
  };
}
