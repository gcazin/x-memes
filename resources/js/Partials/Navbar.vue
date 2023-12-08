<script setup>
import DropdownLink from "@/Components/Misc/DropdownLink.vue";
import {onMounted, ref} from "vue";
import {usePage} from "@inertiajs/vue3";
import helperService from "@/Services/helper.service.js";
import Avatar from "@/Components/Misc/Avatar.vue";
import Icon from "@/Components/Misc/Icon.vue";

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
        <div class="navbar w-9/12 mx-auto px-0">
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
                            v-if="helperService.checkRoles('superadmin,admin')"
                        >
                            <a :href="route('admin.index')" :active="route().current('admin.dashboard')">
                                Administration
                            </a>
                        </li>
                    </ul>
                </div>
                <a :href="route('home')" class="text-2xl">
                    <img class="w-10 inline me-2" src="/storage/misc/favicon.png" alt="">
                    <span class="font-bold">X-Memes</span>
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
                        v-if="helperService.checkRoles('superadmin,admin')"
                    >
                        <a :href="route('admin.index')" :active="route().current('admin.dashboard')">
                            Administration
                        </a>
                    </li>
                </ul>
            </div>
            <div class="navbar-end gap-1">
                <template v-if="!$page.props.auth.user">
                    <a class="btn btn-ghost" :href="route('login')">Connexion</a>
                    <a class="btn btn-primary" :href="route('register')">Inscription</a>
                </template>
                <div v-else class="dropdown dropdown-end">
                    <div tabindex="0" role="button" class="btn btn-ghost btn-circle">
                        <Avatar class="w-10" />
                    </div>
                    <ul class="mt-3 z-[1] p-2 shadow menu menu dropdown-content bg-base-100 rounded-box w-52">
                        <li>
                            <DropdownLink :href="route('user.show', $page.props.auth.user.id)">
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
            </div>
        </div>
    </div>
</template>
