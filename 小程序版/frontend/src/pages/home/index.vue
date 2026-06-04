<script setup lang="ts">
const cities = ["杭州", "苏州", "成都"];

function goDiscover(city = "") {
  const query = city ? `?city=${encodeURIComponent(city)}` : "";
  uni.navigateTo({ url: `/pages/discover/index${query}` });
}
</script>

<template>
  <view class="page">
    <view class="hero">
      <text class="eyebrow">露之营</text>
      <text class="title">为第一次自驾露营做更轻的决策</text>
      <text class="desc">先看真实信息，再决定值不值得去。</text>
      <button class="primary" @click="goDiscover()">开始找营地</button>
    </view>
    <view class="section">
      <text class="section-title">热门城市</text>
      <view class="chips">
        <button v-for="city in cities" :key="city" class="chip" @click="goDiscover(city)">{{ city }}</button>
      </view>
    </view>
  </view>
</template>

<style scoped>
.page { padding: 32rpx; }
.hero, .section { background: #fffdf9; border-radius: 28rpx; padding: 28rpx; margin-bottom: 24rpx; }
.eyebrow { color: #7a8a81; font-size: 24rpx; }
.title { display: block; margin-top: 16rpx; font-size: 40rpx; font-weight: 700; color: #24352d; }
.desc { display: block; margin-top: 12rpx; color: #68766d; line-height: 1.6; }
.primary, .chip { margin-top: 20rpx; border-radius: 999rpx; }
.chips { display: flex; gap: 16rpx; flex-wrap: wrap; }
.section-title { font-weight: 600; }
</style>
