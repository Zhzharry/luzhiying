import { apiSuccess } from "@/lib/api";
import { getPublishedGuides } from "@/lib/queries/guides";

export async function GET() {
  const guides = await getPublishedGuides();
  return apiSuccess(guides);
}
