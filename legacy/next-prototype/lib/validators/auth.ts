import { z } from "zod";

export const loginSchema = z.object({
  email: z.email("请输入正确的邮箱地址"),
  password: z.string().min(6, "密码至少需要 6 位"),
});

export const registerSchema = z.object({
  name: z.string().min(2, "昵称至少需要 2 个字符").max(20, "昵称不能超过 20 个字符"),
  email: z.email("请输入正确的邮箱地址"),
  password: z
    .string()
    .min(6, "密码至少需要 6 位")
    .max(32, "密码不能超过 32 位"),
});
