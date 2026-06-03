import { defineStore } from "pinia";

const STORAGE_KEY = "luying-user-data";

export const useFavoritesStore = defineStore("favorites", {
  state: () => ({
    activeListId: "",
    favoriteCampSlugs: [] as string[],
    recentCampSlugs: [] as string[],
    guideSearchHistory: [] as string[],
    compareIds: [] as string[],
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
        }>;
        this.favoriteCampSlugs = parsed.favoriteCampSlugs || [];
        this.recentCampSlugs = parsed.recentCampSlugs || [];
        this.guideSearchHistory = parsed.guideSearchHistory || [];
        this.compareIds = parsed.compareIds || [];
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
        }),
      );
    },
    toggleFavorite(slug: string) {
      if (this.favoriteCampSlugs.includes(slug)) {
        this.favoriteCampSlugs = this.favoriteCampSlugs.filter((item) => item !== slug);
      } else {
        this.favoriteCampSlugs = [slug, ...this.favoriteCampSlugs];
      }
      this.persist();
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
  },
});
