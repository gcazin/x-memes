<script setup>
import Text from "@/Components/Text.vue";
import helperService from "@/Services/helper.service.js";

defineProps({
    title: {
        type: String,
    }
})

const menuItems = [
    {
        icon: 'home',
        route: 'index',
        name: 'Accueil'
    },
    {
        icon: 'images',
        route: 'media.index',
        name: 'Médias'
    },
    {
        icon: 'people',
        route: 'user.index',
        name: 'Utilisateurs'
    },
    {
        icon: 'pricetags',
        route: 'tag.index',
        name: 'Tags'
    },
    {
        icon: 'ribbon',
        route: 'badge.index',
        name: 'Badges'
    },
    {
        icon: 'stats-chart',
        route: 'pulse',
        name: 'Pulse',
        onlyFor: 'super-admin',
        isAbsolute: true,
    },
    {
        icon: 'document',
        route: 'log-viewer.index',
        name: 'Logs',
        onlyFor: 'super-admin',
        isAbsolute: true,
    },
    {
        icon: 'arrow-back',
        route: 'home',
        name: 'Retour vers le site',
        isAbsolute: true,
    },
]


const handleRouteLink = (to, isAbsolute = false, checkCurrent = false) => {
    if (checkCurrent) {
        if (isAbsolute) {
            return route().current(to)
        }
        return route().current(`admin.${to}`)
    } else {
        if (isAbsolute) {
            return route(to)
        }
        return route(`admin.${to}`)
    }
}
</script>

<template>
    <div class="flex h-screen overflow-hidden">
        <aside
            class="absolute left-0 top-0 z-9999 flex h-screen w-64 flex-col overflow-y-hidden bg-base-300 shadow duration-300 ease-linear dark:bg-boxdark lg:static lg:translate-x-0 -translate-x-full px-4 shadow-sm"
        >
            <div class="py-4 text-center">
                <a :href="route('admin.index')">
                    <Text>Administration</Text>
                </a>
            </div>
            <nav class="mt-2">
                <ul class="flex flex-col gap-2 font-bold">
                    <template
                        v-for="(item, index) in menuItems"
                        :key="index"
                    >
                        <li
                            v-if="'onlyFor' in item && helperService.checkRoles(item.onlyFor)"
                            class="px-3 py-2 rounded-lg"
                            :class="handleRouteLink(item.route, item.isAbsolute, true) ? 'bg-blue-900/50 text-blue-400' : 'text-gray-400'"
                        >
                            <a :href="handleRouteLink(item.route, item.isAbsolute)">
                                <ion-icon
                                    class="align-text-top mr-1"
                                    :name="handleRouteLink(item.route, item.isAbsolute, true) ? item.icon : `${item.icon}-outline`"
                                >
                                </ion-icon>
                                {{ item.name }}
                            </a>
                        </li>
                        <li
                            v-if="!('onlyFor' in item)"
                            class="px-3 py-2 rounded-lg"
                            :class="handleRouteLink(item.route, item.isAbsolute, true) ? 'bg-blue-900/50 text-blue-400' : 'text-gray-400'"
                        >
                            <a :href="handleRouteLink(item.route, item.isAbsolute)">
                                <ion-icon
                                    class="align-text-top mr-1"
                                    :name="handleRouteLink(item.route, item.isAbsolute, true) ? item.icon : `${item.icon}-outline`"
                                >
                                </ion-icon>
                                {{ item.name }}
                            </a>
                        </li>
                    </template>
                </ul>
            </nav>
        </aside>
        <div class="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden bg-base-200">
            <div id="top-bar" class="py-4 px-6">
                <div class="flex items-center">
                    <div class="flex-1">
                        <h1 class="text-xl">{{ title }}</h1>
                    </div>
                    <div class="flex-1 text-right">
                        <a :href="route('user.show', $page.props.auth.user.id)">
                            <Text class="pb-0">{{ $page.props.auth.user.name }}</Text>
                        </a>
                    </div>
                </div>
            </div>
            <div class="py-2 px-6">
                <slot />
            </div>
        </div>
    </div>
</template>
