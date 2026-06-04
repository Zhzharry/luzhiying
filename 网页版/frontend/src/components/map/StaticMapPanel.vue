<script setup lang="ts">
const points = [
  { left: "24%", top: "32%", name: "杭州示例营地" },
  { left: "43%", top: "54%", name: "苏州示例营地" },
  { left: "68%", top: "46%", name: "成都示例营地" },
];
</script>

<template>
  <div class="panel map-panel grid-lines">
    <div class="badge">露营地分布图</div>
    <div class="overlay-card top-card">
      <strong>周边热区</strong>
      <span>优先聚焦杭州、苏州、成都周末自驾圈层</span>
    </div>
    <button
      v-for="point in points"
      :key="point.name"
      class="marker"
      :style="{ left: point.left, top: point.top }"
      type="button"
    >
      <span>营</span>
    </button>
    <div class="legend">
      <strong>决策视图</strong>
      <span>第一版先验证筛选、点位联动和详情决策链路，不接真实地图 SDK。</span>
    </div>
  </div>
</template>

<style scoped lang="scss">
.map-panel {
  position: relative;
  min-height: 520px;
  overflow: hidden;
  background:
    radial-gradient(circle at 22% 24%, rgba(255, 255, 255, 0.28), transparent 20%),
    radial-gradient(circle at 82% 78%, rgba(180, 201, 168, 0.26), transparent 18%),
    linear-gradient(160deg, #dde7d8 0%, #f6f0e5 100%);
}

.badge,
.legend,
.overlay-card {
  position: absolute;
  background: rgba(255, 255, 255, 0.84);
  border: 1px solid var(--line);
  box-shadow: var(--shadow-soft);
  backdrop-filter: blur(10px);
}

.badge {
  top: 18px;
  left: 18px;
  border-radius: 999px;
  padding: 8px 14px;
  font-size: 12px;
  font-weight: 700;
}

.overlay-card {
  top: 62px;
  left: 18px;
  width: 220px;
  border-radius: 22px;
  padding: 16px;
}

.overlay-card strong,
.legend strong {
  display: block;
  margin-bottom: 8px;
}

.overlay-card span,
.legend span {
  color: var(--muted);
  line-height: 1.7;
}

.legend {
  bottom: 18px;
  right: 18px;
  border-radius: 24px;
  padding: 16px 18px;
  width: 260px;
}

.marker {
  position: absolute;
  width: 42px;
  height: 42px;
  border: none;
  border-radius: 999px;
  background: linear-gradient(135deg, var(--primary), #4d7b6e);
  color: #fff;
  font-weight: 700;
  transform: translate(-50%, -50%);
  cursor: pointer;
  box-shadow: 0 16px 24px rgba(47, 93, 80, 0.24);
}

.marker span {
  position: relative;
  z-index: 1;
}

.marker::after {
  content: "";
  position: absolute;
  inset: -10px;
  border-radius: 999px;
  border: 1px solid rgba(47, 93, 80, 0.18);
}
</style>
