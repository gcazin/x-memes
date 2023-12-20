<script setup>
import DropdownLink from "@/Components/Misc/DropdownLink.vue";
import {onMounted, ref} from "vue";
import {usePage} from "@inertiajs/vue3";
import helperService from "@/Services/helper.service.js";
import Avatar from "@/Components/Misc/Avatar.vue";
import Icon from "@/Components/Misc/Icon.vue";
import Tag from "@/Components/Misc/Tag.vue";

const page = usePage()

const menuItems = [
    {
        route: 'library',
        name: 'Bibliothèque'
    },
    {
        route: 'leaderboard',
        name: 'Classement'
    },
    {
        route: 'random',
        name: 'Au hasard'
    },
]

const notifications = page.props.auth?.notifications
</script>
<template>
    <div class="bg-base-300 shadow">
        <div class="navbar w-full lg:w-9/12 mx-auto px-2 lg:px-0">
            <div class="navbar-start">
                <div class="dropdown">
                    <div tabindex="0" role="button" class="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </div>
                    <ul tabindex="0" class="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                        <li
                            v-for="(item, index) in menuItems"
                            :key="index"
                        >
                            <a :href="route(item.route)" :active="route().current(item.route)">{{ item.name }}</a>
                        </li>
                        <li
                            v-if="helperService.checkRoles('super-admin,admin')"
                        >
                            <a :href="route('admin.index')" :active="route().current('admin.dashboard')">
                                Administration
                            </a>
                        </li>
                    </ul>
                </div>
                <a :href="route('index')" class="text-2xl">
                    <div class="flex items-center gap-x-2 w-full">
                        <img class="w-8 lg:w-12 inline" src="/storage/misc/favicon.png" alt="">
                        <span class="font-bold">
                        X-Memes
                        <Tag type="secondary" size="sm" class="hidden lg:block align-middle">alpha</Tag>
                    </span>
                    </div>
                </a>
            </div>
            <div class="navbar-center hidden lg:flex">
                <ul class="menu text-lg menu-horizontal">
                    <li
                        v-for="(item, index) in menuItems"
                        :key="index"
                    >
                        <a :href="route(item.route)" :active="route().current(item.route)">{{ item.name }}</a>
                    </li>
                    <li
                        v-if="helperService.checkRoles('super-admin,admin')"
                    >
                        <a :href="route('admin.index')" :active="route().current('admin.dashboard')">
                            Administration
                        </a>
                    </li>
                </ul>
            </div>
            <div class="navbar-end gap-1">
                <template v-if="!$page.props.auth?.user">
                    <div class="hidden lg:block space-x-1">
                        <a class="btn btn-ghost" :href="route('login')">Connexion</a>
                        <a class="btn btn-primary" :href="route('register')">Inscription</a>
                    </div>
                    <div class="dropdown dropdown-end block lg:hidden">
                        <div tabindex="0" role="button" class="btn btn-ghost btn-circle">
                            <Icon class="text-3xl" name="person-circle" outline="false" />
                        </div>
                        <div tabindex="0" class="mt-3 z-[1] dropdown-content w-96 bg-base-100 shadow">
                            <ul class="mt-3 z-[1] p-2 shadow menu menu dropdown-content bg-base-100 rounded-box w-52">
                                <li>
                                    <DropdownLink :href="route('login')">
                                        Connexion
                                    </DropdownLink>
                                </li>
                                <li>
                                    <DropdownLink :href="route('register')">
                                        Inscription
                                    </DropdownLink>
                                </li>
                            </ul>
                        </div>
                    </div>
                </template>
                <template v-else>
                    <div class="dropdown dropdown-end">
                        <div tabindex="0" role="button" class="btn btn-ghost btn-circle">
                            <div class="indicator">
                                <Icon size="xl" name="notifications" />
                                <span class="badge badge-sm badge-error indicator-item" v-if="notifications.length">
                                    {{ notifications.length }}
                                </span>
                            </div>
                        </div>
                        <div tabindex="0" class="mt-3 z-[1] dropdown-content w-96 bg-base-100 shadow">
                            <div
                                v-if="notifications.length"
                                v-for="(notification, index) in notifications"
                                :key="index"
                                class="divide-y divide-gray-100 dark:divide-gray-700"
                            >
                                <a :href="route('media.show', notification.data.media.id)" class="flex px-4 py-3 hover:bg-base-300">
                                    <div class="flex-shrink-0">
                                        <img class="rounded-full w-11 h-11" :src="`/storage/${notification.data.media.filename}`" alt="Jese image">
                                    </div>
                                    <div class="w-full ps-3">
                                        <div class="text-sm font-bold mb-1">
                                            {{ notification.data.title }}
                                        </div>
                                        <div class="text-xs text-primary">
                                            {{ notification.created_at }}
                                        </div>
                                    </div>
                                </a>
                            </div>
                            <div v-else>
                                <p class="p-4">Aucune notification à afficher</p>
                            </div>
                            <a href="#" class="block py-2 text-sm font-medium text-center text-gray-900 rounded-b-lg bg-gray-50 hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-white">
                                <div class="inline-flex items-center">
                                    <Icon name="eye" class="mr-1" />
                                    Voir tout
                                </div>
                            </a>
                        </div>
                    </div>
                    <div class="dropdown dropdown-end">
                        <div tabindex="0" role="button" class="btn btn-ghost btn-circle">
                            <Avatar class="w-10" />
                        </div>
                        <ul class="mt-3 z-[1] p-2 shadow menu menu dropdown-content bg-base-100 rounded-box w-52">
                            <li>
                                <DropdownLink :href="route('user.show', $page.props.auth.user.username)">
                                    <Icon name="person" size="lg" /> Voir mon profil
                                </DropdownLink>
                            </li>
                            <li>
                                <DropdownLink :href="route('profile.edit')">
                                    <Icon name="cog" size="lg" /> Paramètres
                                </DropdownLink>
                            </li>
                            <li>
                                <DropdownLink :href="route('logout')" method="post">
                                    <Icon name="log-out" size="lg" /> Déconnexion
                                </DropdownLink>
                            </li>
                        </ul>
                    </div>
                </template>
            </div>
        </div>
    </div>
</template>
