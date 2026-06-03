import Link from "next/link";

import { CampCard } from "@/components/camps/camp-card";
import { getCampList } from "@/lib/queries/camps";
import { getPublishedGuides } from "@/lib/queries/guides";
import { popularCities, themeFilters } from "@/lib/constants/site";
import { serializeSearchParams } from "@/lib/utils";

export default async function HomePage() {
  const [{ items: featuredCamps }, guides] = await Promise.all([
    getCampList({ page: 1, pageSize: 6, sortBy: "recommended" }),
    getPublishedGuides(),
  ]);

  return (
    <div className="pb-20">
      <section className="shell pt-10">
        <div className="card overflow-hidden rounded-[40px] p-8 md:p-12">
          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="space-y-6">
              <div className="inline-flex rounded-full border border-[var(--line)] px-4 py-2 text-xs font-semibold text-[var(--accent-strong)]">
                更适合桌面端决策的露营地地图工具
              </div>
              <div className="space-y-4">
                <h1 className="max-w-3xl text-4xl font-bold leading-tight md:text-6xl">
                  把露营前最费时间的事，
                  <span className="text-[var(--accent)]">先帮你理顺。</span>
                </h1>
                <p className="max-w-2xl text-base leading-8 text-[var(--muted)] md:text-lg">
                  露之营不做泛社区，不做房车交易。它只解决一个问题：帮自驾露营新手在出发前更快找到合适营地，避开明显踩坑点，完成候选对比和决策。
                </p>
              </div>

              <form action="/discover" className="grid gap-3 md:grid-cols-[1fr_auto]">
                <input
                  name="keyword"
                  className="rounded-full border border-[var(--line)] bg-white/70 px-6 py-4 outline-none"
                  placeholder="搜索城市、营地、湖边、亲子、可过夜"
                />
                <button className="rounded-full bg-[var(--accent)] px-7 py-4 font-semibold text-white">
                  开始找营地
                </button>
              </form>

              <div className="flex flex-wrap gap-3">
                {themeFilters.map((filter) => (
                  <Link
                    key={filter.value}
                    href={`/discover?${serializeSearchParams({ theme: filter.value })}`}
                    className="rounded-full border border-[var(--line)] px-4 py-2 text-sm text-[var(--muted)] transition hover:border-[var(--accent)] hover:text-[var(--accent)]"
                  >
                    {filter.label}
                  </Link>
                ))}
              </div>
            </div>

            <div className="grid-lines rounded-[32px] border border-[var(--line)] bg-[linear-gradient(180deg,rgba(255,255,255,0.5),rgba(223,235,226,0.8))] p-6">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="rounded-[28px] bg-[var(--surface-strong)] p-5">
                  <div className="text-xs font-semibold tracking-[0.24em] text-[var(--muted)]">热门城市</div>
                  <div className="mt-4 space-y-3">
                    {popularCities.map((city) => (
                      <Link key={city} href={`/discover?city=${city}`} className="flex items-center justify-between rounded-2xl bg-[var(--accent-soft)] px-4 py-3">
                        <span>{city}</span>
                        <span className="text-xs text-[var(--muted)]">查看营地</span>
                      </Link>
                    ))}
                  </div>
                </div>
                <div className="rounded-[28px] bg-[var(--accent)] p-5 text-white">
                  <div className="text-xs font-semibold tracking-[0.24em] text-white/70">本周提醒</div>
                  <div className="mt-4 text-2xl font-semibold">先看天气，再看路况。</div>
                  <p className="mt-3 text-sm leading-7 text-white/80">
                    第一版重点展示营地规则、道路条件、卫生条件和评论里的避坑标签，先把决策质量做稳。
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="shell mt-12">
        <div className="mb-5 flex items-end justify-between">
          <div>
            <div className="text-sm font-semibold text-[var(--muted)]">热门地区</div>
            <h2 className="text-3xl font-bold">从高频城市先开始</h2>
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {popularCities.map((city) => (
            <Link
              key={city}
              href={`/discover?city=${city}`}
              className="card rounded-[28px] p-6 transition hover:-translate-y-1"
            >
              <div className="text-2xl font-semibold">{city}</div>
              <div className="mt-2 text-sm leading-7 text-[var(--muted)]">优先覆盖城市周边周末露营点，先做高频用户的真实决策入口。</div>
            </Link>
          ))}
        </div>
      </section>

      <section className="shell mt-12">
        <div className="mb-5 flex items-end justify-between">
          <div>
            <div className="text-sm font-semibold text-[var(--muted)]">热门营地</div>
            <h2 className="text-3xl font-bold">适合新手先看的候选营地</h2>
          </div>
          <Link href="/discover" className="text-sm font-semibold text-[var(--accent)]">
            查看全部
          </Link>
        </div>
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {featuredCamps.map((camp) => (
            <CampCard key={camp.id} camp={camp} />
          ))}
        </div>
      </section>

      <section className="shell mt-12 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="card rounded-[32px] p-8">
          <div className="text-sm font-semibold text-[var(--muted)]">为什么可信</div>
          <h2 className="mt-2 text-3xl font-bold">露之营只做决策前台</h2>
          <div className="mt-5 space-y-4 text-sm leading-8 text-[var(--muted)]">
            <p>不把核心信息锁在会员墙后。</p>
            <p>不靠长篇游记代替结构化判断。</p>
            <p>先把营地条件、风险提示、评分和适合人群讲清楚。</p>
            <p>地图先用静态模拟，优先验证数据和决策链路。</p>
          </div>
        </div>
        <div className="card rounded-[32px] p-8">
          <div className="mb-5 flex items-end justify-between">
            <div>
              <div className="text-sm font-semibold text-[var(--muted)]">新手攻略</div>
              <h2 className="text-3xl font-bold">先看这几篇再出发</h2>
            </div>
            <Link href="/guides" className="text-sm font-semibold text-[var(--accent)]">
              查看攻略
            </Link>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {guides.slice(0, 4).map((guide) => (
              <Link
                key={guide.id}
                href={`/guides/${guide.slug}`}
                className="rounded-[24px] border border-[var(--line)] bg-white/50 p-5 transition hover:-translate-y-1"
              >
                <div className="text-xs font-semibold tracking-[0.24em] text-[var(--muted)]">{guide.category}</div>
                <div className="mt-3 text-lg font-semibold">{guide.title}</div>
                <p className="mt-2 text-sm leading-7 text-[var(--muted)]">{guide.summary}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
