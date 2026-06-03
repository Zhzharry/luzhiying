<template>
  <div class="admin-shell">
    <aside class="sidebar">
      <div class="logo">露之营后台</div>
      <nav class="menu">
        <RouterLink to="/admin/camps">营地管理</RouterLink>
        <RouterLink to="/admin/guides">攻略管理</RouterLink>
        <RouterLink to="/admin/reviews">评论审核</RouterLink>
      </nav>
    </aside>
    <section class="content">
      <RouterView />
    </section>
  </div>
</template>

<style scoped lang="scss">
.admin-shell {
  display: grid;
  grid-template-columns: 260px 1fr;
  min-height: 100vh;
}

.sidebar {
  padding: 24px;
  border-right: 1px solid var(--line);
  background: rgba(255, 250, 243, 0.9);
}

.logo {
  margin-bottom: 20px;
  font-size: 20px;
  font-weight: 700;
}

.menu {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.content {
  padding: 24px;
}
</style>
