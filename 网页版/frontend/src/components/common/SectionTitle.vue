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
.section-title {
  margin-bottom: 18px;
}

.eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  color: var(--primary-deep);
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.eyebrow::before {
  content: "";
  width: 28px;
  height: 1px;
  background: rgba(47, 93, 80, 0.36);
}

h2 {
  margin: 10px 0 0;
  font-size: 38px;
  line-height: 1.16;
}

p {
  max-width: 760px;
  color: var(--muted);
  line-height: 1.8;
}
</style>
