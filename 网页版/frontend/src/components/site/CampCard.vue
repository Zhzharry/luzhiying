<script setup lang="ts">
defineProps<{
  slug?: string;
  title: string;
  city: string;
  summary: string;
  price: string;
  score: string;
}>();
</script>

<template>
  <RouterLink :to="slug ? `/camps/${slug}` : '/discover'" class="panel camp-card">
    <div class="thumb" />
    <div class="body">
      <div class="top">
        <div>
          <h3>{{ title }}</h3>
          <div class="city">{{ city }}</div>
        </div>
        <div class="score">{{ score }}</div>
      </div>
      <p>{{ summary }}</p>
      <div class="price">{{ price }}</div>
    </div>
  </RouterLink>
</template>

<style scoped lang="scss">
.camp-card {
  overflow: hidden;
}

.thumb {
  height: 160px;
  background: radial-gradient(circle at top, rgba(138, 183, 176, 0.5), transparent 38%),
    linear-gradient(135deg, #50735a, #dce4d7);
}

.body {
  padding: 18px;
}

.top {
  display: flex;
  justify-content: space-between;
  gap: 12px;
}

h3 {
  margin: 0;
  font-size: 20px;
}

.city,
p {
  color: var(--muted);
}

p {
  line-height: 1.8;
}

.score {
  min-width: 52px;
  text-align: center;
  padding: 8px 10px;
  border-radius: 999px;
  background: var(--surface-soft);
  font-weight: 700;
}

.price {
  margin-top: 12px;
  font-weight: 700;
}
</style>
