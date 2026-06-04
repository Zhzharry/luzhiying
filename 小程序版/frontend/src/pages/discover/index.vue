<script setup lang="ts">
import { onLoad } from "@dcloudio/uni-app";
import { ref } from "vue";
import { fetchCamps } from "@/api/camps";
import type { CampCardItem } from "@/types";

const keyword = ref("");
const city = ref("");
const list = ref<CampCardItem[]>([]);

async function load() {
  const payload = await fetchCamps({
    keyword: keyword.value || undefined,
    city: city.value || undefined,
  });
  list.value = payload.list || [];
}

onLoad((query) => {
  city.value = typeof query.city === "string" ? query.city : "";
  load();
});
</script>

<template>
  <view class="page">
    <input v-model="keyword" class="field" placeholder="搜索营地、区域、主题" />
    <button class="primary" @click="load">搜索营地</button>
    <view class="list">
      <navigator v-for="camp in list" :key="camp.slug" class="card" :url="`/pages/camp-detail/index?slug=${camp.slug}`">
        <text class="title">{{ camp.name }}</text>
        <text class="meta">{{ camp.city }} · {{ camp.district }}</text>
        <text class="summary">{{ camp.summary }}</text>
      </navigator>
    </view>
  </view>
</template>

<style scoped>
.page { padding: 24rpx; }
.field, .primary, .card { margin-bottom: 20rpx; }
.field, .card { background: #fffdf9; border-radius: 24rpx; padding: 24rpx; }
.title { font-weight: 700; color: #24352d; }
.meta, .summary { display: block; color: #68766d; margin-top: 8rpx; }
</style>
