import { createRouter, createWebHistory } from 'vue-router'
import AdminDashbord from '@/components/AdminDashbord.vue'
import DashboardMangement from "@/components/DashMangment.vue";
import FacedetactionApp from '@/components/FacedetactionApp.vue';
import AttendantPage from '@/components/AttendantPage.vue';
import Student from '@/components/StudentPage.vue';
import StudentPermissionPage from '@/components/StudentPermissionPage.vue';
import FaceAttendentOut from '@/components/FaceAttendentOut.vue';
import AttendentsOut from '@/components/AttendentsOut.vue';
const adminrouters = [
    {
        path: '/',
        redirect: { name: 'scan' },
        name: 'dashboard',
        component: AdminDashbord,
        children: [
            { path: 'dash', name: 'dash', component: DashboardMangement },
            { path: 'scan', name: 'scan', component: FacedetactionApp },
            { path: 'attendant', name: 'attendant', component: AttendantPage },
            { path: 'student', name: 'student', component: Student },
            { path: 'studentpermission', name: 'studentpermission', component: StudentPermissionPage },
            { path: 'scanout', name: 'scanout', component: FaceAttendentOut },
            { path: 'attendentout', name: 'attendentout', component: AttendentsOut }
        ]
    }
]

const admin = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes: adminrouters
})

export default admin
