<template>
  <div class="shell page">
    <form class="panel content">
      <h1>发布评论</h1>
      <textarea class="field textarea" placeholder="重点写清楚卫生、路况、适合什么人、有哪些坑。" />
      <button class="btn-primary" type="button">提交评论</button>
    </form>
  </div>
</template>

<style scoped lang="scss">
.page { padding: 28px 0 64px; }
.content { padding: 28px; display: grid; gap: 14px; }
.textarea { min-height: 180px; resize: vertical; }
</style>
