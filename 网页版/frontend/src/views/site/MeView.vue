<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import CampCard from "@/components/site/CampCard.vue";
import { useAuthStore } from "@/stores/auth";
import { useFavoritesStore } from "@/stores/favorites";
import { meApi } from "@/api/me";
import type { ApiResponse, MeOverview } from "@/types/api";

const authStore = useAuthStore();
const favoritesStore = useFavoritesStore();
const overview = ref<MeOverview | null>(null);
const loading = ref(false);

const summary = computed(() => [
  { label: "收藏营地", value: overview.value?.favoriteCount || 0 },
  { label: "最近浏览", value: overview.value?.recentCount || 0 },
  { label: "我的评论", value: overview.value?.reviewCount || 0 },
]);

async function load() {
  loading.value = true;
  try {
    const response = await meApi.overview();
    overview.value = (response.data as ApiResponse<MeOverview>).data;
    favoritesStore.recentCampSlugs = overview.value.recentCamps.map((item) => item.slug);
    favoritesStore.persist();
  } finally {
    loading.value = false;
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
          <strong>{{ overview?.user.name || authStore.session?.name }}</strong>
          <div class="muted">{{ overview?.user.email || authStore.session?.email }}</div>
        </div>
        <div class="chip">{{ overview?.user.role || authStore.session?.role }}</div>
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
        <div v-if="loading" class="muted">正在加载你的内容...</div>
        <div v-else-if="overview?.favoriteCamps.length" class="list">
          <CampCard
            v-for="camp in overview.favoriteCamps"
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
        <div v-if="overview?.recentCamps.length" class="list">
          <CampCard
            v-for="camp in overview.recentCamps"
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
      <section class="section">
        <h2>我的评论</h2>
        <div v-if="overview?.myReviews.length" class="review-list">
          <article v-for="review in overview.myReviews" :key="review.id" class="review-item">
            <div class="row">
              <strong>{{ review.campName }}</strong>
              <span class="chip">{{ review.status }}</span>
            </div>
            <div class="muted">{{ review.visitDate }}</div>
            <p>{{ review.content }}</p>
          </article>
        </div>
        <div v-else class="muted">你还没有发布过评论。</div>
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
.review-list { display: grid; gap: 12px; margin-top: 12px; }
.review-item { border: 1px solid var(--line); border-radius: 16px; padding: 16px; }
.row { display: flex; justify-content: space-between; gap: 12px; }
</style>
