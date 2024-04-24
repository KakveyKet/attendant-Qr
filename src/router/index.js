import { createRouter, createWebHistory } from 'vue-router'
import MobileHomePage from '@/mobile/MobileHomePage.vue';
import MenuItemMIbile from '@/mobile/MenuItemMIbile.vue';
import QrScanningPage from '@/mobile/QrScanningPage.vue';
import PermmissionPage from '@/mobile/PermmissionPage.vue';
import SigneIn from '@/mobile/SigneIn.vue';
import LoginPage from '@/mobile/LoginPage.vue';
import TestQr from '@/components/TestQr.vue';

import ReparingLabService from '@/mobile/ReparingLabService.vue';

import LabPermmission from '../mobile/LabPermmission.vue';

import ForgetPassword from '@/mobile/ForgetPassword.vue';

const routes = [
  {
    path: '/',
    name: 'mobile',
    redirect: '/menuitem', // Redirect '/' to '/menuitem'
    component: MobileHomePage,
    children: [
      { path: 'menuitem', name: 'menuitem', component: MenuItemMIbile },
      { path: 'qrscanning', name: 'qrscanning', component: QrScanningPage },
      { path: 'permissions', name: 'permissions', component: PermmissionPage },
      { path: '/labpermissions', name: 'labpermissions', component: LabPermmission },
      { path: '/repairinglabservice', name: 'repairinglabservice', component: ReparingLabService }
    ]
  },
  { path: '/test', name: 'test', component: TestQr },
  { path: '/register', name: 'register', component: SigneIn },
  { path: '/login', name: 'login', component: LoginPage },
  { path: '/forgot', name: 'forgot', component: ForgetPassword }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
