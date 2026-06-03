import { apiError, apiSuccess } from "@/lib/api";
import { hashPassword } from "@/lib/auth/password";
import { createSession } from "@/lib/auth/session";
import { prisma } from "@/lib/db";
import { registerSchema } from "@/lib/validators/auth";

export async function POST(request: Request) {
  const body = await request.json();
  const parsed = registerSchema.safeParse(body);
  if (!parsed.success) {
    return apiError(parsed.error.issues[0]?.message ?? "参数错误");
  }

  const exists = await prisma.user.findUnique({
    where: { email: parsed.data.email },
  });

  if (exists) {
    return apiError("这个邮箱已经注册过了");
  }

  const user = await prisma.user.create({
    data: {
      email: parsed.data.email,
      name: parsed.data.name,
      passwordHash: await hashPassword(parsed.data.password),
      favoriteLists: {
        create: [{ name: "默认收藏夹" }],
      },
    },
  });

  await createSession({
    userId: user.id,
    role: user.role,
    email: user.email,
  });

  return apiSuccess({ userId: user.id });
}
