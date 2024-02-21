<script setup>
import Text from '@/Components/Misc/Text.vue'
import Toast from '@/Components/Misc/Toast.vue'
import BlobBackground from '@/Layouts/Partials/BlobBackground.vue'
import Container from '@/Layouts/Partials/Container.vue'
import Footer from '@/Layouts/Partials/Footer.vue'
import Navbar from '@/Layouts/Partials/Navbar.vue'
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
    hasFooter: {
        type: Boolean,
        default: true,
    },
})

const page = usePage()
const props = page.props
</script>

<template>
    <Head>
        <template v-if="props.seo">
            <title>{{ props.seo.title }}</title>

            <!-- Facebook Meta Tags -->
            <meta property="og:url" :content="props.seo.url" />
            <meta property="og:type" :content="props.seo.type" />
            <meta property="og:title" :content="props.seo.title" />
            <meta property="og:description" :content="props.seo.description" />
            <meta property="og:image" :content="props.seo.image" />

            <!-- Twitter Meta Tags -->
            <meta name="twitter:card" content="summary_large_image" />
            <meta property="twitter:domain" content="x-memes.com" />
            <meta property="twitter:url" :content="props.seo.url" />
            <meta name="twitter:title" :content="props.seo.title" />
            <meta name="twitter:description" :content="props.seo.description" />
            <meta name="twitter:image" :content="props.seo.image" />
            <meta
                head-key="description"
                name="description"
                :content="props.seo.description"
            />
        </template>
        {{ props.jsonLD }}
    </Head>

    <div
        class="relative min-h-screen bg-base-100 pb-6"
        style="background: url(/images/background/noise.webp)"
    >
        <div class="relative z-50 bg-base-300 px-2 py-2 lg:px-0">
            <div class="text-center">
                <Text type="sub">
                    {{
                        $t(
                            'X-Memes est disponible en français, anglais et espagnol!'
                        )
                    }}
                </Text>
            </div>
        </div>
        <Navbar v-if="hasNavbar" />

        <BlobBackground />
        <!-- Page Heading -->
        <header v-if="hasHeader">
            <Container class="py-6">
                <div class="flex">
                    <div class="flex-1 gap-2">
                        <template v-if="$slots.title">
                            <h1 class="text-2xl font-semibold leading-tight">
                                {{ $t(title) }}
                            </h1>
                            <slot name="title" />
                        </template>
                        <h1
                            v-else-if="title"
                            class="text-2xl font-semibold leading-tight"
                        >
                            {{ $t(title) }}
                        </h1>
                    </div>
                    <div v-if="$slots.action" class="flex-1 text-right">
                        <slot name="action" />
                    </div>
                </div>
                <template v-if="$slots.subtitle">
                    <slot name="subtitle" />
                </template>
            </Container>
        </header>

        <!-- Page Content -->
        <main class="relative">
            <Container v-if="!isFullSize">
                <slot />
            </Container>
            <div v-else class="w-full">
                <slot />
            </div>
        </main>
    </div>

    <Footer v-if="hasFooter" />

    <Toast />
</template>
