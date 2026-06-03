import { apiError, apiSuccess } from "@/lib/api";
import { getGuideBySlug } from "@/lib/queries/guides";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;
  const guide = await getGuideBySlug(slug);
  if (!guide) return apiError("攻略不存在", 404);
  return apiSuccess(guide);
}
