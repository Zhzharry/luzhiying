"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

export function FavoriteButton({
  campId,
  favoriteListId,
  initiallySaved,
}: {
  campId: string;
  favoriteListId?: string;
  initiallySaved: boolean;
}) {
  const router = useRouter();
  const [saved, setSaved] = useState(initiallySaved);
  const [pending, startTransition] = useTransition();

  const disabled = !favoriteListId;

  return (
    <button
      type="button"
      disabled={pending || disabled}
      onClick={() => {
        if (!favoriteListId) return;
        startTransition(async () => {
          const method = saved ? "DELETE" : "POST";
          const url = saved
            ? `/api/favorite-lists/${favoriteListId}/items/${campId}`
            : `/api/favorite-lists/${favoriteListId}/items`;
          const response = await fetch(url, {
            method,
            headers: { "Content-Type": "application/json" },
            body: saved ? undefined : JSON.stringify({ campId }),
          });
          const result = await response.json();
          if (result.success) {
            setSaved(!saved);
            router.refresh();
          }
        });
      }}
      className="rounded-full bg-[var(--accent)] px-5 py-3 text-sm font-semibold text-white disabled:opacity-50"
    >
      {disabled ? "登录后可收藏" : pending ? "处理中..." : saved ? "已加入收藏" : "加入收藏"}
    </button>
  );
}
