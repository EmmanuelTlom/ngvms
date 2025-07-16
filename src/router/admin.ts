import { RouteRecordRaw } from 'vue-router';

export default <RouteRecordRaw[]>[
  {
    path: '/admin',
    // meta: { requireAuth: true, requireAdmin: true, },
    component: () => import('layouts/AdminDashboardLayout.vue'),
    children: [
      {
        path: 'dashboard',
        component: () => import('pages/admin/AdminDashboard.vue'),
        name: 'admin.dashboard',
      },
      {
        path: 'naddc',
        component: () => import('pages/admin/NaddcData.vue'),
        name: 'admin.naddc.data',
      },
      {
        path: 'add/conversion-center/create/:center_id?',
        component: () =>
          import('pages/admin/Forms/AddConversionCenterPage.vue'),
        name: 'admin.add.center',
      },
      {
        path: 'nmdpra',
        component: () => import('pages/admin/NmdpraData.vue'),
        name: 'admin.nmdpra.data',
      },
      {
        path: 'add/refueling-station/:station_id?',
        component: () =>
          import('pages/admin/Forms/AddRefuelingStationPage.vue'),
        name: 'admin.add.station',
      },
      {
        path: 'frsc',
        component: () => import('pages/admin/FrscData.vue'),
        name: 'admin.frsc.data',
      },
      {
        path: 'add/vehicle/create/:vehicle_id?',
        component: () => import('pages/admin/Forms/AddVehicle.vue'),
        name: 'admin.add.vehicle',
      },
      {
        path: 'dealer',
        component: () => import('pages/admin/DealerData.vue'),
        name: 'admin.dealer.data',
      },
      {
        path: 'add/conversion-kit/:kit_id?',
        component: () => import('pages/admin/Forms/AddConversionKitPage.vue'),
        name: 'admin.add.kit',
      },
      {
        path: '/admin/son',
        component: () => import('src/pages/admin/SonsData.vue'),
        name: 'admin.son.data',
      },
      {
        path: 'add/certificate/:certificate_id?',
        component: () => import('pages/admin/Forms/AddCertificatePage.vue'),
        name: 'admin.add.certificate',
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
      {
        path: '/admin/mangage/conversion-centers',
        component: () => import('pages/admin/ManageCcs.vue'),
        name: 'mangage.conversionC',
      },
      {
        path: '/admin/mangage/pumpers',
        component: () => import('pages/admin/ManageFuelPumpers.vue'),
        name: 'mangage.fuel.pumpers',
      },
      {
        path: '/admin/mangage/pump-sales',
        component: () => import('pages/admin/ManagePumpSales.vue'),
        name: 'mangage.pumper.sales',
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
];
