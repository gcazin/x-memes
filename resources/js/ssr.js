import FormService from '@/Services/form.service.js'
import HelperService from '@/Services/helper.service.js'
import { Ziggy } from '@/ziggy.js'
import { createInertiaApp } from '@inertiajs/vue3'
import createServer from '@inertiajs/vue3/server'
import { renderToString } from '@vue/server-renderer'
import { i18nVue } from 'laravel-vue-i18n'
import { createSSRApp, h } from 'vue'
import { ZiggyVue } from '../../vendor/tightenco/ziggy/dist/vue.m'

createServer((page) =>
    createInertiaApp({
        page,
        render: renderToString,
        resolve: (name) => {
            const pages = import.meta.glob('./Pages/**/*.vue', { eager: true })
            return pages[`./Pages/${name}.vue`]
        },
        setup({ App, props, plugin }) {
            const app = createSSRApp({ render: () => h(App, props) })
            app.use(plugin)
            app.config.globalProperties.helperService = HelperService
            app.config.globalProperties.helperService.setProps(props)
            app.config.globalProperties.formService = FormService
            app.config.compilerOptions.isCustomElement = (tag) => {
                return tag.startsWith('ion-')
            }
            app.mixin({
                methods: {
                    route: (name, params, absolute, config = Ziggy) =>
                        route(name, params, absolute, config),
                },
            })
            app.use(i18nVue, {
                lang: 'en',
                resolve: (lang) => {
                    const langs = import.meta.glob('../../lang/*.json', {
                        eager: true,
                    })
                    return langs[`../../lang/${lang}.json`].default
                },
            })
            app.use(ZiggyVue, Ziggy)
            return app
        },
        progress: {
            color: '#1e40af',
        },
    })
)
