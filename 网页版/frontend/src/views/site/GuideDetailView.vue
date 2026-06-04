<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";

import { campsApi } from "@/api/camps";
import { guidesApi } from "@/api/guides";
import CampCard from "@/components/site/CampCard.vue";
import type { ApiResponse, CampCardItem, GuideDetailItem } from "@/types/api";

const route = useRoute();
const detail = ref<GuideDetailItem | null>(null);
const related = ref<CampCardItem[]>([]);

onMounted(async () => {
  const slug = String(route.params.slug);
  const response = await guidesApi.detail(slug);
  detail.value = (response.data as ApiResponse<GuideDetailItem>).data;

  if (detail.value?.relatedCampSlugs?.length) {
    const compareResponse = await campsApi.compare(detail.value.relatedCampSlugs);
    related.value = (compareResponse.data as ApiResponse<CampCardItem[]>).data;
  }
});
</script>

<template>
  <div v-if="detail" class="shell page">
    <article class="panel content">
      <div class="meta">{{ detail.category }} · {{ detail.cityScope }}</div>
      <h1>{{ detail.title }}</h1>
      <p>{{ detail.summary }}</p>
      <div class="author-row">
        <span class="author-link">{{ detail.authorName }}</span>
        <span class="chip">{{ detail.authorRole }}</span>
        <span class="meta">{{ detail.publishedAt }}</span>
      </div>
      <div class="tag-row">
        <span v-for="tag in detail.moodTags" :key="tag" class="chip">{{ tag }}</span>
      </div>
      <h2>攻略正文</h2>
      <p>{{ detail.content }}</p>
    </article>

    <section v-if="related.length" class="related">
      <h2>这篇攻略里提到的营地</h2>
      <div class="camp-grid">
        <CampCard
          v-for="camp in related"
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
.content { padding: 28px; }
.meta { color: var(--muted); font-size: 12px; }
h2 { margin-top: 18px; }
p { color: var(--muted); line-height: 1.8; }
.related { margin-top: 18px; }
.author-row,
.tag-row {
  display: flex;
  gap: 10px;
  align-items: center;
  flex-wrap: wrap;
  margin-top: 14px;
}
.author-link {
  color: var(--primary-deep);
  font-weight: 700;
}
.camp-grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 18px; margin-top: 18px; }
</style>
