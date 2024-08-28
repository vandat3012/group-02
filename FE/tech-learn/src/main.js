// main.js or main.ts
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import { ToastContainer } from 'vue3-toastify';
import { Toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';


const app = createApp(App);
library.add(fas);
app.component('fa', FontAwesomeIcon)
app.use(store);
app.use(router);
app.use(Toast);
app.component('ToastContainer', ToastContainer);
app.mount('#app');

