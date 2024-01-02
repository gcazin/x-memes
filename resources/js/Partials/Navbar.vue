<script setup>
import Avatar from '@/Components/Misc/Avatar.vue'
import DropdownLink from '@/Components/Misc/DropdownLink.vue'
import Icon from '@/Components/Misc/Icon.vue'
import Tag from '@/Components/Misc/Tag.vue'
import Toast from '@/Components/Misc/Toast.vue'
import helperService from '@/Services/helper.service.js'
import { usePage } from '@inertiajs/vue3'
import { computed, ref } from 'vue'

const page = usePage()

const menuItems = [
    {
        icon: 'library',
        route: 'library',
        name: 'Bibliothèque',
    },
    {
        icon: 'people',
        route: 'leaderboard',
        name: 'Classement',
    },
    {
        icon: 'shuffle',
        route: 'random',
        name: 'Au hasard',
    },
    {
        icon: 'search',
        route: 'search',
        name: 'Rechercher',
    },
]

const showNotification = ref(false)
const messageNotification = ref(null)
const notifications = computed(() => {
    return page.props.auth?.notifications
})

if (usePage().props.auth?.user) {
    Echo.private(
        'App.Models.User.' + usePage().props.auth.user.id
    ).notification((notification) => {
        showNotification.value = true
        messageNotification.value = notification.title
    })
}
</script>
<template>
    <div
        class="sticky top-0 z-50 border-b border-slate-100/5 bg-base-100/40 backdrop-blur-xl"
    >
        <div class="navbar mx-auto w-full px-2 lg:w-9/12 lg:px-0">
            <div class="navbar-start">
                <!-- Hamburger menu only on mobile -->
                <div class="dropdown">
                    <div
                        tabindex="0"
                        role="button"
                        class="btn btn-ghost lg:hidden"
                    >
                        <Icon name="menu" size="4xl" />
                    </div>
                    <ul
                        tabindex="0"
                        class="menu dropdown-content menu-sm z-[1] mt-3 w-52 rounded-box bg-base-100 p-2 shadow"
                    >
                        <li v-for="(item, index) in menuItems" :key="index">
                            <a
                                :href="route(item.route)"
                                :active="route().current(item.route)"
                            >
                                <Icon :name="item.icon" size="sm" />
                                {{ item.name }}
                            </a>
                        </li>
                        <li
                            v-if="helperService.checkRoles('super-admin,admin')"
                        >
                            <a
                                :href="route('admin.index')"
                                :active="route().current('admin.dashboard')"
                            >
                                <Icon name="construct" />
                                Administration
                            </a>
                        </li>
                    </ul>
                </div>

                <!-- Logo and title -->
                <a :href="route('index')" class="text-2xl">
                    <div class="flex w-full items-center gap-x-2">
                        <img
                            class="inline hidden w-12 lg:inline"
                            src="/images/favicon.png"
                            alt=""
                        />
                        <span class="text-xl font-bold lg:text-2xl">
                            X-Memes
                            <Tag
                                type="secondary"
                                size="sm"
                                class="hidden align-middle lg:block"
                                >alpha</Tag
                            >
                        </span>
                    </div>
                </a>
            </div>

            <!-- Navbar displayed on desktop -->
            <div class="navbar-center hidden lg:flex">
                <ul class="menu menu-horizontal text-lg">
                    <li v-for="(item, index) in menuItems" :key="index">
                        <a
                            :href="route(item.route)"
                            :active="route().current(item.route)"
                        >
                            <Icon :name="item.icon" size="xl" />
                            {{ item.name }}
                        </a>
                    </li>
                    <li v-if="helperService.checkRoles('super-admin,admin')">
                        <a
                            :href="route('admin.index')"
                            :active="route().current('admin.dashboard')"
                        >
                            <Icon name="construct" />
                            Administration
                        </a>
                    </li>
                </ul>
            </div>

            <div class="navbar-end gap-1">
                <!-- When the user is not connected -->
                <template v-if="!$page.props.auth?.user">
                    <div class="hidden space-x-1 lg:block">
                        <a class="btn btn-ghost" :href="route('login')"
                            >Connexion</a
                        >
                        <a class="btn btn-primary" :href="route('register')"
                            >Inscription</a
                        >
                    </div>
                    <div class="dropdown dropdown-end block lg:hidden">
                        <div
                            tabindex="0"
                            role="button"
                            class="btn btn-circle btn-ghost"
                        >
                            <Icon
                                class="text-3xl"
                                name="person-circle"
                                :outline="false"
                            />
                        </div>
                        <div
                            tabindex="0"
                            class="dropdown-content z-[1] mt-3 w-96 bg-base-100 shadow"
                        >
                            <ul
                                class="menu menu dropdown-content z-[1] mt-3 w-52 rounded-box bg-base-100 p-2 shadow"
                            >
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

                <!-- When the user is not connect -->
                <template v-else>
                    <a
                        tabindex="0"
                        role="button"
                        class="flex items-center lg:hidden"
                        aria-labelledby="Search"
                        :href="route('search')"
                    >
                        <Icon size="xl" name="search" />
                    </a>
                    <div class="dropdown dropdown-end">
                        <div
                            tabindex="0"
                            role="button"
                            class="btn btn-circle btn-ghost"
                            aria-labelledby="Notifications"
                        >
                            <div class="indicator">
                                <Icon size="xl" name="notifications" />
                                <span
                                    class="badge indicator-item badge-error badge-sm"
                                    v-if="notifications.length"
                                >
                                    {{ notifications.length }}
                                </span>
                            </div>
                        </div>
                        <div
                            tabindex="0"
                            class="dropdown-content z-[1] mt-3 w-96 bg-base-100 shadow"
                        >
                            <div
                                v-if="notifications.length"
                                v-for="(
                                    notification, index
                                ) in notifications.slice(0, 5)"
                                :key="index"
                                class="divide-y divide-gray-100 dark:divide-gray-700"
                            >
                                <a
                                    :href="
                                        route(
                                            'media.show',
                                            notification.data.data.id
                                        )
                                    "
                                    class="flex px-4 py-3 hover:bg-base-300"
                                >
                                    <div class="flex-shrink-0">
                                        <img
                                            class="h-11 w-11 rounded-full"
                                            :src="`/storage/${notification.data.data.path}`"
                                            alt="Jese image"
                                        />
                                    </div>
                                    <div class="w-full ps-3">
                                        <div class="mb-1 text-sm font-bold">
                                            {{ notification.data.title }}
                                        </div>
                                        <div class="text-xs text-primary">
                                            {{ notification.created_at }}
                                        </div>
                                    </div>
                                </a>
                            </div>
                            <div v-else>
                                <p class="p-4">
                                    Aucune notification à afficher
                                </p>
                            </div>
                            <a
                                :href="route('notification.index')"
                                class="block rounded-b-lg bg-gray-50 py-2 text-center text-sm font-medium text-gray-900 hover:bg-gray-100 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700"
                            >
                                <div class="inline-flex items-center">
                                    <Icon name="eye" class="mr-1" />
                                    Voir toutes les notifications ({{
                                        notifications.length
                                    }})
                                </div>
                            </a>
                        </div>
                    </div>

                    <!-- Dropdown at the end of the navbar when user is connected -->
                    <div class="dropdown dropdown-end">
                        <div
                            tabindex="0"
                            role="button"
                            class="btn btn-circle btn-ghost"
                        >
                            <Avatar size="sm" />
                        </div>
                        <ul
                            class="menu menu dropdown-content z-[1] mt-3 w-52 rounded-box bg-base-100 p-2 shadow"
                        >
                            <li>
                                <DropdownLink
                                    :href="
                                        route(
                                            'user.show',
                                            $page.props.auth.user.username
                                        )
                                    "
                                >
                                    <Icon name="person" size="lg" /> Voir mon
                                    profil
                                </DropdownLink>
                            </li>
                            <li>
                                <DropdownLink :href="route('profile.edit')">
                                    <Icon name="cog" size="lg" /> Paramètres
                                </DropdownLink>
                            </li>
                            <li>
                                <DropdownLink
                                    :href="route('logout')"
                                    method="post"
                                >
                                    <Icon name="log-out" size="lg" />
                                    Déconnexion
                                </DropdownLink>
                            </li>
                        </ul>
                    </div>
                </template>
            </div>
        </div>
    </div>

    <Toast
        v-if="showNotification"
        type="success"
        :message="messageNotification"
    ></Toast>
</template>
