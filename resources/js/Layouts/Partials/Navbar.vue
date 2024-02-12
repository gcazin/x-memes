<script setup>
import DropdownLink from '@/Components/Dropdown/DropdownLink.vue'
import Icon from '@/Components/Misc/Icon.vue'
import Text from '@/Components/Misc/Text.vue'
import Toast from '@/Components/Misc/Toast.vue'
import Avatar from '@/Components/User/Avatar.vue'
import Container from '@/Layouts/Partials/Container.vue'
import LanguageSwitcher from '@/Pages/Profile/Partials/LanguageSwitcher.vue'
import helperService from '@/Services/helper.service.js'
import { usePage } from '@inertiajs/vue3'
import { computed, ref } from 'vue'

const menuItems = [
    {
        icon: 'image',
        route: 'library.image',
        name: 'Images',
    },
    {
        icon: 'video',
        route: 'library.video',
        name: 'Vidéos',
    },
    {
        icon: 'chart-bar',
        route: 'leaderboard',
        name: 'Classement',
    },
    {
        icon: 'dice-four',
        route: 'random',
        name: 'Au hasard',
    },
    {
        icon: 'search',
        route: 'search',
    },
]

const page = usePage()
const showNotification = ref(false)
const messageNotification = ref(null)
const notifications = computed(() => page.props.auth?.notifications)

if (page.props.auth?.user && typeof window !== 'undefined') {
    Echo.private('App.Models.User.' + page.props.auth.user.id).notification(
        (notification) => {
            showNotification.value = true
            messageNotification.value = notification.title
        }
    )
}
</script>
<template>
    <div
        class="sticky top-0 z-50 border-b border-slate-100/5 bg-base-100/40 backdrop-blur-xl"
    >
        <Container>
            <div class="navbar mx-auto px-0">
                <div class="navbar-start">
                    <!-- Hamburger menu only on mobile -->
                    <div class="drawer w-auto">
                        <input
                            id="my-drawer"
                            type="checkbox"
                            class="drawer-toggle"
                        />
                        <div class="drawer-content">
                            <label
                                for="my-drawer"
                                class="btn btn-ghost pl-0 xl:hidden"
                            >
                                <Icon name="bars" size="4xl" />
                            </label>
                        </div>
                        <div class="drawer-side z-50">
                            <label
                                for="my-drawer"
                                aria-label="close sidebar"
                                class="drawer-overlay"
                            ></label>
                            <ul class="menu min-h-full w-60 bg-base-200 p-4">
                                <li
                                    v-for="(item, index) in menuItems"
                                    :key="index"
                                >
                                    <a
                                        :href="route(item.route)"
                                        :active="route().current(item.route)"
                                    >
                                        <Icon :name="item.icon" size="xl" />
                                        <Text v-if="'name' in item">
                                            {{ $t(item.name) }}
                                        </Text>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <!-- Logo and title -->
                    <a :href="route('index')">
                        <div class="flex w-full items-center gap-x-2">
                            <img
                                class="inline w-8 lg:w-12"
                                src="/images/favicon.png"
                                alt="Logo"
                            />
                            <span class="text-lg font-bold xl:text-2xl">
                                X-Memes
                            </span>
                        </div>
                    </a>
                </div>

                <!-- Navbar displayed on desktop -->
                <div class="navbar-center hidden xl:flex">
                    <ul class="menu menu-horizontal text-lg">
                        <li v-for="(item, index) in menuItems" :key="index">
                            <a
                                :href="route(item.route)"
                                :active="route().current(item.route)"
                            >
                                <Icon :name="item.icon" size="xl" />
                                <Text v-if="'name' in item">{{
                                    $t(item.name)
                                }}</Text>
                            </a>
                        </li>
                    </ul>
                </div>

                <div class="navbar-end gap-1">
                    <!-- When the user is not connected -->

                    <LanguageSwitcher />

                    <template v-if="!page.props?.auth?.isConnected">
                        <div class="hidden space-x-1 2xl:block">
                            <a class="btn btn-primary" :href="route('login')">
                                <Text type="xs">{{ $t('Connexion') }}</Text>
                            </a>
                        </div>
                        <div class="dropdown dropdown-end block 2xl:hidden">
                            <div
                                tabindex="0"
                                role="button"
                                class="btn btn-circle btn-ghost"
                            >
                                <Icon
                                    class="text-2xl"
                                    name="user"
                                    :outline="false"
                                />
                            </div>
                            <div
                                tabindex="0"
                                class="dropdown-content z-[1] mt-3 w-96 bg-base-100 shadow"
                            >
                                <ul
                                    class="menu dropdown-content z-[1] mt-3 w-52 rounded-box bg-base-100 p-2 shadow"
                                >
                                    <li>
                                        <DropdownLink :href="route('login')">
                                            <Text>{{ $t('Connexion') }}</Text>
                                        </DropdownLink>
                                    </li>
                                    <li>
                                        <DropdownLink :href="route('register')">
                                            <Text>{{ $t('Inscription') }}</Text>
                                        </DropdownLink>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </template>

                    <!-- When the user is connected -->
                    <template v-else>
                        <!-- Notification icon -->
                        <div class="dropdown dropdown-end">
                            <div
                                tabindex="0"
                                role="button"
                                class="btn btn-circle btn-ghost"
                                aria-labelledby="Notifications"
                            >
                                <div class="indicator">
                                    <Icon size="2xl" name="bell" />
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
                                                    ) ||
                                                    notification.type.includes(
                                                        'NewFollowerNotification'
                                                    )
                                                "
                                                :user="
                                                    notification.data.content
                                                "
                                                class="!w-10"
                                            />
                                            <img
                                                v-else
                                                class="w-10 rounded"
                                                :src="`/storage/${
                                                    notification.data.content
                                                        .thumbnail_path ??
                                                    notification.data.content
                                                        .path
                                                }`"
                                                :alt="notification.data.title"
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
                                        <Text type="sub">
                                            {{
                                                $t(
                                                    'Aucune notification à afficher.'
                                                )
                                            }}
                                        </Text>
                                    </p>
                                </div>
                                <a
                                    :href="route('notification.index')"
                                    class="flex items-center justify-center rounded-b bg-base-300 py-2 text-center hover:bg-base-200"
                                >
                                    <Icon name="eye" class="mr-1" />
                                    <Text type="sub">
                                        {{
                                            $t(
                                                'Voir toutes les notifications (:count)',
                                                { count: notifications.length }
                                            )
                                        }}
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
                                <Avatar
                                    :user="$page.props.auth.user"
                                    size="sm"
                                />
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
                                                    $page.props.auth.user
                                                        .username
                                                )
                                            "
                                        >
                                            <Icon name="user" size="lg" />
                                            <Text type="sub">{{
                                                $t('Voir mon profil')
                                            }}</Text>
                                        </DropdownLink>
                                    </li>
                                    <li
                                        v-if="
                                            helperService.checkRoles(
                                                'super-admin,admin'
                                            )
                                        "
                                    >
                                        <a
                                            :href="
                                                route(
                                                    'filament.admin.pages.dashboard'
                                                )
                                            "
                                        >
                                            <Icon name="constructor" />
                                            <Text>Administration</Text>
                                        </a>
                                    </li>
                                    <li>
                                        <DropdownLink
                                            :href="route('profile.edit')"
                                        >
                                            <Icon name="cog" size="lg" />
                                            <Text type="sub">{{
                                                $t('Paramètres')
                                            }}</Text>
                                        </DropdownLink>
                                    </li>
                                    <li>
                                        <DropdownLink
                                            :href="route('logout')"
                                            method="post"
                                        >
                                            <Icon name="signout" size="lg" />
                                            <Text type="sub">{{
                                                $t('Déconnexion')
                                            }}</Text>
                                        </DropdownLink>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </template>
                </div>
            </div>
        </Container>
    </div>

    <Toast
        v-if="showNotification"
        type="success"
        :message="messageNotification"
    ></Toast>
</template>
