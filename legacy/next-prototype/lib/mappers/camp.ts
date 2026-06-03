import type { Camp, CampFacility, CampTag, Prisma, Review } from "@prisma/client";

type CampWithRelations = Camp & {
  facility: CampFacility | null;
  tags: Array<{ tag: CampTag }>;
  reviews?: Review[];
  _count?: { reviews: number; favoriteItems: number };
};

export function mapCampCard(camp: CampWithRelations) {
  const reviews = camp.reviews ?? [];
  const ratingAvg =
    reviews.length > 0
      ? reviews.reduce((sum, review) => sum + review.overallScore, 0) / reviews.length
      : 0;

  return {
    id: camp.id,
    slug: camp.slug,
    name: camp.name,
    city: camp.city,
    district: camp.district,
    summary: camp.summary,
    coverImage: camp.coverImage,
    priceType: camp.priceType,
    priceMin: camp.priceMin,
    priceMax: camp.priceMax,
    bestSeason: camp.bestSeason,
    campType: camp.campType,
    mapRegionKey: camp.mapRegionKey,
    mapX: camp.mapX,
    mapY: camp.mapY,
    openingStatus: camp.openingStatus,
    ratingAvg: Number(ratingAvg.toFixed(1)),
    reviewCount: camp._count?.reviews ?? reviews.length,
    favoriteCount: camp._count?.favoriteItems ?? 0,
    tags: camp.tags.map((item) => item.tag),
    facility: camp.facility,
  };
}

export function createCampWhereInput(input: {
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
}): Prisma.CampWhereInput {
  const where: Prisma.CampWhereInput = {};

  if (input.keyword) {
    where.OR = [
      { name: { contains: input.keyword, mode: "insensitive" } },
      { district: { contains: input.keyword, mode: "insensitive" } },
      { summary: { contains: input.keyword, mode: "insensitive" } },
    ];
  }

  if (input.city) where.city = input.city;
  if (input.campType) where.campType = input.campType;
  if (input.priceType) where.priceType = input.priceType;

  const facility: Prisma.CampFacilityWhereInput = {};
  if (input.canOvernight !== undefined) facility.canOvernight = input.canOvernight;
  if (input.allowFire !== undefined) facility.allowFire = input.allowFire;
  if (input.petFriendly !== undefined) facility.petFriendly = input.petFriendly;
  if (input.familyFriendly !== undefined) facility.familyFriendly = input.familyFriendly;
  if (input.hasToilet !== undefined) facility.hasToilet = input.hasToilet;
  if (input.hasShower !== undefined) facility.hasShower = input.hasShower;
  if (input.hasPower !== undefined) facility.hasPower = input.hasPower;
  if (input.carAccessible !== undefined) facility.carAccessible = input.carAccessible;

  if (Object.keys(facility).length > 0) {
    where.facility = facility;
  }

  if (input.theme) {
    where.tags = {
      some: {
        tag: {
          slug: input.theme,
        },
      },
    };
  }

  return where;
}
