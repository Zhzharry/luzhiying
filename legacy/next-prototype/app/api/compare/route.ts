import { apiSuccess } from "@/lib/api";
import { prisma } from "@/lib/db";
import { mapCampCard } from "@/lib/mappers/camp";

export async function POST(request: Request) {
  const body = await request.json();
  const ids: string[] = Array.isArray(body.ids) ? body.ids.slice(0, 4) : [];

  const camps = await prisma.camp.findMany({
    where: { id: { in: ids } },
    include: {
      facility: true,
      tags: { include: { tag: true } },
      reviews: { where: { status: "APPROVED" } },
      _count: { select: { reviews: true, favoriteItems: true } },
    },
  });

  return apiSuccess(camps.map(mapCampCard));
}
