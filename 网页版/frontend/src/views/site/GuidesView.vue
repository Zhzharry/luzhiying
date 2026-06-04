<script setup lang="ts">
import { computed, onMounted, ref } from "vue";

import { guidesApi } from "@/api/guides";
import { useFavoritesStore } from "@/stores/favorites";
import type { ApiResponse, GuideItem } from "@/types/api";

type GuideSectionKey = "all" | "newbie" | "gear" | "family" | "risk";

interface GuideSectionOption {
  key: GuideSectionKey;
  label: string;
  description: string;
  queryCategory?: string;
}

const guides = ref<GuideItem[]>([]);
const keyword = ref("");
const cityScope = ref("");
const cities = ["", "杭州", "苏州", "成都"];
const favoritesStore = useFavoritesStore();
const activeSection = ref<GuideSectionKey>("all");

const sectionOptions: GuideSectionOption[] = [
  { key: "all", label: "全部专栏", description: "按栏目浏览全部攻略内容" },
  { key: "newbie", label: "新手攻略", description: "第一次出发前最需要先看清的内容", queryCategory: "新手指南" },
  { key: "gear", label: "装备建议", description: "尽量少买错、少带错、少超预算", queryCategory: "装备建议" },
  { key: "family", label: "亲子出行", description: "围绕带娃周末、洗漱和节奏安排", queryCategory: "亲子攻略" },
  { key: "risk", label: "风险提示", description: "天气、河道、风向和地形这类风险提醒", queryCategory: "风险提示" },
];

function normalizeSection(guide: GuideItem) {
  if (guide.category === "装备建议") {
    return { sectionKey: "gear", sectionLabel: "装备建议" };
  }
  if (guide.category === "亲子攻略") {
    return { sectionKey: "family", sectionLabel: "亲子出行" };
  }
  if (guide.category === "风险提示") {
    return { sectionKey: "risk", sectionLabel: "风险提示" };
  }
  return { sectionKey: "newbie", sectionLabel: "新手攻略" };
}

async function load() {
  const response = await guidesApi.list({
    keyword: keyword.value || undefined,
    cityScope: cityScope.value || undefined,
    category: sectionOptions.find((item) => item.key === activeSection.value)?.queryCategory,
  });
  guides.value = ((response.data as ApiResponse<GuideItem[]>).data || []).map((guide) => ({
    ...guide,
    ...normalizeSection(guide),
  }));
}

function submitSearch() {
  favoritesStore.addGuideSearch(keyword.value || cityScope.value || sectionOptions.find((item) => item.key === activeSection.value)?.label || "攻略专栏");
  load();
}

function switchSection(section: GuideSectionKey) {
  if (activeSection.value === section) {
    return;
  }
  activeSection.value = section;
  load();
}

const groupedGuides = computed(() => {
  const grouped: Record<Exclude<GuideSectionKey, "all">, GuideItem[]> = {
    newbie: [],
    gear: [],
    family: [],
    risk: [],
  };
  for (const guide of guides.value) {
    const key = (guide.sectionKey || "newbie") as Exclude<GuideSectionKey, "all">;
    grouped[key].push(guide);
  }
  return grouped;
});

const sectionStats = computed(() =>
  sectionOptions
    .filter((item) => item.key !== "all")
    .map((item) => {
      const count = groupedGuides.value[item.key as Exclude<GuideSectionKey, "all">]?.length || 0;
      return { ...item, count };
    }),
);

const sectionPanels = computed(() =>
  sectionStats.value.map((item) => ({
    ...item,
    guides: groupedGuides.value[item.key as Exclude<GuideSectionKey, "all">] || [],
  })),
);

onMounted(load);
</script>

<template>
  <div class="shell page">
    <div class="panel content">
      <div class="hero">
        <div>
          <span class="chip">已登录可访问</span>
          <h1>攻略专栏进一步拆成四个清晰栏目，方便用户按问题直接进入对应内容。</h1>
          <p>你可以直接进入新手攻略、装备建议、亲子出行或风险提示，不需要在一条混合信息流里反复筛选。</p>
        </div>
        <div class="hero-side">
          <div v-for="stat in sectionStats" :key="stat.key" class="mini-card">
            <strong>{{ stat.count }}</strong>
            <span>{{ stat.label }}</span>
            <small>{{ stat.description }}</small>
          </div>
        </div>
      </div>
      <div class="section-tabs">
        <button
          v-for="section in sectionOptions"
          :key="section.key"
          class="section-tab"
          :class="{ active: activeSection === section.key }"
          type="button"
          @click="switchSection(section.key)"
        >
          <strong>{{ section.label }}</strong>
          <span>{{ section.description }}</span>
        </button>
      </div>
      <div class="toolbar">
        <input v-model="keyword" class="field" placeholder="搜索新手攻略、装备建议、亲子周末关键词" />
        <select v-model="cityScope" class="field">
          <option v-for="city in cities" :key="city" :value="city">{{ city || "全部城市" }}</option>
        </select>
        <button class="btn-primary" type="button" @click="submitSearch">搜索攻略</button>
      </div>
      <div v-if="activeSection === 'all'" class="section-list">
        <section v-for="panel in sectionPanels" :key="`group-${panel.key}`" class="guide-section">
          <div class="section-head">
            <div>
              <span class="chip">{{ panel.label }}</span>
              <h2>{{ panel.label }}</h2>
              <p>{{ panel.description }}</p>
            </div>
            <span class="section-count">{{ panel.count }} 篇</span>
          </div>
          <div class="guide-list">
            <RouterLink
              v-for="guide in panel.guides"
              :key="guide.slug"
              :to="`/guides/${guide.slug}`"
              class="guide-item"
            >
              <div class="meta">{{ guide.sectionLabel }} · {{ guide.cityScope }} · {{ guide.authorName }}</div>
              <div class="guide-top">
                <strong>{{ guide.title }}</strong>
                <span class="arrow">进入专栏</span>
              </div>
              <p>{{ guide.summary }}</p>
              <div class="tag-row">
                <span v-for="tag in guide.moodTags" :key="tag" class="chip">{{ tag }}</span>
              </div>
            </RouterLink>
          </div>
        </section>
      </div>
      <div v-else class="guide-list">
        <RouterLink v-for="guide in guides" :key="guide.slug" :to="`/guides/${guide.slug}`" class="guide-item">
          <div class="meta">{{ guide.sectionLabel }} · {{ guide.cityScope }} · {{ guide.authorName }}</div>
          <div class="guide-top">
            <strong>{{ guide.title }}</strong>
            <span class="arrow">进入专栏</span>
          </div>
          <p>{{ guide.summary }}</p>
          <div class="tag-row">
            <span v-for="tag in guide.moodTags" :key="tag" class="chip">{{ tag }}</span>
          </div>
        </RouterLink>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.page { padding: 28px 0 64px; }
.content { padding: 28px; }
p { color: var(--muted); line-height: 1.8; }

.hero {
  display: grid;
  grid-template-columns: 1.06fr 0.94fr;
  gap: 24px;
  margin-bottom: 18px;
}

.hero h1 {
  margin: 14px 0 10px;
  font-size: 44px;
  line-height: 1.08;
}

.hero-side {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px;
}

.mini-card {
  padding: 20px;
  border-radius: 24px;
  background: rgba(255, 255, 255, 0.66);
  border: 1px solid rgba(35, 48, 42, 0.08);
}

.mini-card strong {
  display: block;
  font-size: 26px;
}

.mini-card span {
  display: block;
  margin-top: 8px;
  color: var(--muted);
}

.mini-card small {
  display: block;
  margin-top: 6px;
  color: var(--muted);
  line-height: 1.6;
}

.section-tabs {
  display: grid;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  gap: 12px;
  margin: 18px 0 20px;
}

.section-tab {
  display: grid;
  gap: 6px;
  text-align: left;
  padding: 18px;
  border-radius: 22px;
  border: 1px solid rgba(35, 48, 42, 0.08);
  background: rgba(255, 255, 255, 0.62);
  cursor: pointer;
  transition: transform 0.22s ease, box-shadow 0.22s ease, border-color 0.22s ease;
}

.section-tab strong {
  font-size: 16px;
}

.section-tab span {
  color: var(--muted);
  line-height: 1.6;
  font-size: 13px;
}

.section-tab.active {
  border-color: rgba(47, 93, 80, 0.24);
  background: rgba(47, 93, 80, 0.08);
  box-shadow: var(--shadow-soft);
}

.toolbar { display: grid; grid-template-columns: 1fr 180px 150px; gap: 12px; margin: 18px 0; }
.section-list {
  display: grid;
  gap: 28px;
  margin-top: 18px;
}
.guide-section {
  display: grid;
  gap: 14px;
}
.section-head {
  display: flex;
  justify-content: space-between;
  gap: 18px;
  align-items: flex-start;
}
.section-head h2 {
  margin: 14px 0 6px;
  font-size: 30px;
}
.section-head p {
  margin: 0;
}
.section-count {
  padding: 10px 14px;
  border-radius: 999px;
  background: rgba(47, 93, 80, 0.08);
  color: var(--primary-deep);
  font-weight: 700;
}
.guide-list { display: grid; gap: 14px; margin-top: 18px; }
.guide-item {
  border: 1px solid var(--line);
  border-radius: 24px;
  padding: 18px;
  background: rgba(255, 255, 255, 0.64);
  transition: transform 0.24s ease, box-shadow 0.24s ease;
}

.guide-item:hover {
  transform: translateY(-3px);
  box-shadow: var(--shadow-soft);
}

.meta { color: var(--muted); font-size: 12px; margin-bottom: 8px; }
.guide-top {
  display: flex;
  justify-content: space-between;
  gap: 18px;
  align-items: center;
}

.arrow {
  color: var(--primary-deep);
  font-size: 13px;
  font-weight: 700;
}
.tag-row {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  margin-top: 12px;
}
</style>
