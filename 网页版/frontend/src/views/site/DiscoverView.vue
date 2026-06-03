<script setup lang="ts">
import { onMounted, ref } from "vue";

import SectionTitle from "@/components/common/SectionTitle.vue";
import StaticMapPanel from "@/components/map/StaticMapPanel.vue";
import CampCard from "@/components/site/CampCard.vue";
import { campsApi } from "@/api/camps";
import type { ApiResponse, CampCardItem, PageResult } from "@/types/api";

const keyword = ref("");
const city = ref("");
const location = ref("");
const cities = ["", "杭州", "苏州", "成都"];
const items = ref<CampCardItem[]>([]);

async function load() {
  const response = await campsApi.list({
    keyword: keyword.value || undefined,
    city: city.value || undefined,
    location: location.value || undefined,
  });
  const payload = response.data as ApiResponse<PageResult<CampCardItem>>;
  items.value = payload.data.list;
}

onMounted(load);
</script>

<template>
  <div class="shell page">
    <SectionTitle
      eyebrow="找营地"
      title="这是网页 MVP 的核心页面"
      description="桌面端采用左侧筛选与列表、右侧静态地图联动的布局，当前已经接上共享 Java 后端的营地列表接口。"
    />

    <div class="discover-layout">
      <aside class="panel filters">
        <input v-model="keyword" class="field" placeholder="搜索营地、区域、主题" />
        <input v-model="location" class="field" placeholder="输入你的定位，如 杭州西湖 / 苏州太湖" />
        <select v-model="city" class="field">
          <option v-for="item in cities" :key="item" :value="item">
            {{ item || "全部城市" }}
          </option>
        </select>
        <div class="chip-list">
          <span class="chip">可过夜</span>
          <span class="chip">可明火</span>
          <span class="chip">新手友好</span>
          <span class="chip">亲子友好</span>
          <span class="chip">宠物友好</span>
        </div>
        <button class="btn-primary" @click="load">查找周边营地</button>
        <div class="list">
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
      </aside>

      <StaticMapPanel />
    </div>
  </div>
</template>

<style scoped lang="scss">
.page { padding: 28px 0 64px; }
.discover-layout { display: grid; grid-template-columns: 380px 1fr; gap: 18px; margin-top: 22px; }
.filters { padding: 18px; }
.filters > * + * { margin-top: 14px; }
.chip-list { display: flex; flex-wrap: wrap; gap: 8px; }
.list { display: grid; gap: 14px; }
</style>
