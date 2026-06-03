<template>
  <div>
    <header class="site-header">
      <div class="shell header-inner">
        <RouterLink class="brand" to="/">露之营</RouterLink>
        <nav class="nav">
          <RouterLink to="/">首页</RouterLink>
          <RouterLink to="/discover">找营地</RouterLink>
          <RouterLink to="/guides">攻略</RouterLink>
          <RouterLink to="/favorites">收藏</RouterLink>
          <RouterLink to="/me">我的</RouterLink>
        </nav>
      </div>
    </header>
    <main>
      <RouterView />
    </main>
  </div>
</template>

<style scoped lang="scss">
.site-header {
  position: sticky;
  top: 0;
  z-index: 20;
  border-bottom: 1px solid var(--line);
  background: rgba(245, 241, 232, 0.88);
  backdrop-filter: blur(14px);
}

.header-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 0;
}

.brand {
  font-size: 22px;
  font-weight: 700;
}

.nav {
  display: flex;
  gap: 18px;
  font-size: 14px;
}
</style>
