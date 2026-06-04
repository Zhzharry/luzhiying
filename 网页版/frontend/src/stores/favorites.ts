import { defineStore } from "pinia";
import { favoritesApi } from "@/api/favorites";
import type { ApiResponse, FavoriteListItem } from "@/types/api";

const STORAGE_KEY = "luying-user-data";

export const useFavoritesStore = defineStore("favorites", {
  state: () => ({
    activeListId: "",
    favoriteCampSlugs: [] as string[],
    recentCampSlugs: [] as string[],
    guideSearchHistory: [] as string[],
    compareIds: [] as string[],
    favoriteLists: [] as FavoriteListItem[],
  }),
  actions: {
    hydrate() {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) {
        return;
      }
      try {
        const parsed = JSON.parse(raw) as Partial<{
          favoriteCampSlugs: string[];
          recentCampSlugs: string[];
          guideSearchHistory: string[];
          compareIds: string[];
          activeListId: string;
        }>;
        this.favoriteCampSlugs = parsed.favoriteCampSlugs || [];
        this.recentCampSlugs = parsed.recentCampSlugs || [];
        this.guideSearchHistory = parsed.guideSearchHistory || [];
        this.compareIds = parsed.compareIds || [];
        this.activeListId = parsed.activeListId || "";
      } catch {
        localStorage.removeItem(STORAGE_KEY);
      }
    },
    persist() {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          favoriteCampSlugs: this.favoriteCampSlugs,
          recentCampSlugs: this.recentCampSlugs,
          guideSearchHistory: this.guideSearchHistory,
          compareIds: this.compareIds,
          activeListId: this.activeListId,
        }),
      );
    },
    async syncFromServer() {
      const response = await favoritesApi.list();
      const lists = (response.data as ApiResponse<FavoriteListItem[]>).data;
      this.favoriteLists = lists;
      const active = lists[0];
      this.activeListId = active ? String(active.id) : "";
      this.favoriteCampSlugs = active?.camps.map((item) => item.slug) || [];
      this.persist();
    },
    async ensureDefaultList() {
      if (this.activeListId) {
        return Number(this.activeListId);
      }
      const response = await favoritesApi.create("默认收藏夹");
      const list = (response.data as ApiResponse<FavoriteListItem>).data;
      this.activeListId = String(list.id);
      await this.syncFromServer();
      return list.id;
    },
    async toggleFavorite(slug: string, campId?: number) {
      const listId = await this.ensureDefaultList();
      if (this.favoriteCampSlugs.includes(slug)) {
        if (!campId) {
          const current = this.favoriteLists.find((item) => String(item.id) === String(listId));
          const camp = current?.camps.find((item) => item.slug === slug);
          campId = camp?.id;
        }
        if (campId) {
          await favoritesApi.removeItem(listId, campId);
        }
      } else {
        await favoritesApi.addItem(listId, slug);
      }
      await this.syncFromServer();
    },
    addRecentCamp(slug: string) {
      this.recentCampSlugs = [slug, ...this.recentCampSlugs.filter((item) => item !== slug)].slice(0, 8);
      this.persist();
    },
    addGuideSearch(keyword: string) {
      const value = keyword.trim();
      if (!value) {
        return;
      }
      this.guideSearchHistory = [value, ...this.guideSearchHistory.filter((item) => item !== value)].slice(0, 8);
      this.persist();
    },
    toggleCompare(slug: string) {
      if (this.compareIds.includes(slug)) {
        this.compareIds = this.compareIds.filter((item) => item !== slug);
      } else if (this.compareIds.length < 4) {
        this.compareIds = [...this.compareIds, slug];
      }
      this.persist();
    },
    removeCompare(slug: string) {
      this.compareIds = this.compareIds.filter((item) => item !== slug);
      this.persist();
    },
    clearServerState() {
      this.activeListId = "";
      this.favoriteCampSlugs = [];
      this.recentCampSlugs = [];
      this.favoriteLists = [];
      this.persist();
    },
  },
});
