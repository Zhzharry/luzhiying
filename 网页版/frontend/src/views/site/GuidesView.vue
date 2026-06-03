<script setup lang="ts">
import { onMounted, ref } from "vue";

import { guidesApi } from "@/api/guides";
import { useFavoritesStore } from "@/stores/favorites";
import type { ApiResponse, GuideItem } from "@/types/api";

const guides = ref<GuideItem[]>([]);
const keyword = ref("");
const cityScope = ref("");
const cities = ["", "杭州", "苏州", "成都"];
const favoritesStore = useFavoritesStore();

async function load() {
  const response = await guidesApi.list({
    keyword: keyword.value || undefined,
    cityScope: cityScope.value || undefined,
  });
  guides.value = (response.data as ApiResponse<GuideItem[]>).data;
}

function submitSearch() {
  favoritesStore.addGuideSearch(keyword.value || cityScope.value);
  load();
}

onMounted(load);
</script>

<template>
  <div class="shell page">
    <div class="panel content">
      <h1>攻略列表</h1>
      <p>这里承接新手指南、季节避坑、城市周边专题，当前已经要求登录后访问，并支持按关键词和城市搜索。</p>
      <div class="toolbar">
        <input v-model="keyword" class="field" placeholder="搜索攻略标题、主题或避坑关键词" />
        <select v-model="cityScope" class="field">
          <option v-for="city in cities" :key="city" :value="city">{{ city || "全部城市" }}</option>
        </select>
        <button class="btn-primary" type="button" @click="submitSearch">搜索攻略</button>
      </div>
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
.toolbar { display: grid; grid-template-columns: 1fr 160px 140px; gap: 12px; margin: 18px 0; }
.guide-list { display: grid; gap: 14px; margin-top: 18px; }
.guide-item { border: 1px solid var(--line); border-radius: 20px; padding: 16px; }
.meta { color: var(--muted); font-size: 12px; margin-bottom: 8px; }
</style>
