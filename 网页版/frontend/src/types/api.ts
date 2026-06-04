export interface ApiResponse<T> {
  code: number;
  message: string;
  data: T;
  success: boolean;
  timestamp: string;
}

export interface PageResult<T> {
  total: number;
  pageNum: number;
  pageSize: number;
  list: T[];
}

export interface CampCardItem {
  id: number;
  slug: string;
  name: string;
  city: string;
  district: string;
  summary: string;
  priceText: string;
  score: number;
  distanceKm?: number | null;
}

export interface CampDetailItem extends CampCardItem {
  province: string;
  address: string;
  campType: string;
  coverImage: string;
  gallery: string[];
  priceType: string;
  priceMin: number;
  priceMax: number;
  bookingRequired: boolean;
  openingStatus: string;
  sourceType: string;
  bestSeason: string;
  arrivalTips: string;
  riskTips: string;
  suitableFor: string[];
  rules: string[];
  tags: string[];
  facility: {
    hasToilet: boolean;
    hasShower: boolean;
    hasPower: boolean;
    hasWater: boolean;
    allowFire: boolean;
    canOvernight: boolean;
    petFriendly: boolean;
    familyFriendly: boolean;
    carAccessible: boolean;
    signalStrength: string;
    roadCondition: string;
    parkingDistance: string;
  };
}

export interface GuideItem {
  id: number;
  slug: string;
  title: string;
  summary: string;
  category: string;
  sectionKey?: string;
  sectionLabel?: string;
  cityScope: string;
  authorId: number;
  authorName: string;
  authorRole: string;
  publishedAt: string;
  moodTags: string[];
}

export interface GuideDetailItem extends GuideItem {
  content: string;
  relatedCampSlugs: string[];
}

export interface ReviewItem {
  id: number;
  authorId?: number;
  campSlug: string;
  campName: string;
  author: string;
  overallScore: number;
  content: string;
  status: string;
  visitDate: string;
  helpfulCount: number;
  createdAt: string;
  floor?: number;
  tags: string[];
}

export interface SessionUser {
  id: number;
  name: string;
  email: string;
  role: "USER" | "ADMIN";
  token: string;
  expiresAt?: string;
}

export interface FavoriteListItem {
  id: number;
  name: string;
  itemCount: number;
  camps: CampCardItem[];
}

export interface MeOverview {
  user: SessionUser;
  favoriteCount: number;
  recentCount: number;
  reviewCount: number;
  favoriteCamps: CampCardItem[];
  recentCamps: CampCardItem[];
  myReviews: ReviewItem[];
}
