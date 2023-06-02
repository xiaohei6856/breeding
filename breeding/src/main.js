import { createApp } from 'vue'
import App from './App.vue'
import TDesign from 'tdesign-vue-next';
import router from './router'
import store from './store'
// 引入组件库的少量全局样式变量
import 'tdesign-vue-next/es/style/index.css';
// import { registerIconComponent } from 'tdesign-icons-vue-next'
// registerIconComponent(app)

createApp(App).use(store).use(TDesign).use(router).mount('#app')
