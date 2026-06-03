<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import CampCard from "@/components/site/CampCard.vue";
import { useAuthStore } from "@/stores/auth";
import { useFavoritesStore } from "@/stores/favorites";
import { campsApi } from "@/api/camps";
import type { ApiResponse, CampCardItem } from "@/types/api";

const authStore = useAuthStore();
const favoritesStore = useFavoritesStore();
const favoriteItems = ref<CampCardItem[]>([]);
const recentItems = ref<CampCardItem[]>([]);

const summary = computed(() => [
  { label: "收藏营地", value: favoritesStore.favoriteCampSlugs.length },
  { label: "最近浏览", value: favoritesStore.recentCampSlugs.length },
  { label: "攻略搜索记录", value: favoritesStore.guideSearchHistory.length },
]);

async function load() {
  if (favoritesStore.favoriteCampSlugs.length) {
    const favoriteResponse = await campsApi.compare(favoritesStore.favoriteCampSlugs);
    favoriteItems.value = (favoriteResponse.data as ApiResponse<CampCardItem[]>).data;
  }
  if (favoritesStore.recentCampSlugs.length) {
    const recentResponse = await campsApi.compare(favoritesStore.recentCampSlugs);
    recentItems.value = (recentResponse.data as ApiResponse<CampCardItem[]>).data;
  }
}

onMounted(load);
</script>

<template>
  <div class="shell page">
    <div class="panel content">
      <h1>个人中心</h1>
      <p>这里集中查看你的账号信息、收藏营地、最近浏览和攻略搜索记录。</p>
      <div class="profile">
        <div>
          <strong>{{ authStore.session?.name }}</strong>
          <div class="muted">{{ authStore.session?.email }}</div>
        </div>
        <div class="chip">{{ authStore.session?.role }}</div>
      </div>
      <div class="stats">
        <div v-for="item in summary" :key="item.label" class="stat">
          <div class="muted">{{ item.label }}</div>
          <strong>{{ item.value }}</strong>
        </div>
      </div>
      <section class="section">
        <h2>攻略搜索记录</h2>
        <div class="chips">
          <span v-for="item in favoritesStore.guideSearchHistory" :key="item" class="chip">{{ item }}</span>
          <span v-if="!favoritesStore.guideSearchHistory.length" class="muted">你还没有搜索过攻略。</span>
        </div>
      </section>
      <section class="section">
        <h2>我的收藏</h2>
        <div v-if="favoriteItems.length" class="list">
          <CampCard
            v-for="camp in favoriteItems"
            :key="camp.slug"
            :slug="camp.slug"
            :title="camp.name"
            :city="`${camp.city} · ${camp.district}`"
            :summary="camp.summary"
            :price="camp.priceText"
            :score="String(camp.score)"
          />
        </div>
        <div v-else class="muted">还没有收藏营地。</div>
      </section>
      <section class="section">
        <h2>最近浏览</h2>
        <div v-if="recentItems.length" class="list">
          <CampCard
            v-for="camp in recentItems"
            :key="camp.slug"
            :slug="camp.slug"
            :title="camp.name"
            :city="`${camp.city} · ${camp.district}`"
            :summary="camp.summary"
            :price="camp.priceText"
            :score="String(camp.score)"
          />
        </div>
        <div v-else class="muted">还没有浏览记录。</div>
      </section>
    </div>
  </div>
</template>

<style scoped lang="scss">
.page { padding: 28px 0 64px; }
.content { padding: 28px; }
p, .muted { color: var(--muted); line-height: 1.8; }
.profile { display: flex; justify-content: space-between; align-items: center; margin: 18px 0; }
.stats { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 12px; margin: 18px 0; }
.stat { border: 1px solid var(--line); border-radius: 18px; padding: 16px; }
.section { margin-top: 24px; }
.chips { display: flex; flex-wrap: wrap; gap: 8px; }
.list { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 16px; margin-top: 12px; }
</style>
