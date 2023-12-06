<script setup>
import DropdownLink from "@/Components/Misc/DropdownLink.vue";
import {onMounted, ref} from "vue";
import {usePage} from "@inertiajs/vue3";
import helperService from "@/Services/helper.service.js";

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
                        <!--                        <label class="swap swap-rotate" v-if="localStorage && localStorage.getItem('theme')">

                                                    &lt;!&ndash; this hidden checkbox controls the state &ndash;&gt;
                                                    <input type="checkbox" class="theme-controller" value="dark" @click="toggleTheme" />

                                                    &lt;!&ndash; sun icon &ndash;&gt;
                                                    <svg v-if="localStorage.theme === 'dark'" class="swap-on fill-current w-10 h-10" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z"/></svg>

                                                    &lt;!&ndash; moon icon &ndash;&gt;
                                                    <svg v-if="localStorage.theme === 'light'"  class="swap-off fill-current w-10 h-10" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z"/></svg>

                                                </label>-->
                        <details>
                            <summary>{{ $page.props.auth.user.name }}</summary>
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
