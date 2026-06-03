<script setup lang="ts">
defineProps<{
  eyebrow: string;
  title: string;
  description?: string;
}>();
</script>

<template>
  <div class="section-title">
    <div class="eyebrow">{{ eyebrow }}</div>
    <h2>{{ title }}</h2>
    <p v-if="description">{{ description }}</p>
  </div>
</template>

<style scoped lang="scss">
.eyebrow {
  color: var(--muted);
  font-size: 13px;
  font-weight: 700;
}

h2 {
  margin: 6px 0 0;
  font-size: 34px;
}

p {
  max-width: 760px;
  color: var(--muted);
  line-height: 1.8;
}
</style>
