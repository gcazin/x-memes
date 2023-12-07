<script setup>
import DropdownLink from "@/Components/Misc/DropdownLink.vue";
import {onMounted, ref} from "vue";
import {usePage} from "@inertiajs/vue3";
import helperService from "@/Services/helper.service.js";
import Avatar from "@/Components/Misc/Avatar.vue";

const page = usePage()

const menuItems = [
    {
        route: 'home',
        name: 'Bibliothéque'
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
</script>
<template>
    <div class="bg-base-300 shadow">
        <div class="navbar max-w-7xl mx-auto px-0">
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
                <a :href="route('home')" class="text-xl">Memes-library</a>
            </div>
            <div class="navbar-center hidden lg:flex">
                <ul class="menu menu-horizontal px-1">
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
            <div class="navbar-end">
                <ul class="menu menu-horizontal px-1">
                    <template v-if="! $page.props.auth.user" >
                        <li>
                            <a :href="route('login')">Connexion</a>
                        </li>
                        <li>
                            <a :href="route('register')">Inscription</a></li>
                    </template>

                    <li v-else>
                        <details>
                            <summary>
                                <Avatar size="sm" />
                                {{ $page.props.auth.user.name }}
                            </summary>
                            <ul class="p-2">
                                <li>
                                    <DropdownLink :href="route('profile.edit')">
                                        Mon compte
                                    </DropdownLink>
                                </li>
                                <li>
                                    <DropdownLink :href="route('logout')" method="post">
                                        Déconnexion
                                    </DropdownLink>
                                </li>
                            </ul>
                        </details>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>
