import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(),
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return { ...savedPosition, behavior: "smooth" };
    } else {
      return { x: 0, y: 0, behavior: "smooth" };
    }
  },
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/home',
      name: 'home',
      component: () => import('../views/home.vue')
    },
    {
      path: '/dom_home',
      name: 'dom_home',
      component: () => import('../views/dom_home.vue')
    },
    {
      path: '/preview/:index',
      name: 'preview',
      component: () => import('../views/preview.vue')
    }
  ]
})

export default router
