export type SearchParamValue = string | string[] | undefined;

export type SearchParams = Record<string, SearchParamValue>;

export type ApiResponse<T> = {
  success: boolean;
  data: T | null;
  error: string | null;
  meta?: Record<string, unknown>;
};
