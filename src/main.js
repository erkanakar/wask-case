import "bootstrap/dist/css/bootstrap.min.css"
import "@/assets/style/style.scss"

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import VueApexCharts from "vue3-apexcharts";
import App from './App.vue'

const app = createApp(App)

app.use(VueApexCharts);

app.use(createPinia())

app.mount('#app')

import "bootstrap/dist/js/bootstrap.js"