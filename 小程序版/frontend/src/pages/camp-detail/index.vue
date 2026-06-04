<script setup lang="ts">
const slug = "";
</script>

<template>
  <view class="page">
    <view class="card">
      <text class="title">营地详情页</text>
      <text class="desc">当前已预留详情页路由，后续直接接共享 Java API。</text>
      <text class="desc">slug: {{ slug }}</text>
    </view>
  </view>
</template>

<style scoped>
.page { padding: 24rpx; }
.card { background: #fffdf9; border-radius: 24rpx; padding: 24rpx; }
.title { font-weight: 700; color: #24352d; }
.desc { display: block; color: #68766d; margin-top: 8rpx; }
</style>
