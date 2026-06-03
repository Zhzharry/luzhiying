<script setup lang="ts">
import { onMounted, ref } from "vue";
import CampCard from "@/components/site/CampCard.vue";
import { useFavoritesStore } from "@/stores/favorites";
import { campsApi } from "@/api/camps";
import type { ApiResponse, CampCardItem } from "@/types/api";

const favoritesStore = useFavoritesStore();
const items = ref<CampCardItem[]>([]);

async function load() {
  if (!favoritesStore.favoriteCampSlugs.length) {
    items.value = [];
    return;
  }
  const response = await campsApi.compare(favoritesStore.favoriteCampSlugs);
  items.value = (response.data as ApiResponse<CampCardItem[]>).data;
}

onMounted(load);
</script>

<template>
  <div class="shell page">
    <div class="panel content">
      <h1>我的收藏</h1>
      <p>收藏的营地可以继续加入对比，帮助你在出发前快速做决定。</p>
      <div class="actions">
        <RouterLink class="btn-primary" to="/compare">进入对比</RouterLink>
      </div>
      <div v-if="items.length" class="list">
        <CampCard
          v-for="camp in items"
          :key="camp.slug"
          :slug="camp.slug"
          :title="camp.name"
          :city="`${camp.city} · ${camp.district}`"
          :summary="camp.summary"
          :price="camp.priceText"
          :score="String(camp.score)"
        />
      </div>
      <div v-else class="empty">你还没有收藏营地，先去找营地页挑几个候选吧。</div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.page { padding: 28px 0 64px; }
.content { padding: 28px; }
p { color: var(--muted); line-height: 1.8; }
.actions { margin: 18px 0; }
.list { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 16px; }
.empty { color: var(--muted); margin-top: 16px; }
</style>
