<script setup>
import BlobBackground from '@/Components/Misc/BlobBackground.vue'
import Toast from '@/Components/Misc/Toast.vue'
import Text from '@/Components/Text.vue'
import Footer from '@/Partials/Footer.vue'
import Navbar from '@/Partials/Navbar.vue'
import { Head } from '@inertiajs/vue3'

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
</script>

<template>
    <Head :title="title"></Head>

    <div
        class="relative min-h-screen bg-base-100 pb-6"
        style="background: url(/images/background/noise.webp)"
    >
        <div class="relative z-50 bg-base-300 py-2">
            <div class="text-center">
                <Text type="sub">
                    Le site est actuellement au stade
                    <span class="font-bold">d'alpha</span>. Si vous rencontrez
                    des bugs, ou si vous avez une suggestion, contactez-moi sur
                    <a
                        class="link link-secondary font-bold"
                        href="https://x.com/gcazinonx"
                        target="_blank"
                    >
                        @gcazinonx </a
                    >.
                </Text>
            </div>
        </div>
        <Navbar v-if="hasNavbar" />

        <BlobBackground />
        <!-- Page Heading -->
        <header v-if="hasHeader">
            <div class="mx-auto px-4 py-6 lg:w-9/12 lg:px-0">
                <div class="flex">
                    <div class="flex-1 gap-2">
                        <template v-if="$slots.title">
                            <div class="flex gap-2">
                                <h1
                                    class="text-2xl font-semibold leading-tight"
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
