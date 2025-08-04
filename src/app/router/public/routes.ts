import type { RouteRecordRaw } from 'vue-router'

export const publicRoutes: RouteRecordRaw[] = [
  {
    path: '/auth',
    name: 'auth',
    redirect: { name: 'login' },
    component: () => import('@/app/layouts/login-layout.vue'),
    children: [
      {
        name: 'login',
        path: 'login',
        component: () => import('@/pages/login-page.vue'),
        meta: { public: true },
      },
      {
        name: 'register',
        path: 'register',
        component: () => import('@/pages/register-page.vue'),
        meta: { public: true },
      },
    ],
  },
]
