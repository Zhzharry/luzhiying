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
    <div class="thumb">
      <div class="thumb-badge">精选营地</div>
      <div class="thumb-glow" />
    </div>
    <div class="body">
      <div class="top">
        <div>
          <h3>{{ title }}</h3>
          <div class="city">{{ city }}</div>
        </div>
        <div class="score">{{ score }}</div>
      </div>
      <p>{{ summary }}</p>
      <div class="bottom">
        <div class="price">{{ price }}</div>
        <span class="arrow">查看详情</span>
      </div>
    </div>
  </RouterLink>
</template>

<style scoped lang="scss">
.camp-card {
  overflow: hidden;
  transition: transform 0.25s ease, box-shadow 0.25s ease;
}

.camp-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 28px 48px rgba(36, 53, 45, 0.12);
}

.thumb {
  position: relative;
  height: 160px;
  background:
    radial-gradient(circle at 22% 18%, rgba(255, 255, 255, 0.34), transparent 18%),
    linear-gradient(135deg, #2f5d50, #7a9b73 60%, #e4dcc8 100%);
}

.thumb-badge {
  position: absolute;
  top: 14px;
  left: 14px;
  z-index: 1;
  padding: 8px 12px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.18);
  border: 1px solid rgba(255, 255, 255, 0.22);
  color: #fff;
  font-size: 11px;
  font-weight: 700;
  backdrop-filter: blur(8px);
}

.thumb-glow {
  position: absolute;
  right: -24px;
  bottom: -28px;
  width: 140px;
  height: 140px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.2);
}

.body {
  padding: 20px;
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
  min-height: 58px;
}

.score {
  min-width: 52px;
  text-align: center;
  padding: 8px 10px;
  border-radius: 999px;
  background: rgba(47, 93, 80, 0.08);
  font-weight: 700;
}

.bottom {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}

.price {
  margin-top: 12px;
  font-weight: 700;
}

.arrow {
  color: var(--primary-deep);
  font-size: 13px;
  font-weight: 700;
}
</style>
