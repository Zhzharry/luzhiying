<script setup lang="ts">
import { onMounted, ref } from "vue";

import { adminApi } from "@/api/admin";
import type { ApiResponse } from "@/types/api";

const rows = ref<Array<{ name: string; city: string }>>([]);

onMounted(async () => {
  const response = await adminApi.camps();
  rows.value = (response.data as ApiResponse<Array<{ name: string; city: string }>>).data;
});
</script>

<template>
  <section class="panel admin-page">
    <h1>营地管理</h1>
    <p>这里预留营地增删改查、标签配置和基础搜索。</p>
    <el-table :data="rows" style="width: 100%">
      <el-table-column prop="name" label="营地名称" />
      <el-table-column prop="city" label="城市" />
    </el-table>
  </section>
</template>

<style scoped lang="scss">
.admin-page { padding: 24px; }
p { color: var(--muted); }
</style>
