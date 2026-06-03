import Link from "next/link";

import { getCurrentUser } from "@/lib/auth/current-user";

export async function SiteHeader() {
  const user = await getCurrentUser();

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--line)] bg-[rgba(246,241,231,0.82)] backdrop-blur-xl">
      <div className="shell flex items-center justify-between gap-6 py-4">
        <Link href="/" className="flex items-center gap-3">
          <div className="grid h-11 w-11 place-items-center rounded-2xl bg-[var(--accent)] text-sm font-semibold text-white shadow-lg">
            露
          </div>
          <div>
            <div className="text-lg font-bold tracking-tight">露之营</div>
            <div className="text-xs text-[var(--muted)]">露营地决策前台</div>
          </div>
        </Link>

        <nav className="hidden items-center gap-5 text-sm font-medium md:flex">
          <Link href="/">首页</Link>
          <Link href="/discover">找营地</Link>
          <Link href="/guides">攻略</Link>
          <Link href="/favorites">收藏</Link>
          {user?.role === "ADMIN" ? <Link href="/admin/camps">管理台</Link> : null}
        </nav>

        <div className="flex items-center gap-3 text-sm">
          {user ? (
            <>
              <Link
                href="/me"
                className="rounded-full border border-[var(--line)] px-4 py-2 text-[var(--foreground)]"
              >
                {user.name}
              </Link>
              <form action="/api/auth/logout" method="post">
                <button className="rounded-full bg-[var(--accent)] px-4 py-2 text-white">
                  退出
                </button>
              </form>
            </>
          ) : (
            <>
              <Link href="/login" className="rounded-full border border-[var(--line)] px-4 py-2">
                登录
              </Link>
              <Link href="/register" className="rounded-full bg-[var(--accent)] px-4 py-2 text-white">
                注册
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
