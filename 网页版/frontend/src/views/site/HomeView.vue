<script setup lang="ts">
import { onMounted, ref } from "vue";

import CampCard from "@/components/site/CampCard.vue";
import SectionTitle from "@/components/common/SectionTitle.vue";
import { campsApi } from "@/api/camps";
import type { ApiResponse, CampCardItem, PageResult } from "@/types/api";

const featuredCamps = ref<CampCardItem[]>([]);

onMounted(async () => {
  const response = await campsApi.list();
  const payload = response.data as ApiResponse<PageResult<CampCardItem>>;
  featuredCamps.value = payload.data.list.slice(0, 3);
});
</script>

<template>
  <div class="shell page home-page">
    <section class="panel hero">
      <div class="left">
        <span class="chip">更适合桌面端决策的露营地工具</span>
        <h1>把“去哪露营”做成一眼能判断的商业化决策界面。</h1>
        <p>
          露之营聚焦自驾露营新手的出发前决策，用结构化筛选、营地详情、真实点评和候选对比，把“去哪露营”这件事讲清楚。
        </p>
        <div class="actions">
          <RouterLink class="btn-primary" to="/discover">开始找营地</RouterLink>
          <RouterLink class="btn-secondary" to="/guides">看攻略专栏</RouterLink>
        </div>
        <div class="hero-strip">
          <div class="strip-card">
            <strong>营地信息</strong>
            <span>设施、路况、是否适合新手一次看清</span>
          </div>
          <div class="strip-card">
            <strong>真实口碑</strong>
            <span>结构化点评替代碎片化搜索</span>
          </div>
          <div class="strip-card">
            <strong>候选对比</strong>
            <span>把多个营地放到同一张决策桌上</span>
          </div>
        </div>
      </div>
      <div class="right">
        <div class="hero-board">
          <div class="board-top">
            <span class="eyebrow">本周精选区域</span>
            <strong>杭州 / 苏州 / 成都</strong>
          </div>
          <div class="board-grid">
            <div class="stats panel">
              <div>首版重点</div>
              <strong>筛选、详情、收藏、对比</strong>
            </div>
            <div class="stats panel">
              <div>决策效率</div>
              <strong>5-10 分钟锁定周末候选营地</strong>
            </div>
          </div>
          <div class="board-foot panel">
            <div class="mini-title">本轮推荐体验路径</div>
            <ol>
              <li>先在找营地页筛出可过夜 / 新手友好的营地</li>
              <li>进入详情页看风险提示与真实评价</li>
              <li>收藏 2 到 4 个候选后回到对比页做决策</li>
            </ol>
          </div>
        </div>
      </div>
    </section>

    <section class="section-block">
      <SectionTitle
        eyebrow="热门营地"
        title="先看这批适合新手的候选营地"
        description="我们把最适合第一次周末轻露营的营地放在首页，让用户可以先看清基础条件，再深入查看详情。"
      />
      <div class="camp-grid">
        <CampCard
          v-for="camp in featuredCamps"
          :key="camp.slug"
          :slug="camp.slug"
          :title="camp.name"
          :city="`${camp.city} · ${camp.district}`"
          :summary="camp.summary"
          :price="camp.priceText"
          :score="String(camp.score)"
        />
      </div>
    </section>

    <section class="panel insight">
      <div class="insight-copy">
        <span class="chip">为什么这样设计</span>
        <h2>不是旅游内容站，而是露营决策界面。</h2>
        <p>视觉上更像一套可信的消费决策产品：信息分层明确、入口足够丰富、卡片和数据块同时服务于“找得到”和“看得懂”。</p>
      </div>
      <div class="insight-matrix">
        <div class="matrix-item">
          <strong>结构化筛选</strong>
          <span>按城市、定位、评分、距离快速收窄范围</span>
        </div>
        <div class="matrix-item">
          <strong>营地可信度</strong>
          <span>评论、设施、到达建议和风险提示同屏出现</span>
        </div>
        <div class="matrix-item">
          <strong>新手友好度</strong>
          <span>把适合第一次去的营地优先露出</span>
        </div>
        <div class="matrix-item">
          <strong>桌面端效率</strong>
          <span>大视野列表和地图并排，不再来回切应用</span>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped lang="scss">
.page { padding: 28px 0 64px; }
.hero {
  display: grid;
  grid-template-columns: 1.08fr 0.92fr;
  gap: 30px;
  padding: 42px;
  background:
    radial-gradient(circle at 85% 16%, rgba(180, 201, 168, 0.22), transparent 18%),
    linear-gradient(180deg, rgba(255, 253, 248, 0.98), rgba(247, 241, 230, 0.95));
}

.left h1 { margin: 18px 0 10px; font-size: 60px; line-height: 1.02; max-width: 760px; }
.left p { max-width: 700px; color: var(--muted); line-height: 1.9; font-size: 16px; }
.actions { display: flex; gap: 12px; margin-top: 18px; }

.hero-strip {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 12px;
  margin-top: 26px;
}

.strip-card {
  padding: 18px;
  border-radius: 22px;
  background: rgba(255, 255, 255, 0.72);
  border: 1px solid rgba(35, 48, 42, 0.08);
}

.strip-card strong,
.stats strong,
.matrix-item strong,
.board-foot .mini-title {
  display: block;
}

.strip-card span,
.matrix-item span,
.board-foot li,
.board-top .eyebrow {
  color: var(--muted);
}

.right {
  display: flex;
  align-items: stretch;
}

.hero-board {
  width: 100%;
  padding: 26px;
  border-radius: 32px;
  background:
    linear-gradient(180deg, rgba(34, 56, 46, 0.96), rgba(46, 79, 66, 0.9));
  color: #f7f5ef;
  box-shadow: 0 28px 58px rgba(29, 62, 53, 0.26);
}

.board-top strong {
  display: block;
  margin-top: 12px;
  font-size: 34px;
  line-height: 1.12;
}

.board-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 14px;
  margin-top: 20px;
}

.stats {
  padding: 22px;
  background: rgba(255, 255, 255, 0.08);
  border-color: rgba(255, 255, 255, 0.1);
}

.stats strong { margin-top: 10px; font-size: 22px; }

.board-foot {
  margin-top: 16px;
  padding: 20px 22px;
  background: rgba(255, 255, 255, 0.08);
  border-color: rgba(255, 255, 255, 0.1);
}

.board-foot ol {
  margin: 10px 0 0;
  padding-left: 18px;
  line-height: 1.8;
}

.camp-grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 18px; margin-top: 22px; }

.insight {
  display: grid;
  grid-template-columns: 0.9fr 1.1fr;
  gap: 30px;
  padding: 36px;
  margin-top: 30px;
}

.insight-copy h2 {
  margin: 18px 0 10px;
  font-size: 42px;
  line-height: 1.08;
}

.insight-copy p {
  color: var(--muted);
  line-height: 1.9;
}

.insight-matrix {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 14px;
}

.matrix-item {
  padding: 22px;
  border-radius: 24px;
  background: rgba(255, 255, 255, 0.62);
  border: 1px solid rgba(35, 48, 42, 0.08);
}

.matrix-item span {
  display: block;
  margin-top: 8px;
  line-height: 1.75;
}
</style>
