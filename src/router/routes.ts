import { RouteRecordRaw } from 'vue-router';
import admin from './admin';
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
        path: 'add-refueling-station/:station_id?',
        component: () => import('pages/user/AddRefuelingStationPage.vue'),
        name: 'user.add.station',
      },
      {
        path: 'refueling-stations',
        component: () => import('src/pages/user/RefuelingStationsPage.vue'),
        name: 'user.stations',
      },
      {
        path: 'add-vehicle/:vehicle_id?',
        component: () => import('pages/user/AddVehicle.vue'),
        name: 'user.add.vehicle',
      },
      {
        path: 'vehicles',
        component: () => import('pages/user/VehicleListPage.vue'),
        name: 'user.vehicles',
      },
      {
        path: 'add-certificate/:certificate_id?',
        component: () => import('pages/user/AddCertificatePage.vue'),
        name: 'user.add.certificate',
      },
      {
        path: 'certificates',
        component: () => import('pages/user/CertificatesPage.vue'),
        name: 'user.certificates',
      },

      {
        path: 'add-conversion-center/:center_id?',
        component: () => import('pages/user/AddConversionCenterPage.vue'),
        name: 'user.add.center',
      },
      {
        path: 'conversion-centers',
        component: () => import('pages/user/ConversionCenterListPage.vue'),
        name: 'user.centers',
      },
      {
        path: 'add-conversion-kit/:kit_id?',
        component: () => import('pages/user/AddConversionKitPage.vue'),
        name: 'user.add.kit',
      },
      {
        path: 'conversion-kits',
        component: () => import('pages/user/ConversionKitListPage.vue'),
        name: 'user.kits',
      },
      {
        path: 'profile',
        component: () => import('pages/user/ProfilePage.vue'),
        name: 'user.profile',
      },
    ],
  },
  ...admin,
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
