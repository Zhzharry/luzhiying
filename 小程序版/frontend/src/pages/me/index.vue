<script setup lang="ts">
import { ref } from "vue";
import { fetchMeOverview } from "@/api/me";

const summary = ref<Record<string, unknown> | null>(null);

async function load() {
  summary.value = await fetchMeOverview();
}

load();
</script>

<template>
  <view class="page">
    <view class="card">
      <text class="title">我的</text>
      <text class="desc">当前已接入个人中心概览接口预留。</text>
      <text class="desc">{{ JSON.stringify(summary) }}</text>
    </view>
  </view>
</template>

<style scoped>
.page { padding: 24rpx; }
.card { background: #fffdf9; border-radius: 24rpx; padding: 24rpx; }
.title { font-weight: 700; color: #24352d; }
.desc { display: block; color: #68766d; margin-top: 8rpx; }
</style>
