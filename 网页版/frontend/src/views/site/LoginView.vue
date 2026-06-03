<script setup lang="ts">
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";

const route = useRoute();
const router = useRouter();
const authStore = useAuthStore();
const email = ref("admin@luying.local");
const password = ref("123456");
const errorText = ref("");
const loading = ref(false);

async function submit() {
  errorText.value = "";
  loading.value = true;
  try {
    await authStore.login({ email: email.value, password: password.value });
    router.push(String(route.query.redirect || "/guides"));
  } catch (error) {
    errorText.value = "登录失败，请检查账号密码";
  } finally {
    loading.value = false;
  }
}
</script>

<template>
  <div class="shell page auth-wrap">
    <form class="panel auth-card" @submit.prevent="submit">
      <h1>登录露之营</h1>
      <p>查看和搜索攻略前需要先登录。演示账号可直接使用 `admin@luying.local / 123456`。</p>
      <input v-model="email" class="field" placeholder="邮箱" />
      <input v-model="password" class="field" placeholder="密码" type="password" />
      <div v-if="errorText" class="error">{{ errorText }}</div>
      <button class="btn-primary" type="submit">{{ loading ? "登录中..." : "登录" }}</button>
    </form>
  </div>
</template>

<style scoped lang="scss">
.page { padding: 40px 0 64px; }
.auth-wrap { display: grid; justify-items: center; }
.auth-card { width: min(480px, 100%); padding: 28px; display: grid; gap: 14px; }
.error { color: #9b2c2c; font-size: 14px; }
p { color: var(--muted); line-height: 1.8; margin: 0; }
</style>
