<script setup lang="ts">
import { onMounted, ref } from "vue";

import SectionTitle from "@/components/common/SectionTitle.vue";
import StaticMapPanel from "@/components/map/StaticMapPanel.vue";
import CampCard from "@/components/site/CampCard.vue";
import { campsApi } from "@/api/camps";
import type { ApiResponse, CampCardItem, PageResult } from "@/types/api";

const keyword = ref("");
const city = ref("");
const locationText = ref("");
const latitude = ref<number | null>(null);
const longitude = ref<number | null>(null);
const sortBy = ref("score");
const cities = ["", "杭州", "苏州", "成都"];
const items = ref<CampCardItem[]>([]);
const locating = ref(false);

async function load() {
  const response = await campsApi.list({
    keyword: keyword.value || undefined,
    city: city.value || undefined,
    locationText: locationText.value || undefined,
    latitude: latitude.value || undefined,
    longitude: longitude.value || undefined,
    radiusKm: latitude.value && longitude.value ? 80 : undefined,
    sortBy: sortBy.value,
  });
  const payload = response.data as ApiResponse<PageResult<CampCardItem>>;
  items.value = payload.data.list;
}

function useMyLocation() {
  if (!navigator.geolocation) {
    return;
  }
  locating.value = true;
  navigator.geolocation.getCurrentPosition(
    (position) => {
      latitude.value = position.coords.latitude;
      longitude.value = position.coords.longitude;
      locating.value = false;
      load();
    },
    () => {
      locating.value = false;
    },
  );
}

onMounted(load);
</script>

<template>
  <div class="shell page">
    <section class="panel discover-hero">
      <div>
        <span class="chip">露营地发现中心</span>
        <h1>把周边营地放进一张真正适合决策的工作台。</h1>
        <p>你可以按城市、定位、距离和新手友好度快速收窄范围，右侧地图负责建立空间感，左侧列表负责推进最终判断。</p>
      </div>
      <div class="hero-facts">
        <div class="fact-card">
          <strong>{{ items.length }}</strong>
          <span>当前候选营地</span>
        </div>
        <div class="fact-card">
          <strong>{{ sortBy === 'distance' ? '距离优先' : sortBy === 'newbie' ? '新手优先' : '评分优先' }}</strong>
          <span>当前排序策略</span>
        </div>
      </div>
    </section>

    <SectionTitle
      eyebrow="找营地"
      title="按条件筛，按位置看，按细节决定"
      description="这一页承担露之营最核心的商业价值：把营地发现、基础判断和空间分布整合成一个连续动作。"
    />

    <div class="discover-layout">
      <aside class="panel filters">
        <div class="filter-head">
          <div>
            <strong>快速筛选</strong>
            <p>适合出发前 5 分钟内形成候选清单</p>
          </div>
          <span class="chip">{{ city || "全部城市" }}</span>
        </div>
        <div class="filter-group">
          <label class="label">关键词</label>
          <input v-model="keyword" class="field" placeholder="搜索营地、区域、主题" />
        </div>
        <div class="filter-group">
          <label class="label">定位文本</label>
          <input v-model="locationText" class="field" placeholder="输入你的定位，如 杭州西湖 / 苏州太湖" />
        </div>
        <div class="double">
          <div class="filter-group">
            <label class="label">城市</label>
            <select v-model="city" class="field">
              <option v-for="item in cities" :key="item" :value="item">
                {{ item || "全部城市" }}
              </option>
            </select>
          </div>
          <div class="filter-group">
            <label class="label">排序</label>
            <select v-model="sortBy" class="field">
              <option value="score">按评分</option>
              <option value="distance">按距离</option>
              <option value="newbie">按新手友好</option>
              <option value="hot">按热度</option>
            </select>
          </div>
        </div>
        <div class="chip-list feature-tags">
          <span class="chip active">可过夜</span>
          <span class="chip active">可明火</span>
          <span class="chip active">新手友好</span>
          <span class="chip">亲子友好</span>
          <span class="chip">宠物友好</span>
        </div>
        <div class="actions">
          <button class="btn-primary" @click="load">查找周边营地</button>
          <button class="btn-ghost" :disabled="locating" @click="useMyLocation">
            {{ locating ? "定位中..." : "使用我的位置" }}
          </button>
        </div>
        <div class="filter-note">
          <strong>使用建议</strong>
          <span>先输入区域，再切到“按距离”或“按新手友好”排序，效率更高。</span>
        </div>
        <div class="list">
          <CampCard
            v-for="camp in items"
            :key="camp.slug"
            :slug="camp.slug"
            :title="camp.name"
            :city="`${camp.city} · ${camp.district}${camp.distanceKm ? ` · ${camp.distanceKm}km` : ''}`"
            :summary="camp.summary"
            :price="camp.priceText"
            :score="String(camp.score)"
          />
        </div>
      </aside>

      <StaticMapPanel />
    </div>
  </div>
</template>

<style scoped lang="scss">
.page { padding: 28px 0 64px; }
.discover-hero {
  display: grid;
  grid-template-columns: 1.05fr 0.95fr;
  gap: 28px;
  padding: 34px 36px;
  margin-bottom: 26px;
}

.discover-hero h1 {
  margin: 16px 0 10px;
  font-size: 50px;
  line-height: 1.06;
}

.discover-hero p,
.filter-head p,
.filter-note span {
  color: var(--muted);
  line-height: 1.8;
}

.hero-facts {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 14px;
}

.fact-card {
  padding: 22px;
  border-radius: 24px;
  background: rgba(255, 255, 255, 0.7);
  border: 1px solid rgba(35, 48, 42, 0.08);
}

.fact-card strong {
  display: block;
  font-size: 28px;
}

.fact-card span {
  display: block;
  margin-top: 10px;
  color: var(--muted);
}

.discover-layout { display: grid; grid-template-columns: 410px 1fr; gap: 20px; margin-top: 22px; }
.filters { padding: 22px; }
.filters > * + * { margin-top: 16px; }

.filter-head {
  display: flex;
  justify-content: space-between;
  gap: 14px;
  align-items: flex-start;
}

.filter-head strong,
.filter-note strong {
  display: block;
  margin-bottom: 6px;
}

.filter-group {
  display: grid;
  gap: 8px;
}

.label {
  font-size: 12px;
  font-weight: 700;
  color: var(--muted);
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.double {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px;
}

.chip-list { display: flex; flex-wrap: wrap; gap: 8px; }

.feature-tags .chip.active {
  color: var(--primary-deep);
  border-color: rgba(47, 93, 80, 0.16);
  background: rgba(47, 93, 80, 0.08);
}

.list { display: grid; gap: 14px; }
.actions { display: flex; gap: 10px; }

.filter-note {
  padding: 16px 18px;
  border-radius: 20px;
  background: rgba(47, 93, 80, 0.06);
  border: 1px solid rgba(47, 93, 80, 0.08);
}
</style>
