"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";

export function ReviewStatusButton({
  reviewId,
  status,
}: {
  reviewId: string;
  status: "APPROVED" | "REJECTED";
}) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  return (
    <button
      type="button"
      disabled={pending}
      onClick={() =>
        startTransition(async () => {
          await fetch(`/api/admin/reviews/${reviewId}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ status }),
          });
          router.refresh();
        })
      }
      className={`rounded-full px-3 py-2 text-xs font-semibold text-white ${
        status === "APPROVED" ? "bg-[var(--accent)]" : "bg-[var(--warning)]"
      } disabled:opacity-60`}
    >
      {pending ? "处理中..." : status === "APPROVED" ? "通过" : "拒绝"}
    </button>
  );
}
