import '../css/app.css'
import './bootstrap'

import FormService from '@/Services/form.service.js'
import HelperService from '@/Services/helper.service.js'
import { createInertiaApp } from '@inertiajs/vue3'
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers'
import { createApp, createSSRApp, h } from 'vue'
import { ZiggyVue } from '../../vendor/tightenco/ziggy/dist/vue.m'
import { Ziggy } from '@/ziggy.js'

const appName = import.meta.env.VITE_APP_NAME || 'Laravel'

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) =>
        resolvePageComponent(
            `./Pages/${name}.vue`,
            import.meta.glob('./Pages/**/*.vue')
        ),
    setup({ el, App, props, plugin }) {
        const app = createApp({ render: () => h(App, props) })
        app.config.globalProperties.helperService = HelperService
        app.config.globalProperties.helperService.setProps(props)
        app.config.globalProperties.formService = FormService
        app.use(plugin)
        app.use(ZiggyVue, Ziggy)
        return app.mount(el)
    },
    progress: {
        color: '#1e40af',
    },
})
