<script setup lang="ts">
import { onMounted, ref } from "vue";

import { adminApi } from "@/api/admin";
import type { ApiResponse } from "@/types/api";

const rows = ref<Array<{ id: number; campName: string; author: string; status: string }>>([]);

async function load() {
  const response = await adminApi.reviews();
  rows.value = (response.data as ApiResponse<Array<{ id: number; campName: string; author: string; status: string }>>).data;
}

async function updateStatus(id: number, status: string) {
  await adminApi.updateReviewStatus(id, status);
  await load();
}

onMounted(load);
</script>

<template>
  <section class="panel admin-page">
    <h1>评论审核</h1>
    <p>这里预留审核通过 / 拒绝操作。</p>
    <el-table :data="rows" style="width: 100%">
      <el-table-column prop="campName" label="营地" />
      <el-table-column prop="author" label="用户" />
      <el-table-column prop="status" label="状态" />
      <el-table-column label="操作" width="220">
        <template #default="{ row }">
          <div class="actions">
            <el-button size="small" type="success" @click="updateStatus(row.id, 'APPROVED')">通过</el-button>
            <el-button size="small" type="danger" plain @click="updateStatus(row.id, 'REJECTED')">拒绝</el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>
  </section>
</template>

<style scoped lang="scss">
.admin-page { padding: 24px; }
p { color: var(--muted); }
.actions { display: flex; gap: 8px; }
</style>
