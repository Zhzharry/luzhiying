export const siteConfig = {
  name: "露之营",
  description: "面向自驾露营新手的网页端营地地图与决策工具。",
  url: "http://localhost:3000",
};

export const popularCities = ["杭州", "苏州", "成都"] as const;

export const themeFilters = [
  { label: "新手友好", value: "newbie-friendly" },
  { label: "亲子营地", value: "family-friendly" },
  { label: "湖边风景", value: "lake-view" },
  { label: "可过夜", value: "overnight" },
  { label: "可明火", value: "campfire" },
  { label: "宠物友好", value: "pet-friendly" },
];

export const sortOptions = [
  { label: "推荐优先", value: "recommended" },
  { label: "评分最高", value: "rating" },
  { label: "最适合新手", value: "newbie" },
  { label: "价格友好", value: "price" },
];

export const filterLabels = {
  canOvernight: "可过夜",
  allowFire: "可明火",
  petFriendly: "宠物友好",
  familyFriendly: "亲子友好",
  hasToilet: "有卫生间",
  hasShower: "有淋浴",
  hasPower: "有电源",
  carAccessible: "车可到营位附近",
};
