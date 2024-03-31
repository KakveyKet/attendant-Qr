import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { MotionPlugin } from '@vueuse/motion'
import { createNotivue } from 'notivue';
import "@/css/main.css"
import VueCryptojs from 'vue-cryptojs'
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
app.use(router)
app.use(MotionPlugin)
app.use(notivue)
app.use(VueCryptojs)
app.mount('#app')
