import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { MotionPlugin } from '@vueuse/motion'
import { createNotivue } from 'notivue';
import "@/css/main.css"
import 'material-icons/iconfont/material-icons.css';
import vuesax3 from 'vuesax3'
import 'vuesax3/dist/vuesax.css'
import admin from './router/adminrouter';
import './registerServiceWorker'

import { setupCalendar, Calendar, DatePicker } from 'v-calendar';
import 'v-calendar/style.css';

const app = createApp(App)
const notivue = createNotivue({
    position: 'top-center',
    limit: 1,
    enqueue: false,
    notifications: {
        global: {
            duration: 2000
        }
    }
})
const subdomain = window.location.host.split('.')[0];
let routes;
if (subdomain === 'admin') {
    routes = admin;
} else {
    routes = router;
}

app.use(vuesax3, {
    theme: {
        colors: {
            primary: '#5b3cc4',
            success: 'rgb(23, 201, 100)',
            danger: 'rgb(242, 19, 93)',
            warning: 'rgb(255, 130, 0)',
            dark: 'rgb(36, 33, 69)'
        }
    }
})
app.use(routes)
app.use(MotionPlugin)
app.use(notivue)
app.mount('#app')

app.use(setupCalendar, {})

// Use the components
app.component('VCalendar', Calendar)
app.component('VDatePicker', DatePicker)