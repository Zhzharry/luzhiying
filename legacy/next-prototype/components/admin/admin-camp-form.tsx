"use client";

import { FormEvent, useState, useTransition } from "react";
import { useRouter } from "next/navigation";

export function AdminCampForm() {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [message, setMessage] = useState<string | null>(null);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage(null);
    const formData = new FormData(event.currentTarget);
    startTransition(async () => {
      const response = await fetch("/api/admin/camps", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(formData.entries())),
      });
      const result = await response.json();
      setMessage(result.success ? "已新增营地" : result.error ?? "新增失败");
      if (result.success) router.refresh();
    });
  }

  return (
    <form className="card rounded-[32px] p-6" onSubmit={onSubmit}>
      <div className="mb-4 text-lg font-semibold">新增营地</div>
      <div className="grid gap-4 md:grid-cols-2">
        <input name="name" placeholder="营地名称" className="rounded-2xl border border-[var(--line)] px-4 py-3" required />
        <input name="slug" placeholder="slug" className="rounded-2xl border border-[var(--line)] px-4 py-3" required />
        <input name="city" placeholder="城市" className="rounded-2xl border border-[var(--line)] px-4 py-3" required />
        <input name="district" placeholder="区县" className="rounded-2xl border border-[var(--line)] px-4 py-3" required />
        <input name="campType" placeholder="营地类型" className="rounded-2xl border border-[var(--line)] px-4 py-3" required />
        <input name="priceMin" placeholder="最低价" className="rounded-2xl border border-[var(--line)] px-4 py-3" required />
      </div>
      <textarea
        name="summary"
        placeholder="一句话概述"
        className="mt-4 h-28 w-full rounded-[24px] border border-[var(--line)] px-4 py-3"
        required
      />
      {message ? <div className="mt-4 text-sm text-[var(--muted)]">{message}</div> : null}
      <button
        disabled={pending}
        className="mt-4 rounded-full bg-[var(--accent)] px-5 py-3 text-sm font-semibold text-white disabled:opacity-60"
      >
        {pending ? "提交中..." : "创建营地"}
      </button>
    </form>
  );
}
