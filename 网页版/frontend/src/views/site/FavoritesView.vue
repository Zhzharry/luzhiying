<template>
  <div class="shell page">
    <div class="panel content">
      <h1>默认收藏夹</h1>
      <p>这里预留“我的收藏夹、最近浏览、进入对比”三种核心行为。</p>
      <RouterLink class="btn-primary" to="/compare">进入对比</RouterLink>
    </div>
  </div>
</template>

<style scoped lang="scss">
.page { padding: 28px 0 64px; }
.content { padding: 28px; }
p { color: var(--muted); line-height: 1.8; }
</style>
