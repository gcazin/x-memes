<script setup>
import Text from "@/Components/Text.vue";

const menuItems = [
    {
        route: 'index',
        name: 'Accueil'
    },
    {
        route: 'medias',
        name: 'Médias'
    },
    {
        route: 'users',
        name: 'Utilisateurs'
    },
    {
        route: 'tags',
        name: 'Tags'
    },
]
</script>

<template>
    <div class="flex h-screen overflow-hidden">
        <aside
            class="absolute left-0 top-0 z-9999 flex h-screen w-64 flex-col overflow-y-hidden bg-gray-900 duration-300 ease-linear dark:bg-boxdark lg:static lg:translate-x-0 -translate-x-full px-2 shadow-sm"
        >
            <div class="py-4 text-center">
                <Text>Administration</Text>
            </div>
            <nav class="mt-2">
                <ul class="flex flex-col gap-2 font-bold">
                    <li
                        v-for="(item, index) in menuItems"
                        :key="index"
                        class="px-3 py-2 rounded-lg text-white"
                        :class="route().current(`admin.${item.route}`) ? 'bg-gray-800' : null"
                    >
                        <a :href="route(`admin.${item.route}`)">{{ item.name }}</a>
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
            <div id="top-bar" class="bg-gray-800 py-4 px-4 border-b border-gray-900 shadow">
                <div class="flex justify-end">
                    <Text class="pb-0">{{ $page.props.auth.user.name }}</Text>
                </div>
            </div>
            <div class="p-8">
                <slot />
            </div>
        </div>
    </div>
</template>
