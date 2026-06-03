<script setup lang="ts">
const points = [
  { left: "24%", top: "32%", name: "杭州示例营地" },
  { left: "43%", top: "54%", name: "苏州示例营地" },
  { left: "68%", top: "46%", name: "成都示例营地" },
];
</script>

<template>
  <div class="panel map-panel grid-lines">
    <div class="badge">静态地图模拟</div>
    <button
      v-for="point in points"
      :key="point.name"
      class="marker"
      :style="{ left: point.left, top: point.top }"
      type="button"
    >
      营
    </button>
    <div class="legend">
      第一版先验证筛选、点位联动和详情决策链路，不接真实地图 SDK。
    </div>
  </div>
</template>

<style scoped lang="scss">
.map-panel {
  position: relative;
  min-height: 520px;
  background: linear-gradient(160deg, #ecf2ea 0%, #f7f2e8 100%);
}

.badge,
.legend {
  position: absolute;
  left: 18px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.84);
  border: 1px solid var(--line);
}

.badge {
  top: 18px;
  padding: 8px 14px;
  font-size: 12px;
  font-weight: 700;
}

.legend {
  bottom: 18px;
  right: 18px;
  border-radius: 24px;
  padding: 16px 18px;
  line-height: 1.8;
  color: var(--muted);
}

.marker {
  position: absolute;
  width: 38px;
  height: 38px;
  border: none;
  border-radius: 999px;
  background: var(--primary);
  color: #fff;
  font-weight: 700;
  transform: translate(-50%, -50%);
  cursor: pointer;
}
</style>
