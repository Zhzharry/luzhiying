<script setup lang="ts">
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";

const router = useRouter();
const authStore = useAuthStore();

function logout() {
  authStore.logout();
  router.push("/");
}
</script>

<template>
  <div class="site-shell">
    <header class="site-header">
      <div class="shell header-inner">
        <RouterLink class="brand" to="/">
          <span class="brand-mark">L</span>
          <span>
            <strong>露之营</strong>
            <small>露营决策平台</small>
          </span>
        </RouterLink>
        <nav class="nav">
          <RouterLink to="/">首页</RouterLink>
          <RouterLink to="/discover">找营地</RouterLink>
          <RouterLink to="/guides">攻略专栏</RouterLink>
          <RouterLink to="/favorites">收藏</RouterLink>
          <RouterLink to="/me">我的</RouterLink>
        </nav>
        <div class="auth">
          <template v-if="authStore.session">
            <span class="user">{{ authStore.session.name }}</span>
            <button class="btn-link" type="button" @click="logout">退出</button>
          </template>
          <template v-else>
            <RouterLink class="login" to="/login">登录</RouterLink>
            <RouterLink class="signup" to="/register">注册</RouterLink>
          </template>
        </div>
      </div>
    </header>
    <main>
      <RouterView />
    </main>
    <footer class="site-footer">
      <div class="shell footer-inner">
        <div>
          <strong>露之营</strong>
          <p>为第一次自驾露营提供更清晰的出发前决策。</p>
        </div>
        <div class="footer-tags">
          <span class="chip">结构化筛选</span>
          <span class="chip">真实营地信息</span>
          <span class="chip">新手友好</span>
        </div>
      </div>
    </footer>
  </div>
</template>

<style scoped lang="scss">
.site-shell {
  position: relative;
}

.site-header {
  position: sticky;
  top: 0;
  z-index: 20;
  border-bottom: 1px solid rgba(35, 48, 42, 0.08);
  background: rgba(246, 239, 223, 0.74);
  backdrop-filter: blur(18px);
}

.header-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 18px 0;
  gap: 18px;
}

.brand {
  display: flex;
  align-items: center;
  gap: 12px;
  min-width: 180px;
}

.brand strong {
  display: block;
  font-size: 22px;
  letter-spacing: 0.04em;
}

.brand small {
  display: block;
  color: var(--muted);
  font-size: 11px;
  margin-top: 3px;
}

.brand-mark {
  display: grid;
  place-items: center;
  width: 42px;
  height: 42px;
  border-radius: 14px;
  background: linear-gradient(135deg, var(--primary), #5f8e7f);
  color: #fff;
  font-weight: 800;
  box-shadow: 0 12px 24px rgba(47, 93, 80, 0.24);
}

.nav {
  display: flex;
  gap: 10px;
  padding: 8px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.5);
  border: 1px solid rgba(35, 48, 42, 0.06);
  font-size: 14px;
}

.nav a {
  padding: 10px 14px;
  border-radius: 999px;
  color: var(--muted);
  transition: background 0.24s ease, color 0.24s ease;
}

.nav a.router-link-active {
  background: rgba(47, 93, 80, 0.12);
  color: var(--primary-deep);
  font-weight: 700;
}

.auth {
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 14px;
  min-width: 170px;
  justify-content: flex-end;
}

.user {
  color: var(--muted);
}

.login,
.btn-link {
  color: var(--muted);
}

.signup {
  padding: 10px 16px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.72);
  border: 1px solid var(--line);
}

.btn-link {
  border: 0;
  background: transparent;
  cursor: pointer;
}

.site-footer {
  padding: 30px 0 46px;
}

.footer-inner {
  display: flex;
  justify-content: space-between;
  gap: 24px;
  padding-top: 18px;
  border-top: 1px solid rgba(35, 48, 42, 0.08);
}

.footer-inner p {
  margin: 10px 0 0;
  color: var(--muted);
}

.footer-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  align-items: flex-start;
}
</style>
