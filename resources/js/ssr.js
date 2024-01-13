import { createInertiaApp } from '@inertiajs/vue3'
import createServer from '@inertiajs/vue3/server'
import { renderToString } from '@vue/server-renderer'
import { createSSRApp, h } from 'vue'
import HelperService from '@/Services/helper.service.js'
import FormService from '@/Services/form.service.js'
import { Ziggy } from '@/ziggy.js'
import { ZiggyVue } from '../../vendor/tightenco/ziggy/dist/vue.m'

createServer(page =>
    createInertiaApp({
        page,
        render: renderToString,
        resolve: name => {
            const pages = import.meta.glob('./Pages/**/*.vue', { eager: true })
            return pages[`./Pages/${name}.vue`]
        },
        setup({ App, props, plugin }) {
            const app = createSSRApp({ render: () => h(App, props), })
            app.use(plugin)
            app.config.globalProperties.helperService = HelperService
            app.config.globalProperties.helperService.setProps(props)
            app.config.globalProperties.formService = FormService
            app.use(ZiggyVue, Ziggy)
        },
        progress: {
            color: '#1e40af',
        },
    }),
)
