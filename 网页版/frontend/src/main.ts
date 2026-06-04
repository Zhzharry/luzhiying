import { createApp } from "vue";
import { createPinia } from "pinia";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";

import App from "./App.vue";
import router from "./router";
import "@/assets/styles/main.scss";
import { useAuthStore } from "./stores/auth";
import { useFavoritesStore } from "./stores/favorites";

const app = createApp(App);
const pinia = createPinia();

app.use(pinia);
app.use(router);
app.use(ElementPlus);

useAuthStore(pinia).hydrate();
useFavoritesStore(pinia).hydrate();

const authStore = useAuthStore(pinia);
const favoritesStore = useFavoritesStore(pinia);

if (authStore.token) {
  authStore.fetchSession().then((session) => {
    if (session) {
      favoritesStore.syncFromServer().catch(() => undefined);
    }
  });
}

app.mount("#app");
