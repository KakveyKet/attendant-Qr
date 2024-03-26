import { createRouter, createWebHistory } from 'vue-router'
import AdminDashbord from '@/components/AdminDashbord.vue'
import DashboardMangement from "@/components/DashMangment.vue";
import FacedetactionApp from '@/components/FacedetactionApp.vue';
import AttendantPage from '@/components/AttendantPage.vue';
import Student from '@/components/Student.vue';
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

  },
  {
    path: '/test',
    name: 'test',
    component: TestQr
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
