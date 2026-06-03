<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";

import { campsApi } from "@/api/camps";
import CampCard from "@/components/site/CampCard.vue";
import type { ApiResponse, CampCardItem, CampDetailItem } from "@/types/api";

const route = useRoute();
const detail = ref<CampDetailItem | null>(null);
const reviews = ref<Array<{ author: string; overallScore: number; content: string; visitDate: string; tags: string[] }>>([]);
const similar = ref<CampCardItem[]>([]);

onMounted(async () => {
  const slug = String(route.params.slug);
  const [detailResponse, reviewResponse, similarResponse] = await Promise.all([
    campsApi.detail(slug),
    campsApi.reviews(slug),
    campsApi.similar(slug),
  ]);

  detail.value = (detailResponse.data as ApiResponse<CampDetailItem>).data;
  reviews.value = (reviewResponse.data as ApiResponse<typeof reviews.value>).data;
  similar.value = (similarResponse.data as ApiResponse<CampCardItem[]>).data;
});
</script>

<template>
  <div v-if="detail" class="shell page">
    <section class="panel head">
      <div>
        <div class="chip">{{ detail.city }} · {{ detail.district }} · {{ detail.campType }}</div>
        <h1>{{ detail.name }}</h1>
        <p>{{ detail.summary }}</p>
      </div>
      <div class="quick">
        <div class="price">¥{{ detail.priceMin }} - ¥{{ detail.priceMax }}</div>
        <button class="btn-primary">加入收藏</button>
      </div>
    </section>

    <div class="detail-grid">
      <section class="panel block">
        <h3>关键信息</h3>
        <ul>
          <li>可过夜：{{ detail.facility.canOvernight ? "是" : "否" }}</li>
          <li>卫生间：{{ detail.facility.hasToilet ? "有" : "无" }}</li>
          <li>淋浴：{{ detail.facility.hasShower ? "有" : "无" }}</li>
          <li>亲子友好：{{ detail.facility.familyFriendly ? "是" : "否" }}</li>
          <li>车可到营位附近：{{ detail.facility.carAccessible ? "是" : "否" }}</li>
        </ul>
      </section>
      <section class="panel block">
        <h3>风险提示</h3>
        <p>{{ detail.riskTips }}</p>
        <h4>到达建议</h4>
        <p>{{ detail.arrivalTips }}</p>
      </section>
    </div>

    <section class="panel reviews">
      <h2>真实评价</h2>
      <div class="review-list">
        <article v-for="review in reviews" :key="review.author + review.visitDate" class="review-item">
          <div class="row">
            <strong>{{ review.author }}</strong>
            <span>{{ review.overallScore }} 分</span>
          </div>
          <div class="visit">到访于 {{ review.visitDate }}</div>
          <p>{{ review.content }}</p>
          <div class="chip-list">
            <span v-for="tag in review.tags" :key="tag" class="chip">{{ tag }}</span>
          </div>
        </article>
      </div>
    </section>

    <section>
      <h2>相似营地</h2>
      <div class="camp-grid">
        <CampCard
          v-for="camp in similar"
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
.head { display: flex; justify-content: space-between; gap: 24px; padding: 28px; }
h1 { margin: 16px 0 8px; font-size: 44px; }
h2 { margin: 0 0 16px; }
h4 { margin: 16px 0 6px; }
p, li, .visit { color: var(--muted); line-height: 1.8; }
.quick { min-width: 220px; }
.price { margin-bottom: 14px; font-size: 32px; font-weight: 700; }
.detail-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 18px; margin-top: 18px; }
.block, .reviews { padding: 22px; }
.review-list { display: grid; gap: 14px; }
.review-item { border: 1px solid var(--line); border-radius: 20px; padding: 16px; }
.row { display: flex; justify-content: space-between; gap: 12px; }
.camp-grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 18px; margin-top: 18px; }
.chip-list { display: flex; flex-wrap: wrap; gap: 8px; }
</style>
