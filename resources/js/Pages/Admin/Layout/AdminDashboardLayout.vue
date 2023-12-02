<script setup>
import Text from "@/Components/Text.vue";

const menuItems = [
    {
        icon: 'home',
        route: 'index',
        name: 'Accueil'
    },
    {
        icon: 'images',
        route: 'medias',
        name: 'Médias'
    },
    {
        icon: 'people',
        route: 'users',
        name: 'Utilisateurs'
    },
    {
        icon: 'pricetags',
        route: 'tags',
        name: 'Tags'
    },
    {
        icon: 'ribbon',
        route: 'badges',
        name: 'Badges'
    },
]
</script>

<template>
    <div class="flex h-screen overflow-hidden">
        <aside
            class="absolute left-0 top-0 z-9999 flex h-screen w-64 flex-col overflow-y-hidden bg-gray-900 duration-300 ease-linear dark:bg-boxdark lg:static lg:translate-x-0 -translate-x-full px-2 shadow-sm"
        >
            <div class="py-4 text-center">
                <a :href="route('admin.index')">
                    <Text>Administration</Text>
                </a>
            </div>
            <nav class="mt-2">
                <ul class="flex flex-col gap-2 font-bold">
                    <li
                        v-for="(item, index) in menuItems"
                        :key="index"
                        class="px-3 py-2 rounded-lg"
                        :class="route().current(`admin.${item.route}`) ? 'bg-gray-800 text-white' : 'text-gray-400'"
                    >
                        <a :href="route(`admin.${item.route}`)">
                            <ion-icon
                                class="align-text-top mr-1"
                                :name="route().current(`admin.${item.route}`) ? item.icon : `${item.icon}-outline`"
                            >
                            </ion-icon>
                            {{ item.name }}
                        </a>
                    </li>
                    <li
                        class="px-3 py-2 rounded-lg text-white"
                    >
                        <a :href="route('home')">Retour vers le site</a>
                    </li>
                </ul>
            </nav>
        </aside>
        <div class="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden bg-gray-800">
            <div id="top-bar" class="bg-gray-900 py-4 px-4 border-b border-gray-800 shadow">
                <div class="flex justify-end">
                    <a :href="route('user.show', $page.props.auth.user.id)">
                        <Text class="pb-0">{{ $page.props.auth.user.name }}</Text>
                    </a>
                </div>
            </div>
            <div class="py-4 px-6">
                <slot />
            </div>
        </div>
    </div>
</template>
