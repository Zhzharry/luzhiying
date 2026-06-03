<script setup lang="ts">
import { onMounted, ref } from "vue";

import { adminApi } from "@/api/admin";
import type { ApiResponse } from "@/types/api";

const rows = ref<Array<{ campName: string; author: string; status: string }>>([]);

onMounted(async () => {
  const response = await adminApi.reviews();
  rows.value = (response.data as ApiResponse<Array<{ campName: string; author: string; status: string }>>).data;
});
</script>

<template>
  <section class="panel admin-page">
    <h1>评论审核</h1>
    <p>这里预留审核通过 / 拒绝操作。</p>
    <el-table :data="rows" style="width: 100%">
      <el-table-column prop="campName" label="营地" />
      <el-table-column prop="author" label="用户" />
      <el-table-column prop="status" label="状态" />
    </el-table>
  </section>
</template>

<style scoped lang="scss">
.admin-page { padding: 24px; }
p { color: var(--muted); }
</style>
