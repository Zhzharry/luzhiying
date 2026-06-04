<script setup lang="ts">
import { computed, onMounted, reactive, ref } from "vue";
import { useRoute, useRouter } from "vue-router";

import { reviewsApi } from "@/api/reviews";
import { campsApi } from "@/api/camps";
import { useAuthStore } from "@/stores/auth";
import { useFavoritesStore } from "@/stores/favorites";
import CampCard from "@/components/site/CampCard.vue";
import type { ApiResponse, CampCardItem, CampDetailItem, ReviewItem } from "@/types/api";

const route = useRoute();
const router = useRouter();
const authStore = useAuthStore();
const favoritesStore = useFavoritesStore();
const detail = ref<CampDetailItem | null>(null);
const reviews = ref<ReviewItem[]>([]);
const similar = ref<CampCardItem[]>([]);
const actionLoading = ref(false);
const submitLoading = ref(false);
const helpfulLoadingIds = ref<number[]>([]);
const reviewSort = ref<"latest" | "hot">("latest");
const composer = reactive({
  overallScore: 4,
  sceneScore: 4,
  cleanScore: 4,
  quietScore: 4,
  accessScore: 4,
  newbieScore: 4,
  familyScore: 4,
  costScore: 4,
  content: "",
  visitDate: "",
});

const reviewCountText = computed(() => `${reviews.value.length} 条营地评价`);

async function toggleFavorite() {
  if (!detail.value || actionLoading.value) {
    return;
  }
  if (!authStore.isAuthenticated) {
    router.push({ name: "login", query: { redirect: route.fullPath } });
    return;
  }
  actionLoading.value = true;
  try {
    await favoritesStore.toggleFavorite(detail.value.slug, detail.value.id);
  } finally {
    actionLoading.value = false;
  }
}

async function loadReviews(slug: string, sortBy = reviewSort.value) {
  const reviewResponse = await reviewsApi.byCamp(slug, sortBy);
  reviews.value = (reviewResponse.data as ApiResponse<ReviewItem[]>).data;
}

async function changeReviewSort(sortBy: "latest" | "hot") {
  if (!detail.value || reviewSort.value === sortBy) {
    return;
  }
  reviewSort.value = sortBy;
  await loadReviews(detail.value.slug, sortBy);
}

async function submitReview() {
  if (!detail.value) {
    return;
  }
  if (!authStore.isAuthenticated) {
    router.push({ name: "login", query: { redirect: route.fullPath } });
    return;
  }
  submitLoading.value = true;
  try {
    await reviewsApi.create({
      campId: detail.value.id,
      overallScore: composer.overallScore,
      sceneScore: composer.sceneScore,
      cleanScore: composer.cleanScore,
      quietScore: composer.quietScore,
      accessScore: composer.accessScore,
      newbieScore: composer.newbieScore,
      familyScore: composer.familyScore,
      costScore: composer.costScore,
      content: composer.content,
      visitDate: composer.visitDate,
      recommendTags: ["真实到访"],
      warningTags: [],
    });
    composer.content = "";
    composer.visitDate = "";
    await loadReviews(detail.value.slug);
  } finally {
    submitLoading.value = false;
  }
}

async function markHelpful(reviewId: number) {
  if (helpfulLoadingIds.value.includes(reviewId)) {
    return;
  }
  helpfulLoadingIds.value = [...helpfulLoadingIds.value, reviewId];
  try {
    const response = await reviewsApi.helpful(reviewId);
    const updated = (response.data as ApiResponse<ReviewItem>).data;
    reviews.value = reviews.value.map((item) => (item.id === reviewId ? updated : item));
  } finally {
    helpfulLoadingIds.value = helpfulLoadingIds.value.filter((item) => item !== reviewId);
  }
}

onMounted(async () => {
  const slug = String(route.params.slug);
  const [detailResponse, similarResponse] = await Promise.all([campsApi.detail(slug), campsApi.similar(slug)]);

  detail.value = (detailResponse.data as ApiResponse<CampDetailItem>).data;
  similar.value = (similarResponse.data as ApiResponse<CampCardItem[]>).data;
  await loadReviews(slug);
  favoritesStore.addRecentCamp(slug);
  if (authStore.isAuthenticated) {
    await campsApi.view(slug);
  }
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
        <button class="btn-primary" :disabled="actionLoading" @click="toggleFavorite">
          {{ favoritesStore.favoriteCampSlugs.includes(detail.slug) ? "取消收藏" : "加入收藏" }}
        </button>
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
      <div class="review-head">
        <div>
          <h2>营地评价</h2>
          <p>{{ reviewCountText }}，这里仅保留和营地本身相关的评分、体验和到访补充。</p>
        </div>
        <RouterLink class="btn-secondary" :to="detail ? `/reviews/new?campId=${detail.id}` : '/reviews/new'">打开完整评价页</RouterLink>
      </div>
      <div class="composer">
        <div class="composer-top">
          <strong>补充你的到访评价</strong>
          <span class="chip">{{ authStore.isAuthenticated ? "已登录，可直接提交" : "登录后可提交评价" }}</span>
        </div>
        <div class="score-row">
          <label>
            <span>总体评分</span>
            <input v-model.number="composer.overallScore" class="field mini-field" type="number" min="1" max="5" />
          </label>
          <label>
            <span>到访日期</span>
            <input v-model="composer.visitDate" class="field mini-field" type="date" />
          </label>
        </div>
        <textarea
          v-model="composer.content"
          class="field composer-textarea"
          placeholder="写下你对这个营地的体验、提醒和避坑建议，越真实越有价值。"
        />
        <div class="composer-actions">
          <span class="muted">建议优先写清卫生、路况、是否适合新手、有没有明显坑点。</span>
          <button class="btn-primary" :disabled="submitLoading || !composer.content || !composer.visitDate" @click="submitReview">
            {{ submitLoading ? "提交中..." : "提交评价" }}
          </button>
        </div>
      </div>
      <div class="sort-switch">
        <button class="sort-pill" :class="{ active: reviewSort === 'latest' }" @click="changeReviewSort('latest')">最新</button>
        <button class="sort-pill" :class="{ active: reviewSort === 'hot' }" @click="changeReviewSort('hot')">最热</button>
      </div>
      <div class="review-list">
        <article v-for="review in reviews" :key="review.id" class="review-item">
          <div class="row">
            <div class="author-block">
              <div class="review-meta-top">
                <span class="floor">#{{ review.floor }}</span>
                <span class="author-link">{{ review.author }}</span>
              </div>
              <div class="visit">{{ review.createdAt || review.visitDate }}</div>
            </div>
            <span class="score-badge">{{ review.overallScore }} 分</span>
          </div>
          <div class="visit">到访于 {{ review.visitDate }}</div>
          <p>{{ review.content }}</p>
          <div class="review-foot">
            <div class="chip-list">
              <span v-for="tag in review.tags" :key="tag" class="chip">{{ tag }}</span>
            </div>
            <button class="btn-ghost helpful-btn" :disabled="helpfulLoadingIds.includes(review.id)" @click="markHelpful(review.id)">
              👍 有帮助 {{ review.helpfulCount || 0 }}
            </button>
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
.review-head {
  display: flex;
  justify-content: space-between;
  gap: 24px;
  align-items: flex-start;
  margin-bottom: 20px;
}
.review-actions {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}
.composer {
  padding: 20px;
  border-radius: 24px;
  background: rgba(255, 255, 255, 0.64);
  border: 1px solid var(--line);
  margin-bottom: 18px;
}
.composer-top {
  display: flex;
  justify-content: space-between;
  gap: 14px;
  align-items: center;
  margin-bottom: 14px;
}
.score-row {
  display: grid;
  grid-template-columns: 180px 220px;
  gap: 12px;
}
.score-row label {
  display: grid;
  gap: 6px;
  font-size: 13px;
  color: var(--muted);
}
.mini-field {
  padding-top: 10px;
  padding-bottom: 10px;
}
.composer-textarea {
  min-height: 120px;
  margin-top: 12px;
  resize: vertical;
}
.composer-actions {
  display: flex;
  justify-content: space-between;
  gap: 16px;
  align-items: center;
  margin-top: 14px;
}
.sort-switch {
  display: inline-flex;
  gap: 8px;
  padding: 6px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.72);
  border: 1px solid var(--line);
  margin-bottom: 16px;
}
.sort-pill {
  border: 0;
  background: transparent;
  color: var(--muted);
  padding: 10px 16px;
  border-radius: 999px;
  cursor: pointer;
  font-weight: 700;
}
.sort-pill.active {
  background: rgba(47, 93, 80, 0.12);
  color: var(--primary-deep);
}
.review-list { display: grid; gap: 14px; }
.review-item { border: 1px solid var(--line); border-radius: 20px; padding: 16px; }
.row { display: flex; justify-content: space-between; gap: 12px; }
.review-meta-top {
  display: flex;
  align-items: center;
  gap: 10px;
}
.floor {
  padding: 6px 10px;
  border-radius: 999px;
  background: rgba(47, 93, 80, 0.08);
  color: var(--primary-deep);
  font-size: 12px;
  font-weight: 700;
}
.author-link {
  color: var(--primary-deep);
  font-weight: 700;
}
.score-badge {
  min-width: 58px;
  text-align: center;
  padding: 8px 12px;
  border-radius: 999px;
  background: rgba(47, 93, 80, 0.08);
  color: var(--primary-deep);
  font-weight: 700;
}
.review-foot {
  display: flex;
  justify-content: space-between;
  gap: 16px;
  align-items: center;
}
.helpful-btn {
  white-space: nowrap;
}
.camp-grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 18px; margin-top: 18px; }
.chip-list { display: flex; flex-wrap: wrap; gap: 8px; }
.btn-primary[disabled] { opacity: 0.7; cursor: not-allowed; }
</style>
