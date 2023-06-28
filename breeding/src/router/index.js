import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../pages/HomeView.vue'

const routes = [
  {
    path: '/',
    name: "VisualTable",
    redirect: '/visual',
  },
  {
    path: '/login',
    name: "login",
    //*设置相应元信息
    meta: {
      title: 'login',
    },
    component: () => import("../pages/LoginView.vue"),
  },
  {
    path: '/',
    name: 'home',
    //*设置相应元信息
    meta: {
      title: 'home',
    },
    component: HomeView,
    children: [
      {
        path: '/visual',
        //*设置对应组件
        component: () => import("../views/VisualTable.vue"),
        //*设置相应元信息
        meta: {
            title: 'visual',
        },
      },
      {
        path: '/history',
        //*设置对应组件
        component: () => import("../views/HistoryTable.vue"),
        //*设置相应元信息
        meta: {
            title: 'history',
        },
      },
      {
        path: '/farmed',
        //*设置对应组件
        component: () => import("../views/FarmedTable.vue"),
        //*设置相应元信息
        meta: {
            title: 'farmed',
        },
      },
      {
        path: '/equipment',
        //*设置对应组件
        component: () => import("../views/EquipmentTable.vue"),
        //*设置相应元信息
        meta: {
            title: 'equipment',
        },
      },
      {
        path: '/user',
        //*设置对应组件
        component: () => import("../views/UserDate.vue"),
        //*设置相应元信息
        meta: {
            title: 'user',
        },
      },
    ]
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
