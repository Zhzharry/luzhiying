import Link from "next/link";
import { notFound } from "next/navigation";

import { FavoriteButton } from "@/components/camps/favorite-button";
import { CampCard } from "@/components/camps/camp-card";
import { getCurrentUser } from "@/lib/auth/current-user";
import { prisma } from "@/lib/db";
import { getCampBySlug } from "@/lib/queries/camps";
import { formatPrice } from "@/lib/utils";

export default async function CampDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const data = await getCampBySlug(slug);
  if (!data) notFound();

  const user = await getCurrentUser();
  const favoriteList = user
    ? await prisma.favoriteList.findFirst({
        where: { userId: user.id },
        include: {
          items: {
            where: { campId: data.detail.id },
          },
        },
        orderBy: { createdAt: "asc" },
      })
    : null;

  return (
    <div className="shell py-10">
      <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <section className="space-y-6">
          <div className="card rounded-[34px] p-8">
            <div className="flex flex-wrap items-start justify-between gap-6">
              <div className="space-y-3">
                <div className="text-sm font-semibold text-[var(--muted)]">
                  {data.detail.city} · {data.detail.district} · {data.detail.campType}
                </div>
                <h1 className="text-4xl font-bold">{data.detail.name}</h1>
                <p className="max-w-3xl text-sm leading-8 text-[var(--muted)]">{data.detail.summary}</p>
              </div>
              <div className="space-y-3 text-right">
                <div className="text-sm text-[var(--muted)]">价格</div>
                <div className="text-3xl font-bold">{formatPrice(data.camp.priceMin, data.camp.priceMax)}</div>
                <div className="text-sm text-[var(--muted)]">{data.detail.bookingRequired ? "建议预约" : "可直接前往"}</div>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              {data.detail.tags.map((item) => (
                <span key={item.tag.id} className="rounded-full border border-[var(--line)] px-4 py-2 text-sm text-[var(--muted)]">
                  {item.tag.name}
                </span>
              ))}
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {(data.detail.gallery as string[]).map((item) => (
              <div
                key={item}
                className="h-52 rounded-[28px] bg-[radial-gradient(circle_at_top,#96b6ad,transparent_36%),linear-gradient(135deg,#51715a,#d6ddd0)]"
              />
            ))}
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="card rounded-[32px] p-6">
              <div className="text-sm font-semibold text-[var(--muted)]">关键信息</div>
              <div className="mt-4 grid gap-3 text-sm">
                <div>收费方式：{data.detail.priceType}</div>
                <div>是否需要预约：{data.detail.bookingRequired ? "需要" : "不需要"}</div>
                <div>最佳季节：{data.detail.bestSeason}</div>
                <div>营地状态：{data.detail.openingStatus}</div>
                <div>地址：{data.detail.address}</div>
                <div>更新时间：{new Date(data.detail.updatedAt).toLocaleDateString("zh-CN")}</div>
              </div>
            </div>
            <div className="card rounded-[32px] p-6">
              <div className="text-sm font-semibold text-[var(--muted)]">设施与到达</div>
              <div className="mt-4 grid gap-3 text-sm">
                <div>卫生间：{data.detail.facility?.hasToilet ? "有" : "无"}</div>
                <div>淋浴：{data.detail.facility?.hasShower ? "有" : "无"}</div>
                <div>电源：{data.detail.facility?.hasPower ? "有" : "无"}</div>
                <div>明火：{data.detail.facility?.allowFire ? "允许" : "不允许"}</div>
                <div>手机信号：{data.detail.facility?.signalStrength}</div>
                <div>道路条件：{data.detail.facility?.roadCondition}</div>
                <div>停车距离：{data.detail.facility?.parkingDistance}</div>
              </div>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="card rounded-[32px] p-6">
              <div className="text-sm font-semibold text-[var(--muted)]">适合人群</div>
              <ul className="mt-4 space-y-3 text-sm leading-7 text-[var(--muted)]">
                {(data.detail.suitableFor as string[]).map((item) => (
                  <li key={item}>• {item}</li>
                ))}
              </ul>
            </div>
            <div className="card rounded-[32px] p-6">
              <div className="text-sm font-semibold text-[var(--muted)]">风险提示</div>
              <p className="mt-4 text-sm leading-7 text-[var(--muted)]">{data.detail.riskTips}</p>
              <div className="mt-4 text-sm font-semibold text-[var(--foreground)]">到达建议</div>
              <p className="mt-2 text-sm leading-7 text-[var(--muted)]">{data.detail.arrivalTips}</p>
            </div>
          </div>

          <div className="card rounded-[32px] p-6">
            <div className="flex items-end justify-between">
              <div>
                <div className="text-sm font-semibold text-[var(--muted)]">用户评价</div>
                <h2 className="text-3xl font-bold">真实到访反馈</h2>
              </div>
              {user ? (
                <Link href={`/reviews/new?campId=${data.detail.id}`} className="rounded-full border border-[var(--line)] px-4 py-2 text-sm">
                  写评论
                </Link>
              ) : (
                <Link href={`/login?next=/reviews/new?campId=${data.detail.id}`} className="rounded-full border border-[var(--line)] px-4 py-2 text-sm">
                  登录后写评论
                </Link>
              )}
            </div>

            <div className="mt-6 space-y-4">
              {data.detail.reviews.map((review) => (
                <article key={review.id} className="rounded-[24px] border border-[var(--line)] bg-white/60 p-5">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-semibold">{review.user.name}</div>
                      <div className="text-xs text-[var(--muted)]">
                        到访于 {new Date(review.visitDate).toLocaleDateString("zh-CN")}
                      </div>
                    </div>
                    <div className="rounded-full bg-[var(--accent-soft)] px-3 py-1 text-sm font-semibold text-[var(--accent-strong)]">
                      {review.overallScore}.0
                    </div>
                  </div>
                  <p className="mt-4 text-sm leading-8 text-[var(--muted)]">{review.text}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {review.tags.map((tag) => (
                      <span key={tag.tag.id} className="rounded-full border border-[var(--line)] px-3 py-1 text-xs text-[var(--muted)]">
                        {tag.tag.name}
                      </span>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <aside className="space-y-5">
          <div className="card sticky top-24 rounded-[32px] p-6">
            <div className="text-sm font-semibold text-[var(--muted)]">快速判断</div>
            <div className="mt-4 space-y-3 text-sm leading-7 text-[var(--muted)]">
              <p>官方 / 来源：{data.detail.sourceType}</p>
              <p>可过夜：{data.detail.facility?.canOvernight ? "是" : "否"}</p>
              <p>亲子友好：{data.detail.facility?.familyFriendly ? "是" : "否"}</p>
              <p>宠物友好：{data.detail.facility?.petFriendly ? "是" : "否"}</p>
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              <FavoriteButton
                campId={data.detail.id}
                favoriteListId={favoriteList?.id}
                initiallySaved={Boolean(favoriteList?.items.length)}
              />
              <Link
                href={`/compare?ids=${data.detail.id}`}
                className="rounded-full border border-[var(--line)] px-5 py-3 text-sm font-semibold"
              >
                加入对比
              </Link>
            </div>
            <div className="mt-6 rounded-[24px] bg-[var(--accent-soft)] p-4 text-sm leading-7 text-[var(--accent-strong)]">
              真地图暂未接入。这一版先通过静态点位、筛选和详情信息验证决策链路。
            </div>
          </div>

          <div className="space-y-4">
            <div className="text-sm font-semibold text-[var(--muted)]">相似营地</div>
            {data.similar.map((camp) => (
              <CampCard key={camp.id} camp={camp} compact />
            ))}
          </div>
        </aside>
      </div>
    </div>
  );
}
