"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useState, useTransition } from "react";

const scoreFields = [
  ["overallScore", "综合评分"],
  ["sceneScore", "风景"],
  ["cleanScore", "卫生"],
  ["quietScore", "安静程度"],
  ["accessScore", "到达便利"],
  ["newbieScore", "新手友好"],
  ["familyScore", "亲子友好"],
  ["costScore", "性价比"],
] as const;

export function ReviewForm({
  campId,
  tags,
}: {
  campId: string;
  tags: Array<{ id: string; name: string; kind: string }>;
}) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    const form = event.currentTarget;
    const formData = new FormData(form);
    const payload = {
      ...Object.fromEntries(formData.entries()),
      tagIds: formData.getAll("tagIds"),
      imageUrls: String(formData.get("imageUrls") ?? "")
        .split("\n")
        .map((item) => item.trim())
        .filter(Boolean),
    };

    startTransition(async () => {
      const response = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = await response.json();
      if (!result.success) {
        setError(result.error ?? "提交失败");
        return;
      }
      router.push(`/camps/${result.data.campSlug}`);
      router.refresh();
    });
  }

  return (
    <form className="card mx-auto max-w-3xl rounded-[32px] p-8" onSubmit={onSubmit}>
      <input type="hidden" name="campId" value={campId} />
      <div className="grid gap-4 md:grid-cols-2">
        {scoreFields.map(([field, label]) => (
          <label key={field} className="space-y-2">
            <span className="block text-sm font-semibold">{label}</span>
            <select
              name={field}
              defaultValue="5"
              className="w-full rounded-2xl border border-[var(--line)] bg-white/70 px-4 py-3"
            >
              {[5, 4, 3, 2, 1].map((score) => (
                <option key={score} value={score}>
                  {score} 分
                </option>
              ))}
            </select>
          </label>
        ))}
      </div>

      <div className="mt-6">
        <div className="mb-3 text-sm font-semibold">推荐 / 避坑标签</div>
        <div className="flex flex-wrap gap-3">
          {tags.map((tag) => (
            <label key={tag.id} className="rounded-full border border-[var(--line)] px-4 py-2 text-sm">
              <input className="mr-2" type="checkbox" name="tagIds" value={tag.id} />
              {tag.name}
            </label>
          ))}
        </div>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <label className="space-y-2">
          <span className="block text-sm font-semibold">到访日期</span>
          <input
            type="date"
            name="visitDate"
            className="w-full rounded-2xl border border-[var(--line)] bg-white/70 px-4 py-3"
            required
          />
        </label>
        <label className="space-y-2">
          <span className="block text-sm font-semibold">图片 URL（每行一条）</span>
          <textarea
            name="imageUrls"
            className="h-[112px] w-full rounded-2xl border border-[var(--line)] bg-white/70 px-4 py-3"
            placeholder="https://..."
          />
        </label>
      </div>

      <label className="mt-6 block space-y-2">
        <span className="block text-sm font-semibold">评论内容</span>
        <textarea
          name="text"
          className="h-40 w-full rounded-[24px] border border-[var(--line)] bg-white/70 px-4 py-3"
          placeholder="重点写清楚卫生、路况、适合什么人、有哪些坑。"
          required
        />
      </label>

      {error ? <div className="mt-4 rounded-2xl bg-[#fff1eb] px-4 py-3 text-sm text-[#95491b]">{error}</div> : null}

      <div className="mt-6 flex justify-end">
        <button
          disabled={pending}
          className="rounded-full bg-[var(--accent)] px-6 py-3 font-semibold text-white disabled:opacity-60"
        >
          {pending ? "提交中..." : "提交评论"}
        </button>
      </div>
    </form>
  );
}
