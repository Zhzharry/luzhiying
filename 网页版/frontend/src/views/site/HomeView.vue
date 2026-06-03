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
        <h1>先筛条件，再做决定。</h1>
        <p>
          露之营聚焦自驾露营新手的出发前决策，用结构化筛选、营地详情、真实点评和候选对比，把“去哪露营”这件事讲清楚。
        </p>
        <div class="actions">
          <RouterLink class="btn-primary" to="/discover">开始找营地</RouterLink>
          <RouterLink class="btn-secondary" to="/guides">查看攻略</RouterLink>
        </div>
      </div>
      <div class="right grid-lines">
        <div class="stats panel">
          <div>热门城市</div>
          <strong>杭州 / 苏州 / 成都</strong>
        </div>
        <div class="stats panel">
          <div>首版重点</div>
          <strong>筛选、详情、收藏、对比</strong>
        </div>
      </div>
    </section>

    <section>
      <SectionTitle
        eyebrow="热门营地"
        title="先看这批适合新手的候选营地"
        description="现在首页已经直接请求 Java 后端，不再依赖纯前端常量。"
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
  </div>
</template>

<style scoped lang="scss">
.page { padding: 28px 0 64px; }
.hero { display: grid; grid-template-columns: 1.1fr 0.9fr; gap: 28px; padding: 36px; }
.left h1 { margin: 18px 0 10px; font-size: 56px; line-height: 1.1; }
.left p { max-width: 700px; color: var(--muted); line-height: 1.9; }
.actions { display: flex; gap: 12px; margin-top: 18px; }
.right { display: grid; align-content: center; gap: 18px; min-height: 360px; padding: 24px; border-radius: 28px; }
.stats { padding: 22px; }
.stats strong { display: block; margin-top: 10px; font-size: 26px; }
.camp-grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 18px; margin-top: 22px; }
</style>
