import { createApp } from 'vue'
// import './style.css'
import App from './App.vue'
import 'element-plus/dist/index.css'
import ElementPlus from 'element-plus'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import router from './router'
// 添加 pinia 依赖
import { createPinia } from 'pinia'
// 实例化 pinia 插件
let pinia = createPinia()
// 动画 animate.css
// import animate from "animate.css";

import axios from 'axios'
import VueAxios from 'vue-axios'

const app = createApp(App); // 创建vue实例
app.use(ElementPlus) ; // 注册element-plus
// 注册element-plus图标
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
// 注册路由
app.use(router)
// 注册仓库
app.use(pinia)
// 注册axios
// app.use(VueAxios, axios)
// app.provide('axios', app.config.globalProperties.axios)

// 挂载实例
app.mount('#app')
