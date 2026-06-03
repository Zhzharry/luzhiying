import { apiSuccess } from "@/lib/api";
import { getSession } from "@/lib/auth/session";

export async function GET() {
  const session = await getSession();
  return apiSuccess(session);
}
