<script setup lang="ts">
import { onMounted, ref } from "vue";
import { campsApi } from "@/api/camps";
import { useFavoritesStore } from "@/stores/favorites";
import type { ApiResponse, CampCardItem } from "@/types/api";

const favoritesStore = useFavoritesStore();
const items = ref<CampCardItem[]>([]);

async function load() {
  const ids = favoritesStore.compareIds.length ? favoritesStore.compareIds : favoritesStore.favoriteCampSlugs.slice(0, 4);
  if (!ids.length) {
    items.value = [];
    return;
  }
  const response = await campsApi.compare(ids);
  items.value = (response.data as ApiResponse<CampCardItem[]>).data;
}

onMounted(load);
</script>

<template>
  <div class="shell page">
    <div class="panel content">
      <h1>营地对比</h1>
      <p>优先比较价格、评分和是否值得加入你的周末候选清单。</p>
      <table v-if="items.length">
        <thead>
          <tr>
            <th>字段</th>
            <th v-for="camp in items" :key="camp.slug">{{ camp.name }}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>城市</td>
            <td v-for="camp in items" :key="`${camp.slug}-city`">{{ camp.city }} · {{ camp.district }}</td>
          </tr>
          <tr>
            <td>价格</td>
            <td v-for="camp in items" :key="`${camp.slug}-price`">{{ camp.priceText }}</td>
          </tr>
          <tr>
            <td>评分</td>
            <td v-for="camp in items" :key="`${camp.slug}-score`">{{ camp.score }}</td>
          </tr>
          <tr>
            <td>摘要</td>
            <td v-for="camp in items" :key="`${camp.slug}-summary`">{{ camp.summary }}</td>
          </tr>
        </tbody>
      </table>
      <div v-else class="empty">先从找营地或收藏页挑选 2 到 4 个营地，再回到这里做对比。</div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.page { padding: 28px 0 64px; }
.content { padding: 28px; overflow-x: auto; }
table { width: 100%; border-collapse: collapse; }
th, td { padding: 12px; border-bottom: 1px solid var(--line); text-align: left; }
.empty, p { color: var(--muted); line-height: 1.8; }
</style>
