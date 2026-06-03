import { apiSuccess } from "@/lib/api";

export async function POST() {
  return apiSuccess({
    accepted: true,
    message: "MVP 阶段先接受举报请求，后续可接正式举报表。",
  });
}
