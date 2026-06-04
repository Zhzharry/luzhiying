const TOKEN_KEY = "luying-mini-token";

export function getToken() {
  return uni.getStorageSync(TOKEN_KEY) || "";
}

export function setToken(token: string) {
  uni.setStorageSync(TOKEN_KEY, token);
}

export function clearToken() {
  uni.removeStorageSync(TOKEN_KEY);
}
