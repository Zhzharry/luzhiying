import { apiSuccess } from "@/lib/api";
import { getCampList } from "@/lib/queries/camps";
import { campQuerySchema } from "@/lib/validators/camp";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const parsed = campQuerySchema.parse(Object.fromEntries(searchParams.entries()));
  const result = await getCampList(parsed);
  return apiSuccess(result.items, {
    total: result.total,
    page: result.page,
    pageSize: result.pageSize,
  });
}
