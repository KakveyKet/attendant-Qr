import { createRouter, createWebHistory } from 'vue-router'

import AdminDashbord from '@/components/AdminDashbord.vue'
import DashboardMangement from "@/components/DashMangment.vue";
import FacedetactionApp from '@/components/FacedetactionApp.vue';
import AttendantPage from '@/components/AttendantPage.vue';
import Student from '@/components/StudentPage.vue';

import MobileHomePage from '@/mobile/MobileHomePage.vue';
import MenuItemMIbile from '@/mobile/MenuItemMIbile.vue';
import QrScanningPage from '@/mobile/QrScanningPage.vue';
import PermmissionPage from '@/mobile/PermmissionPage.vue';
import SigneIn from '@/mobile/SigneIn.vue';
import LoginPage from '@/mobile/LoginPage.vue';
import TestQr from '@/components/TestQr.vue';
const routes = [
  {
    path: '/dashboard',
    name: 'dashboard',
    component: AdminDashbord,

    children: [
      { path: '/dash', name: 'dash', component: DashboardMangement },
      { path: '/', name: 'scan', component: FacedetactionApp },
      { path: '/attendant', name: 'attendant', component: AttendantPage },
      { path: '/student', name: 'student', component: Student }
    ]

  }, {
    path: '/mobile',
    name: 'mobile',
    component: MobileHomePage,
    children: [
      { path: '/menuitem', name: 'menuitem', component: MenuItemMIbile },
      { path: '/qrscanning', name: 'qrscanning', component: QrScanningPage },
      { path: '/permissions', name: 'permissions', component: PermmissionPage },
    ]
  },
  {
    path: '/test',
    name: 'test',
    component: TestQr
  }, { path: '/register', name: 'register', component: SigneIn },
  { path: '/login', name: 'login', component: LoginPage },

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
