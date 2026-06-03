<script setup lang="ts">
import { onMounted, ref } from "vue";

import { guidesApi } from "@/api/guides";
import type { ApiResponse, GuideItem } from "@/types/api";

const guides = ref<GuideItem[]>([]);

onMounted(async () => {
  const response = await guidesApi.list();
  guides.value = (response.data as ApiResponse<GuideItem[]>).data;
});
</script>

<template>
  <div class="shell page">
    <div class="panel content">
      <h1>攻略列表</h1>
      <p>这里承接新手指南、季节避坑、城市周边专题，不做重社区内容流。</p>
      <div class="guide-list">
        <RouterLink v-for="guide in guides" :key="guide.slug" :to="`/guides/${guide.slug}`" class="guide-item">
          <div class="meta">{{ guide.category }} · {{ guide.cityScope }}</div>
          <strong>{{ guide.title }}</strong>
          <p>{{ guide.summary }}</p>
        </RouterLink>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.page { padding: 28px 0 64px; }
.content { padding: 28px; }
p { color: var(--muted); line-height: 1.8; }
.guide-list { display: grid; gap: 14px; margin-top: 18px; }
.guide-item { border: 1px solid var(--line); border-radius: 20px; padding: 16px; }
.meta { color: var(--muted); font-size: 12px; margin-bottom: 8px; }
</style>
