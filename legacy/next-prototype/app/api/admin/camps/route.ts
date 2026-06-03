import { apiError, apiSuccess } from "@/lib/api";
import { requireAdmin } from "@/lib/auth/current-user";
import { prisma } from "@/lib/db";

export async function GET() {
  try {
    await requireAdmin();
    const camps = await prisma.camp.findMany({
      orderBy: { updatedAt: "desc" },
    });
    return apiSuccess(camps);
  } catch {
    return apiError("无权限", 403);
  }
}

export async function POST(request: Request) {
  try {
    await requireAdmin();
    const body = await request.json();
    const camp = await prisma.camp.create({
      data: {
        slug: body.slug,
        name: body.name,
        province: "待补充",
        city: body.city,
        district: body.district,
        address: "待补充",
        latitude: 30,
        longitude: 120,
        mapRegionKey: body.city === "成都" ? "chengdu" : body.city === "苏州" ? "suzhou" : "hangzhou",
        mapX: 50,
        mapY: 50,
        campType: body.campType,
        coverImage: "/camp/camp-1.jpg",
        gallery: ["/camp/camp-1.jpg"],
        priceType: "收费营地",
        priceMin: Number(body.priceMin ?? 0),
        priceMax: Number(body.priceMin ?? 0),
        bookingRequired: false,
        bestSeason: "春秋最佳",
        arrivalTips: "待补充",
        riskTips: "待补充",
        suitableFor: ["待补充"],
        rules: ["待补充"],
        summary: body.summary,
        facility: {
          create: {
            hasToilet: true,
            hasShower: false,
            hasPower: false,
            hasWater: true,
            allowFire: false,
            canOvernight: true,
            petFriendly: false,
            familyFriendly: true,
            carAccessible: true,
            signalStrength: "待补充",
            roadCondition: "待补充",
            parkingDistance: "待补充",
          },
        },
      },
    });
    return apiSuccess(camp);
  } catch (error) {
    if (error instanceof Error && error.message === "FORBIDDEN") return apiError("无权限", 403);
    return apiError("创建营地失败");
  }
}
