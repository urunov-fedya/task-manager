import type { RouteRecordRaw } from 'vue-router'

export const privateRoutes: RouteRecordRaw[] = [
  {
    path: '',
    component: () => import('@/app/layouts/main-layout.vue'),
    redirect: { name: 'home' },
    children: [
      {
        path: '/',
        name: 'home',
        meta: { public: false },
        component: () => import('@/pages/home-page.vue'),
      },
    ],
  },
]
