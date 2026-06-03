<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";

const router = useRouter();
const authStore = useAuthStore();
const name = ref("");
const email = ref("");
const password = ref("");
const errorText = ref("");
const loading = ref(false);

async function submit() {
  errorText.value = "";
  loading.value = true;
  try {
    await authStore.register({ name: name.value, email: email.value, password: password.value });
    router.push("/guides");
  } catch {
    errorText.value = "注册失败，请换一个邮箱重试";
  } finally {
    loading.value = false;
  }
}
</script>

<template>
  <div class="shell page auth-wrap">
    <form class="panel auth-card" @submit.prevent="submit">
      <h1>注册账号</h1>
      <input v-model="name" class="field" placeholder="昵称" />
      <input v-model="email" class="field" placeholder="邮箱" />
      <input v-model="password" class="field" placeholder="密码" type="password" />
      <div v-if="errorText" class="error">{{ errorText }}</div>
      <button class="btn-primary" type="submit">{{ loading ? "注册中..." : "注册" }}</button>
    </form>
  </div>
</template>

<style scoped lang="scss">
.page { padding: 40px 0 64px; }
.auth-wrap { display: grid; justify-items: center; }
.auth-card { width: min(480px, 100%); padding: 28px; display: grid; gap: 14px; }
.error { color: #9b2c2c; font-size: 14px; }
</style>
