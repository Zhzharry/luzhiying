"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { FormEvent, useState, useTransition } from "react";

type AuthFormProps = {
  mode: "login" | "register";
};

export function AuthForm({ mode }: AuthFormProps) {
  const router = useRouter();
  const params = useSearchParams();
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    const formData = new FormData(event.currentTarget);

    startTransition(async () => {
      const response = await fetch(`/api/auth/${mode}`, {
        method: "POST",
        body: JSON.stringify(Object.fromEntries(formData.entries())),
        headers: { "Content-Type": "application/json" },
      });

      const result = await response.json();
      if (!result.success) {
        setError(result.error ?? "操作失败");
        return;
      }

      const next = params.get("next") ?? "/discover";
      router.push(next);
      router.refresh();
    });
  }

  return (
    <form className="card mx-auto w-full max-w-md rounded-[32px] p-8" onSubmit={onSubmit}>
      <div className="mb-6 space-y-2">
        <div className="text-3xl font-bold">{mode === "login" ? "登录露之营" : "创建账号"}</div>
        <p className="text-sm leading-7 text-[var(--muted)]">
          {mode === "login"
            ? "登录后即可收藏营地、提交评论和维护个人候选清单。"
            : "首版使用邮箱 + 密码登录，先保证真实账号流程稳定。"}
        </p>
      </div>

      <div className="space-y-4">
        {mode === "register" ? (
          <div>
            <label className="mb-2 block text-sm font-semibold">昵称</label>
            <input
              name="name"
              className="w-full rounded-2xl border border-[var(--line)] bg-white/70 px-4 py-3"
              placeholder="输入你的名字"
              required
            />
          </div>
        ) : null}

        <div>
          <label className="mb-2 block text-sm font-semibold">邮箱</label>
          <input
            name="email"
            type="email"
            className="w-full rounded-2xl border border-[var(--line)] bg-white/70 px-4 py-3"
            placeholder="name@example.com"
            required
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-semibold">密码</label>
          <input
            name="password"
            type="password"
            className="w-full rounded-2xl border border-[var(--line)] bg-white/70 px-4 py-3"
            placeholder="至少 6 位"
            required
          />
        </div>

        {error ? <div className="rounded-2xl bg-[#fff1eb] px-4 py-3 text-sm text-[#95491b]">{error}</div> : null}

        <button
          disabled={pending}
          className="w-full rounded-full bg-[var(--accent)] px-4 py-3 font-semibold text-white disabled:opacity-60"
        >
          {pending ? "处理中..." : mode === "login" ? "登录" : "注册"}
        </button>
      </div>
    </form>
  );
}
