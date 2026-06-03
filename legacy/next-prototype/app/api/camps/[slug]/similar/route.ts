import { apiError, apiSuccess } from "@/lib/api";
import { getCampBySlug } from "@/lib/queries/camps";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;
  const result = await getCampBySlug(slug);
  if (!result) return apiError("营地不存在", 404);
  return apiSuccess(result.similar);
}
