<script setup>
import ResponsiveNavLink from "@/Components/ResponsiveNavLink.vue";
import DropdownLink from "@/Components/DropdownLink.vue";
import Dropdown from "@/Components/Dropdown.vue";
import NavLink from "@/Components/NavLink.vue";
import {ref} from "vue";
import {usePage} from "@inertiajs/vue3";
import ApplicationLogo from "@/Components/ApplicationLogo.vue";

const showingNavigationDropdown = ref(false);

const page = usePage()

const checkRoles = ((role) => {
    if (page.props.auth.roles) {
        return page.props.auth.roles.includes(role)
    }
    return false
})

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
        route: 'media.random',
        name: 'Au hasard'
    },
]
</script>
<template>
    <nav class="bg-white dark:bg-gray-800 border-b border-gray-100 dark:border-gray-700">
        <!-- Primary Navigation Menu -->
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex justify-between h-16">
                <div class="flex">
                    <!-- Logo -->
                    <div class="shrink-0 flex items-center">
                        <a :href="route('home')">
                            <ApplicationLogo
                                class="block h-9 w-auto fill-current text-gray-800 dark:text-gray-200"
                            />
                        </a>
                    </div>

                    <!-- Navigation Links -->
                    <div
                        v-for="(item, index) in menuItems"
                        :key="index"
                        class="hidden space-x-8 sm:-my-px sm:ms-10 sm:flex"
                    >
                        <NavLink :href="route(item.route)" :active="route().current(item.route)">
                            {{ item.name }}
                        </NavLink>
                    </div>

                    <!-- Navigation Links -->
                    <div
                        v-if="checkRoles('super-admin')"
                        class="hidden space-x-8 sm:-my-px sm:ms-10 sm:flex"
                    >
                        <NavLink :href="route('admin.index')" :active="route().current('admin.dashboard')">
                            Administration
                        </NavLink>
                    </div>

                    <div v-if="! $page.props.auth.user" class="sm:fixed sm:top-0 sm:right-0 p-6 text-end">
                        <a
                            :href="route('login')"
                            class="font-semibold text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500"
                        >Connexion</a>

                        <a
                            :href="route('register')"
                            class="ms-4 font-semibold text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500"
                        >Inscription</a>
                    </div>

                    <div v-else class="hidden sm:flex sm:items-center sm:ms-6">
                        <!-- Settings Dropdown -->
                        <div class="ms-3 relative">
                            <Dropdown align="right" width="48">
                                <template #trigger>
                                        <span class="inline-flex rounded-md">
                                            <button
                                                type="button"
                                                class="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-800 hover:text-gray-700 dark:hover:text-gray-300 focus:outline-none transition ease-in-out duration-150"
                                            >
                                                <template v-if="$page.props.auth.user">{{ $page.props.auth.user.name }}</template>
                                                <svg
                                                    class="ms-2 -me-0.5 h-4 w-4"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 20 20"
                                                    fill="currentColor"
                                                >
                                                    <path
                                                        fill-rule="evenodd"
                                                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                        clip-rule="evenodd"
                                                    />
                                                </svg>
                                            </button>
                                        </span>
                                </template>

                                <template #content>
                                    <DropdownLink :href="route('profile.edit')">
                                        Mon compte
                                    </DropdownLink>
                                    <DropdownLink :href="route('logout')" method="post" as="button">
                                        Déconnexion
                                    </DropdownLink>
                                </template>
                            </Dropdown>
                        </div>
                    </div>
                </div>

                <!-- Hamburger -->
                <div class="-me-2 flex items-center sm:hidden">
                    <button
                        @click="showingNavigationDropdown = !showingNavigationDropdown"
                        class="inline-flex items-center justify-center p-2 rounded-md text-gray-400 dark:text-gray-500 hover:text-gray-500 dark:hover:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-900 focus:outline-none focus:bg-gray-100 dark:focus:bg-gray-900 focus:text-gray-500 dark:focus:text-gray-400 transition duration-150 ease-in-out"
                    >
                        <svg class="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                            <path
                                :class="{
                                            hidden: showingNavigationDropdown,
                                            'inline-flex': !showingNavigationDropdown,
                                        }"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M4 6h16M4 12h16M4 18h16"
                            />
                            <path
                                :class="{
                                            hidden: !showingNavigationDropdown,
                                            'inline-flex': showingNavigationDropdown,
                                        }"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    </button>
                </div>
            </div>
        </div>

        <!-- Responsive Navigation Menu -->
        <div
            :class="{ block: showingNavigationDropdown, hidden: !showingNavigationDropdown }"
            class="sm:hidden"
        >
            <div
                v-for="(item, index) in menuItems"
                :key="index"
            >
                <ResponsiveNavLink :href="route(item.route)" :active="route().current(item.route)">
                    {{ item.name }}
                </ResponsiveNavLink>
            </div>

            <!-- Responsive Settings Options -->
            <div class="pt-4 pb-1 border-t border-gray-200 dark:border-gray-600">
                <div class="px-4">
                    <div class="font-medium text-base text-gray-800 dark:text-gray-200">
                        <template v-if="$page.props.auth.user">
                            {{ $page.props.auth.user.name }}
                        </template>
                    </div>
                    <div class="font-medium text-sm text-gray-500">
                        <template v-if="$page.props.auth.user">
                            {{ $page.props.auth.user.email }}
                        </template>
                    </div>
                </div>

                <div class="mt-3 space-y-1">
                    <ResponsiveNavLink :href="route('profile.edit')"> Mon compte </ResponsiveNavLink>
                    <ResponsiveNavLink :href="route('logout')" method="post" as="button">
                        Déconnexion
                    </ResponsiveNavLink>
                </div>
            </div>
        </div>
    </nav>
</template>
