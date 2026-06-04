<script setup lang="ts">
import { reactive } from "vue";
import { useRoute, useRouter } from "vue-router";
import { reviewsApi } from "@/api/reviews";

const route = useRoute();
const router = useRouter();

const form = reactive({
  campId: Number(route.query.campId || 1),
  overallScore: 4,
  sceneScore: 4,
  cleanScore: 4,
  quietScore: 4,
  accessScore: 4,
  newbieScore: 4,
  familyScore: 4,
  costScore: 4,
  content: "",
  visitDate: "",
  recommendTags: ["新手友好"],
  warningTags: [] as string[],
});

async function submit() {
  await reviewsApi.create(form as unknown as Record<string, unknown>);
  router.push("/me");
}
</script>

<template>
  <div class="shell page">
    <form class="panel content" @submit.prevent="submit">
      <h1>发布评论</h1>
      <input v-model.number="form.campId" class="field" type="number" placeholder="营地 ID" />
      <input v-model="form.visitDate" class="field" type="date" />
      <div class="scores">
        <label v-for="key in ['overallScore', 'sceneScore', 'cleanScore', 'quietScore', 'accessScore', 'newbieScore', 'familyScore', 'costScore']" :key="key">
          <span>{{ key }}</span>
          <input v-model.number="form[key as keyof typeof form]" class="field" type="number" min="1" max="5" />
        </label>
      </div>
      <textarea v-model="form.content" class="field textarea" placeholder="重点写清楚卫生、路况、适合什么人、有哪些坑。" />
      <button class="btn-primary" type="submit">提交评论</button>
    </form>
  </div>
</template>

<style scoped lang="scss">
.page { padding: 28px 0 64px; }
.content { padding: 28px; display: grid; gap: 14px; }
.scores { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 12px; }
.scores label { display: grid; gap: 6px; }
.textarea { min-height: 180px; resize: vertical; }
</style>
