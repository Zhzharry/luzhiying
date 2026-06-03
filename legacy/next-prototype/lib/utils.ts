import { clsx } from "clsx";

export function cn(...inputs: Array<string | false | null | undefined>) {
  return clsx(inputs);
}

export function formatPrice(priceMin?: number | null, priceMax?: number | null) {
  if (!priceMin && !priceMax) return "价格待确认";
  if (priceMin && priceMax && priceMin !== priceMax) return `¥${priceMin} - ¥${priceMax}`;
  return `¥${priceMin ?? priceMax}`;
}

export function scoreLabel(score: number) {
  if (score >= 4.7) return "非常推荐";
  if (score >= 4.3) return "值得出发";
  if (score >= 4) return "谨慎可选";
  return "信息待补充";
}

export function serializeSearchParams(
  input: Record<string, string | number | boolean | undefined | null>,
) {
  const params = new URLSearchParams();
  Object.entries(input).forEach(([key, value]) => {
    if (value === undefined || value === null || value === "") return;
    params.set(key, String(value));
  });
  return params.toString();
}
