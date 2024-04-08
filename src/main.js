import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { MotionPlugin } from '@vueuse/motion'
import { createNotivue } from 'notivue';
import "@/css/main.css"
import Vuesax from 'vuesax3'
import 'vuesax3/dist/vuesax.css'
import 'material-icons/iconfont/material-icons.css';

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
app.use(Vuesax, {
    theme: {
        colors: {
            primary: '#627254',
            success: 'rgb(23, 201, 100)',
            danger: 'rgb(242, 19, 93)',
            warning: 'rgb(255, 130, 0)',
            dark: 'rgb(36, 33, 69)'
        }
    }
})
app.use(router)
app.use(MotionPlugin)
app.use(notivue)
app.mount('#app')