import { RouteRecordRaw } from 'vue-router';
import { logoutRequest } from 'src/data/userRequests';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('pages/IndexPage.vue'),
        name: 'home',
      },
    ],
  },
  {
    path: '/auth',
    meta: { requireGuest: true },
    component: () => import('layouts/AuthLayout.vue'),
    children: [
      {
        path: '/login',
        component: () => import('pages/auth/LoginPage.vue'),
        name: 'login',
      },
      {
        path: '/register',
        component: () => import('pages/auth/RegisterPage.vue'),
        name: 'register',
      },
      {
        path: '/forgot-password',
        component: () => import('pages/auth/ForgotPassword.vue'),
        name: 'forgot.password',
      },
      {
        path: '/verify/:type?',
        meta: { requireGuest: false, requireAuth: true },
        component: () => import('pages/auth/VerifyPage.vue'),
        name: 'auth.verify',
      },
      {
        meta: { requireGuest: false, requireAuth: true },
        path: '/user/logout',
        component: () => import('pages/auth/LoginPage.vue'),
        name: 'logout',
        beforeEnter: async () => {
          await logoutRequest().send();
          return { name: 'login' };
        },
      },
    ],
  },
  {
    path: '/user',
    meta: { requireAuth: true },
    component: () => import('layouts/UserDashboardLayout.vue'),
    children: [
      {
        path: 'dashboard',
        component: () => import('pages/user/UserDashboard.vue'),
        name: 'user.dashboard',
      },
      {
        path: 'add-data/:data_id?',
        component: () => import('pages/user/AddData.vue'),
        name: 'user.add.data',
      },
      {
        path: 'history',
        component: () => import('pages/user/HistoryPage.vue'),
        name: 'user.history',
      },

      {
        path: 'profile',
        component: () => import('pages/user/ProfilePage.vue'),
        name: 'user.profile',
      },
    ],
  },
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
        name: 'user.nmdpra.data',
      },
      {
        path: '/admin/frsc',
        component: () => import('pages/admin/FrscData.vue'),
        name: 'user.frsc.data',
      },
      {
        path: '/admin/dealer',
        component: () => import('pages/admin/DealerData.vue'),
        name: 'user.dealer.data',
      },
      {
        path: '/admin/son',
        component: () => import('src/pages/admin/SonsData.vue'),
        name: 'admin.son.data',
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
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
