import { createApp } from "vue";
import PrimeVue from "primevue/config";
import ToastService from "primevue/toastservice";
import "primeicons/primeicons.css";
import "primevue/resources/themes/lara-light-green/theme.css";
import "primeflex/primeflex.css";
import App from "./App.vue";
import router from "./router";

createApp(App).use(router).use(PrimeVue).use(ToastService).mount("#app");
