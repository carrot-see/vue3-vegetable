import { createRouter, createWebHashHistory } from 'vue-router'
import shouye from '@/views/shouye/shouye.vue'
const zhuye = () => import('@/views/shouye/zhuye.vue')
const shanpin = () => import('@/views/shouye/shangpin.vue')
const userIndex = () => import('@/views/shouye/user.vue')
const shoucang = () => import('@/views/shouye/shoucang.vue')
const zhuce = () => import('@/views/zhuce.vue')
const suosou = () => import('@/views/suosou.vue')
const xiangxi = () => import('@/views/xiangxi.vue')

const routes = [
  { path: '/zhuce', component: zhuce },
  {path:'/sousuo',component:suosou},
  {path:'/xiangxi/:id',component:xiangxi},
  {
    path: '/',
    component: shouye,
    redirect: '/shouye',
    children: [
      { path: '/shouye', component: zhuye },
      { path: '/shangpin', component: shanpin },
      { path: '/user', component: userIndex },
      { path:'/shoucang', component:shoucang }
      
    ]
  }
]
const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: routes,
})

// 路由守卫
router.beforeEach((to, from, next) => {
//   console.log("准备跳转：", to.path)
// console.log(from);
// console.log(next);
 // 1. 判断：要去的是不是 user 页面

  if (to.path === '/user') {
    // 2. 判断：有没有注册（有没有user信息）
    const hasRegister = JSON.parse( localStorage.getItem('user'))
    // 没注册 → 跳去注册页
    if (!hasRegister) {
      next('/zhuce')
    } else {
      // 已经注册 → 正常进入 User 页面
      next()
    }
  } else {
    // 其他页面：全部直接放行！
    next()
  }
})
export default router
