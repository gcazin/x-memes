<script setup>
import DropdownLink from '@/Components/Dropdown/DropdownLink.vue'
import Icon from '@/Components/Misc/Icon.vue'
import Tag from '@/Components/Misc/Tag.vue'
import Text from '@/Components/Misc/Text.vue'
import Toast from '@/Components/Misc/Toast.vue'
import Avatar from '@/Components/User/Avatar.vue'
import helperService from '@/Services/helper.service.js'
import { usePage } from '@inertiajs/vue3'
import { computed, ref } from 'vue'

const page = usePage()

const menuItems = [
    {
        icon: 'images',
        route: 'library.image',
        name: 'Images',
    },
    {
        icon: 'videocam',
        route: 'library.video',
        name: 'Vidéos',
    },
    {
        icon: 'trending-up',
        route: 'leaderboard',
        name: 'Classement',
    },
    {
        icon: 'dice',
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
                <div class="drawer w-auto">
                    <input
                        id="my-drawer"
                        type="checkbox"
                        class="drawer-toggle"
                    />
                    <div class="drawer-content">
                        <label for="my-drawer" class="btn btn-ghost lg:hidden">
                            <Icon name="menu" size="4xl" />
                        </label>
                    </div>
                    <div class="drawer-side z-50">
                        <label
                            for="my-drawer"
                            aria-label="close sidebar"
                            class="drawer-overlay"
                        ></label>
                        <ul class="menu min-h-full w-60 bg-base-200 p-4">
                            <li v-for="(item, index) in menuItems" :key="index">
                                <a
                                    :href="route(item.route)"
                                    :active="route().current(item.route)"
                                >
                                    <Icon :name="item.icon" size="sm" />
                                    <Text>{{ item.name }}</Text>
                                </a>
                            </li>
                            <li
                                v-if="
                                    helperService.checkRoles(
                                        'super-admin,admin'
                                    )
                                "
                            >
                                <a
                                    :href="route('admin.index')"
                                    :active="route().current('admin.dashboard')"
                                >
                                    <Icon name="construct" />
                                    <Text>Administration</Text>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                <!-- Logo and title -->
                <a :href="route('index')" class="text-2xl">
                    <div class="flex w-full items-center gap-x-2">
                        <img
                            class="inline w-8 lg:w-12"
                            src="/images/favicon.png"
                            alt="Logo"
                        />
                        <span class="text-xl font-bold lg:text-2xl">
                            X-Memes
                            <Tag
                                type="secondary"
                                size="sm"
                                class="hidden align-middle lg:block"
                                >{{ page.props.stage }}</Tag
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

                <!-- When the user is connected -->
                <template v-else>
                    <!-- Search icon -->
                    <a
                        tabindex="0"
                        role="button"
                        class="flex items-center lg:hidden"
                        aria-labelledby="Search"
                        :href="route('search')"
                    >
                        <Icon size="xl" name="search" />
                    </a>
                    <!-- Notification icon -->
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
                            class="dropdown-content z-[1] mt-3 w-80 rounded-b bg-base-100 shadow lg:w-96"
                        >
                            <div
                                v-if="notifications.length"
                                v-for="(
                                    notification, index
                                ) in notifications.slice(0, 5)"
                                :key="index"
                                class="divide-y divide-base-100"
                            >
                                <a
                                    :href="
                                        route(
                                            'notification.show',
                                            notification.id
                                        )
                                    "
                                    class="flex px-4 py-3 hover:bg-base-200"
                                >
                                    <div class="flex-shrink-0">
                                        <Avatar
                                            v-if="
                                                notification.type.includes(
                                                    'NewUserNotification'
                                                )
                                            "
                                            :user="notification.data.content"
                                            class="!w-10"
                                        />
                                        <img
                                            v-else
                                            class="w-10 rounded"
                                            :src="`/storage/${notification.data.content.path}`"
                                            alt="Jese image"
                                        />
                                    </div>
                                    <div class="w-full ps-3">
                                        <div class="mb-1 text-sm font-bold">
                                            {{ notification.data.title }}
                                        </div>
                                        <div class="text-xs text-primary">
                                            {{
                                                notification.formatted_created_at
                                            }}
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
                                class="flex items-center justify-center rounded-b bg-base-300 py-2 text-center hover:bg-base-200"
                            >
                                <Icon name="eye" class="mr-1" />
                                <Text type="xs">
                                    Voir toutes les notifications ({{
                                        notifications.length
                                    }})
                                </Text>
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
                            <Avatar :user="$page.props.auth.user" size="sm" />
                        </div>
                        <div
                            tabindex="0"
                            class="menu dropdown-content z-[1] mt-3 w-52 rounded-box bg-base-100 p-2 shadow"
                        >
                            <ul>
                                <li>
                                    <DropdownLink
                                        :href="
                                            route(
                                                'user.show',
                                                $page.props.auth.user.username
                                            )
                                        "
                                    >
                                        <Icon name="person" size="lg" /> Voir
                                        mon profil
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
