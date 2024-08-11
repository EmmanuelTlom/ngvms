import { RouteRecordRaw } from 'vue-router';

export default <RouteRecordRaw[]>[
  {
    path: '/admin',
    // meta: { requireAuth: true, requireAdmin: true, },
    component: () => import('layouts/AdminDashboardLayout.vue'),
    children: [
      {
        path: '/admin/dashboard',
        component: () => import('pages/admin/AdminDashboard.vue'),
        name: 'admin.dashboard',
      },
      {
        path: '/admin/naddc',
        component: () => import('pages/admin/NaddcData.vue'),
        name: 'admin.naddc.data',
      },

      {
        path: '/admin/nmdpra',
        component: () => import('pages/admin/NmdpraData.vue'),
        name: 'admin.nmdpra.data',
      },
      {
        path: '/admin/frsc',
        component: () => import('pages/admin/FrscData.vue'),
        name: 'admin.frsc.data',
      },
      {
        path: '/admin/dealer',
        component: () => import('pages/admin/DealerData.vue'),
        name: 'admin.dealer.data',
      },
      {
        path: '/admin/son',
        component: () => import('src/pages/admin/SonsData.vue'),
        name: 'admin.son.data',
      },
      {
        path: '/admin/users',
        component: () => import('src/pages/admin/UsersPage.vue'),
        name: 'admin.users',
      },


      {
        path: '/admin/general/settings',
        component: () => import('pages/admin/GenSettings.vue'),
        name: 'gen.settings',
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/admin/login',
    component: () => import('pages/admin/auth/LoginPage.vue'),
    name: 'admin.login',
  },
  {
    path: '/admin/register',
    component: () => import('pages/admin/auth/RegisterPage.vue'),
    name: 'admin.register',
  },
]
