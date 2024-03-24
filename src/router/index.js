import { createRouter, createWebHistory } from 'vue-router'
import AdminDashbord from '@/components/AdminDashbord.vue'
import DashboardMangement from "@/components/DashMangment.vue";
import FacedetactionApp from '@/components/FacedetactionApp.vue';
import AttendantPage from '@/components/AttendantPage.vue';
const routes = [
  {
    path: '/dashboard',
    name: 'dashboard',
    component: AdminDashbord,

    children: [
      { path: '/dash', name: 'dash', component: DashboardMangement },
      { path: '/scan', name: 'scan', component: FacedetactionApp },
      { path: '/attendant', name: 'attendant', component: AttendantPage }
    ]

  }

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
