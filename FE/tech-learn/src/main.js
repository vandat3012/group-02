// main.js or main.ts
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import { ToastContainer } from 'vue3-toastify';
import { Toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

const app = createApp(App);

app.use(store);
app.use(router);
app.use(Toast);
app.component('ToastContainer', ToastContainer);
app.mount('#app');
