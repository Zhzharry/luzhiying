<script setup lang="ts">
import { ref } from "vue";
import { fetchGuides } from "@/api/guides";
import type { GuideItem } from "@/types";

const list = ref<GuideItem[]>([]);

async function load() {
  list.value = await fetchGuides();
}

load();
</script>

<template>
  <view class="page">
    <view class="list">
      <navigator v-for="guide in list" :key="guide.slug" class="card" :url="`/pages/guide-detail/index?slug=${guide.slug}`">
        <text class="title">{{ guide.title }}</text>
        <text class="meta">{{ guide.category }} · {{ guide.cityScope }}</text>
        <text class="summary">{{ guide.summary }}</text>
      </navigator>
    </view>
  </view>
</template>

<style scoped>
.page { padding: 24rpx; }
.card { background: #fffdf9; border-radius: 24rpx; padding: 24rpx; margin-bottom: 20rpx; }
.title { font-weight: 700; color: #24352d; }
.meta, .summary { display: block; color: #68766d; margin-top: 8rpx; }
</style>
