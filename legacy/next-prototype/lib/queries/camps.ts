import { prisma } from "@/lib/db";
import { createCampWhereInput, mapCampCard } from "@/lib/mappers/camp";

export async function getCampFilters() {
  const [cities, tags] = await Promise.all([
    prisma.camp.findMany({
      distinct: ["city"],
      select: { city: true },
      orderBy: { city: "asc" },
    }),
    prisma.campTag.findMany({
      orderBy: [{ category: "asc" }, { name: "asc" }],
    }),
  ]);

  return {
    cities: cities.map((item) => item.city),
    tags,
  };
}

export async function getCampList(input: {
  keyword?: string;
  city?: string;
  theme?: string;
  campType?: string;
  priceType?: string;
  canOvernight?: boolean;
  allowFire?: boolean;
  petFriendly?: boolean;
  familyFriendly?: boolean;
  hasToilet?: boolean;
  hasShower?: boolean;
  hasPower?: boolean;
  carAccessible?: boolean;
  sortBy?: string;
  page: number;
  pageSize: number;
}) {
  const where = createCampWhereInput(input);
  const skip = (input.page - 1) * input.pageSize;

  const camps = await prisma.camp.findMany({
    where,
    include: {
      facility: true,
      tags: { include: { tag: true } },
      reviews: { where: { status: "APPROVED" } },
      _count: { select: { reviews: true, favoriteItems: true } },
    },
  });

  const mapped = camps.map(mapCampCard);

  const sorted = [...mapped].sort((a, b) => {
    if (input.sortBy === "rating") return b.ratingAvg - a.ratingAvg;
    if (input.sortBy === "newbie") {
      return Number(Boolean(b.facility?.familyFriendly)) - Number(Boolean(a.facility?.familyFriendly));
    }
    if (input.sortBy === "price") return (a.priceMin ?? 9999) - (b.priceMin ?? 9999);
    return b.ratingAvg * 10 + b.reviewCount - (a.ratingAvg * 10 + a.reviewCount);
  });

  return {
    items: sorted.slice(skip, skip + input.pageSize),
    total: sorted.length,
    page: input.page,
    pageSize: input.pageSize,
  };
}

export async function getCampBySlug(slug: string) {
  const camp = await prisma.camp.findUnique({
    where: { slug },
    include: {
      facility: true,
      tags: { include: { tag: true } },
      reviews: {
        where: { status: "APPROVED" },
        include: {
          user: true,
          tags: { include: { tag: true } },
          images: true,
        },
        orderBy: { createdAt: "desc" },
      },
      _count: { select: { reviews: true, favoriteItems: true } },
    },
  });

  if (!camp) return null;

  const similar = await prisma.camp.findMany({
    where: {
      city: camp.city,
      id: { not: camp.id },
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
    camp: mapCampCard(camp),
    detail: camp,
    similar: similar.map(mapCampCard),
  };
}
