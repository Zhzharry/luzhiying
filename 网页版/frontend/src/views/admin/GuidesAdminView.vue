<script setup lang="ts">
import { onMounted, ref } from "vue";

import { adminApi } from "@/api/admin";
import type { ApiResponse } from "@/types/api";

const rows = ref<Array<{ title: string; status: string }>>([]);

onMounted(async () => {
  const response = await adminApi.guides();
  rows.value = (response.data as ApiResponse<Array<{ title: string; status: string }>>).data;
});
</script>

<template>
  <section class="panel admin-page">
    <h1>攻略管理</h1>
    <p>这里预留攻略创建、发布和下线管理。</p>
    <el-table :data="rows" style="width: 100%">
      <el-table-column prop="title" label="标题" />
      <el-table-column prop="status" label="状态" />
    </el-table>
  </section>
</template>

<style scoped lang="scss">
.admin-page { padding: 24px; }
p { color: var(--muted); }
</style>
