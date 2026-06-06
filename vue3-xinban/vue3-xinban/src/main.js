import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

// 应用pinia储存状态管理
import { createPinia } from 'pinia'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
const app = createApp(App)
// 应用pinia储存状态管理
app.use(createPinia())
app.use(ElementPlus)

app.use(router)

app.mount('#app')
