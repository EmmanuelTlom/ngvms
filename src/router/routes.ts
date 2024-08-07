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
        path: '/admin/users',
        component: () => import('pages/admin/UsersPage.vue'),
        name: 'admin.users',
      },
      {
        path: '/admin/managers',
        component: () => import('pages/admin/ManagersPage.vue'),
        name: 'admin.managers',
      },
      {
        path: '/admin/add/managers',
        component: () => import('pages/admin/AddManager.vue'),
        name: 'add.managers',
      },
      {
        path: '/admin/user/detail',
        component: () => import('pages/admin/UsersDetail.vue'),
        name: 'user.detail',
      },
      {
        path: '/admin/api-log',
        component: () => import('pages/admin/ApiLogs.vue'),
        name: 'api.log',
      },
      {
        path: '/admin/suspensions',
        component: () => import('pages/admin/SuspensionPage.vue'),
        name: 'suspensions',
      },
      {
        path: '/admin/referrals',
        component: () => import('pages/admin/ReferralsPage.vue'),
        name: 'referrals',
      },
      {
        path: '/admin/referral-bonus',
        component: () => import('pages/admin/ReferralBonusPage.vue'),
        name: 'referral.bonus',
      },
      {
        path: '/admin/refrees/:id',
        component: () => import('pages/admin/RefreesPage.vue'),
        name: 'refrees',
      },
      {
        path: '/admin/general/settings',
        component: () => import('pages/admin/GenSettings.vue'),
        name: 'gen.settings',
      },
      {
        path: '/admin/dispute',
        component: () => import('pages/admin/DisputePage.vue'),
        name: 'dispute',
      },
      {
        path: '/admin/coupon',
        component: () => import('pages/admin/CouponsPage.vue'),
        name: 'coupon',
      },
      {
        path: '/admin/airtime-network',
        component: () => import('pages/admin/AirtimeNetwork.vue'),
        name: 'airtime.network',
      },
      {
        path: '/admin/data-network',
        component: () => import('pages/admin/DataNetwork.vue'),
        name: 'data.network',
      },
      {
        path: '/admin/transactions',
        component: () => import('pages/admin/TransactionsPage.vue'),
        name: 'transactions',
      },
      {
        path: '/admin/conversion-detail/:id',
        component: () => import('pages/admin/ConversionDetail.vue'),
        name: 'conversion.detail',
      },
      {
        path: '/admin/auto-conversion',
        component: () => import('pages/admin/AutoConvert.vue'),
        name: 'auto.conversion',
      },
      {
        path: '/admin/conversion',
        component: () => import('pages/admin/ConversionPage.vue'),
        name: 'conversion.page',
      },
      {
        path: '/admin/network-type/:id',
        component: () => import('pages/admin/NetworkTypes.vue'),
        name: 'network-type',
      },
      {
        path: '/admin/dispute/:id',
        component: () => import('pages/admin/DisputeDetail.vue'),
        name: 'dispute.detail',
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
