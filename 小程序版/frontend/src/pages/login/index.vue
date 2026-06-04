<script setup lang="ts">
import { reactive } from "vue";
import { login } from "@/api/auth";
import { setToken } from "@/utils/storage";

const form = reactive({
  email: "admin@luying.local",
  password: "123456",
});

async function submit() {
  const session = await login(form);
  setToken(session.token);
  uni.switchTab({ url: "/pages/me/index" });
}
</script>

<template>
  <view class="page">
    <view class="card">
      <input v-model="form.email" class="field" placeholder="邮箱" />
      <input v-model="form.password" class="field" password placeholder="密码" />
      <button class="primary" @click="submit">登录</button>
    </view>
  </view>
</template>

<style scoped>
.page { padding: 24rpx; }
.card { background: #fffdf9; border-radius: 24rpx; padding: 24rpx; }
.field, .primary { margin-bottom: 16rpx; }
.field { border: 1rpx solid #d9e1d8; border-radius: 16rpx; padding: 20rpx; }
</style>
