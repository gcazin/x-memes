<script setup>
import BlobBackground from '@/Components/Misc/BlobBackground.vue'
import Toast from '@/Components/Misc/Toast.vue'
import Footer from '@/Partials/Footer.vue'
import Navbar from '@/Partials/Navbar.vue'
import { Head, usePage } from '@inertiajs/vue3'

defineProps({
    title: {
        type: String,
        required: false,
    },
    isFullSize: {
        type: Boolean,
        default: false,
    },
    hasHeader: {
        type: Boolean,
        default: true,
    },
    hasNavbar: {
        type: Boolean,
        default: true,
    },
})

Echo.private('App.Models.User.' + usePage().props.auth.user.id).notification(
    (notification) => {
        console.log(notification)
    }
)
</script>

<template>
    <Head :title="title"></Head>

    <div class="relative min-h-screen bg-base-100">
        <Navbar v-if="hasNavbar" />

        <BlobBackground />
        <!-- Page Heading -->
        <header v-if="hasHeader">
            <div class="mx-auto px-6 py-6 lg:w-9/12 lg:px-0">
                <div class="flex">
                    <div class="flex-1 gap-2">
                        <template v-if="$slots.title">
                            <div class="flex gap-2">
                                <h1
                                    class="text-3xl font-semibold leading-tight"
                                >
                                    {{ title }}
                                </h1>
                                <slot name="title" />
                            </div>
                        </template>
                        <h1 v-else class="text-2xl font-semibold leading-tight">
                            {{ title }}
                        </h1>
                        <template v-if="$slots.subtitle">
                            <div class="mt-2">
                                <slot name="subtitle" />
                            </div>
                        </template>
                    </div>
                    <div
                        v-if="$page.props.auth?.user && $slots.action"
                        class="flex-1 text-right"
                    >
                        <slot name="action" />
                    </div>
                </div>
            </div>
        </header>

        <!-- Page Content -->
        <main
            class="relative"
            :class="isFullSize ? 'w-full' : 'mx-auto px-6 lg:w-9/12 lg:px-0'"
        >
            <slot />
        </main>
    </div>

    <Footer />

    <Toast />
</template>
