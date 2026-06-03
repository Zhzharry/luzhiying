<template>
  <div class="shell page auth-wrap">
    <form class="panel auth-card">
      <h1>注册账号</h1>
      <input class="field" placeholder="昵称" />
      <input class="field" placeholder="邮箱" />
      <input class="field" placeholder="密码" type="password" />
      <button class="btn-primary" type="button">注册</button>
    </form>
  </div>
</template>

<style scoped lang="scss">
.page { padding: 40px 0 64px; }
.auth-wrap { display: grid; justify-items: center; }
.auth-card { width: min(480px, 100%); padding: 28px; display: grid; gap: 14px; }
</style>
