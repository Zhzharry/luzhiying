import { getToken } from "@/utils/storage";

const API_BASE_URL = "http://localhost:18081/api";

export function request<T>(options: UniApp.RequestOptions) {
  const token = getToken();
  return new Promise<T>((resolve, reject) => {
    uni.request({
      ...options,
      url: `${API_BASE_URL}${options.url}`,
      header: {
        ...(options.header || {}),
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      success: (response) => {
        const payload = response.data as { success?: boolean; data?: T; message?: string };
        if (payload?.success === false) {
          reject(new Error(payload.message || "请求失败"));
          return;
        }
        resolve((payload?.data ?? response.data) as T);
      },
      fail: reject,
    });
  });
}
