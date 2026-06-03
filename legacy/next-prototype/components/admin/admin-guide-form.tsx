"use client";

import { FormEvent, useState, useTransition } from "react";
import { useRouter } from "next/navigation";

export function AdminGuideForm() {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [message, setMessage] = useState<string | null>(null);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    startTransition(async () => {
      const response = await fetch("/api/admin/guides", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(formData.entries())),
      });
      const result = await response.json();
      setMessage(result.success ? "已创建攻略" : result.error ?? "创建失败");
      if (result.success) router.refresh();
    });
  }

  return (
    <form className="card rounded-[32px] p-6" onSubmit={onSubmit}>
      <div className="mb-4 text-lg font-semibold">新增攻略</div>
      <div className="grid gap-4 md:grid-cols-2">
        <input name="title" placeholder="标题" className="rounded-2xl border border-[var(--line)] px-4 py-3" required />
        <input name="slug" placeholder="slug" className="rounded-2xl border border-[var(--line)] px-4 py-3" required />
        <input name="category" placeholder="分类" className="rounded-2xl border border-[var(--line)] px-4 py-3" required />
        <input name="cityScope" placeholder="城市范围" className="rounded-2xl border border-[var(--line)] px-4 py-3" required />
      </div>
      <textarea name="summary" placeholder="摘要" className="mt-4 h-24 w-full rounded-[24px] border border-[var(--line)] px-4 py-3" required />
      <textarea name="content" placeholder="正文" className="mt-4 h-40 w-full rounded-[24px] border border-[var(--line)] px-4 py-3" required />
      {message ? <div className="mt-4 text-sm text-[var(--muted)]">{message}</div> : null}
      <button
        disabled={pending}
        className="mt-4 rounded-full bg-[var(--accent)] px-5 py-3 text-sm font-semibold text-white disabled:opacity-60"
      >
        {pending ? "提交中..." : "创建攻略"}
      </button>
    </form>
  );
}
