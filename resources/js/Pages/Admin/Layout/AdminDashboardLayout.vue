<script setup>
import Avatar from '@/Components/Misc/Avatar.vue'
import Icon from '@/Components/Misc/Icon.vue'
import Toast from '@/Components/Misc/Toast.vue'
import helperService from '@/Services/helper.service.js'
import { Head } from '@inertiajs/vue3'

defineProps({
    title: {
        type: String,
    },
    backButton: {
        type: Boolean,
    },
})

const menuItems = [
    {
        icon: 'home',
        route: 'index',
        name: 'Accueil',
    },
    {
        icon: 'images',
        route: 'media.index',
        name: 'Médias',
    },
    {
        icon: 'people',
        route: 'user.index',
        name: 'Utilisateurs',
    },
    {
        icon: 'pricetags',
        route: 'tag.index',
        name: 'Tags',
    },
    {
        icon: 'ribbon',
        route: 'badge.index',
        name: 'Badges',
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
        icon: 'telescope',
        route: 'telescope',
        name: 'Telescope',
        onlyFor: 'super-admin',
        isAbsolute: true,
    },
    {
        icon: 'arrow-back',
        route: 'index',
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
    <Head :title="title" />

    <div class="drawer lg:drawer-open">
        <input id="my-drawer" type="checkbox" class="drawer-toggle" />
        <div class="drawer-content">
            <div class="relative min-h-screen bg-base-200">
                <div id="top-bar" class="px-6 py-4">
                    <div class="flex items-center">
                        <label
                            for="my-drawer"
                            class="drawer-button mr-2 text-2xl lg:hidden"
                        >
                            <Icon name="reorder-four" />
                        </label>
                        <h1 class="text-xl">
                            {{ title }}
                        </h1>
                        <div class="flex-1 text-right">
                            <a
                                :href="
                                    route(
                                        'user.show',
                                        $page.props.auth.user.username
                                    )
                                "
                            >
                                <div
                                    class="float-right flex items-center gap-2"
                                >
                                    <Avatar size="sm" />
                                    {{ $page.props.auth.user.username }}
                                </div>
                            </a>
                        </div>
                    </div>
                </div>
                <div class="px-6 py-2" v-if="backButton">
                    <a class="btn btn-ghost" :href="route('admin.index')">
                        <Icon name="arrow-back" size="lg" /> Retour en arrière
                    </a>
                </div>
                <div class="px-6 py-2">
                    <slot />
                </div>
            </div>
        </div>
        <div class="drawer-side">
            <label
                for="my-drawer"
                aria-label="close sidebar"
                class="drawer-overlay"
            ></label>
            <ul class="menu min-h-full w-80 bg-base-300 p-4 text-base">
                <!-- Sidebar content here -->
                <template v-for="(item, index) in menuItems" :key="index">
                    <li
                        v-if="
                            'onlyFor' in item &&
                            helperService.checkRoles(item.onlyFor)
                        "
                        class="mb-1"
                        :class="
                            handleRouteLink(item.route, item.isAbsolute, true)
                                ? 'bg-blue-900/50 text-blue-400'
                                : 'text-gray-400'
                        "
                    >
                        <a :href="handleRouteLink(item.route, item.isAbsolute)">
                            <Icon
                                size="xl"
                                :name="item.icon"
                                :outline="
                                    !handleRouteLink(
                                        item.route,
                                        item.isAbsolute,
                                        true
                                    )
                                "
                            >
                            </Icon>
                            {{ item.name }}
                        </a>
                    </li>
                    <li
                        v-if="!('onlyFor' in item)"
                        class="mb-1"
                        :class="
                            handleRouteLink(item.route, item.isAbsolute, true)
                                ? 'bg-blue-900/50 text-blue-400'
                                : 'text-gray-400'
                        "
                    >
                        <a :href="handleRouteLink(item.route, item.isAbsolute)">
                            <Icon
                                size="xl"
                                :name="item.icon"
                                :outline="
                                    !handleRouteLink(
                                        item.route,
                                        item.isAbsolute,
                                        true
                                    )
                                "
                            >
                            </Icon>
                            {{ item.name }}
                        </a>
                    </li>
                </template>
            </ul>
        </div>
    </div>
    <Toast />
</template>
