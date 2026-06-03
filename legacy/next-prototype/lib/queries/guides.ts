import { prisma } from "@/lib/db";

export async function getPublishedGuides() {
  return prisma.guide.findMany({
    where: { status: "PUBLISHED" },
    orderBy: { publishedAt: "desc" },
  });
}

export async function getGuideBySlug(slug: string) {
  const guide = await prisma.guide.findUnique({
    where: { slug },
  });

  if (!guide || guide.status !== "PUBLISHED") return null;

  const relatedCamps = await prisma.camp.findMany({
    where: {
      city: guide.cityScope,
    },
    include: {
      facility: true,
      tags: { include: { tag: true } },
      reviews: { where: { status: "APPROVED" } },
      _count: { select: { reviews: true, favoriteItems: true } },
    },
    take: 3,
  });

  return {
    guide,
    relatedCamps,
  };
}
