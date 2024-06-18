import Vue3Toastify, { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(Vue3Toastify, { 
    autoClose: 1000,
    style: {
        opacity: '0.9',
      }, 
});

  return {
    provide: { toast },
  };
});