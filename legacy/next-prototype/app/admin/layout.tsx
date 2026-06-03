import Link from "next/link";
import { redirect } from "next/navigation";

import { requireAdmin } from "@/lib/auth/current-user";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  try {
    await requireAdmin();
  } catch {
    redirect("/login?next=/admin/camps");
  }

  return (
    <div className="shell py-10">
      <div className="mb-6 flex flex-wrap items-center gap-3">
        <Link href="/admin/camps" className="rounded-full border border-[var(--line)] px-4 py-2 text-sm">
          营地管理
        </Link>
        <Link href="/admin/guides" className="rounded-full border border-[var(--line)] px-4 py-2 text-sm">
          攻略管理
        </Link>
        <Link href="/admin/reviews" className="rounded-full border border-[var(--line)] px-4 py-2 text-sm">
          评论审核
        </Link>
      </div>
      {children}
    </div>
  );
}
