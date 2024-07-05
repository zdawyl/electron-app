import './style/main.less'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import Antd from 'ant-design-vue'
import router from './router'
import i18n from "./language/zhzhi18n";
import 'animate.css' // 动画库
const app = createApp(App)

app.use(createPinia()).use(i18n).use(router).use(Antd).mount('#app')
