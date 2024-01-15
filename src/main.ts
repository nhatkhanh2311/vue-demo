import { createApp } from 'vue';
import PrimeVue from 'primevue/config';
import './style.scss';
import App from './App.vue';
import 'primeicons/primeicons.css';
import 'primevue/resources/themes/lara-light-green/theme.css';
import 'primeflex/primeflex.css'
import router from './router.ts';

const app = createApp(App);
app.use(PrimeVue);
app.use(router);
app.mount('#app');
