<script setup>
import Navbar from "@/Partials/Navbar.vue";
import Toast from "@/Components/Misc/Toast.vue";
import Footer from "@/Partials/Footer.vue";

defineProps({
    title: {
        type: String,
        required: false
    }
})
</script>

<template>
    <div class="min-h-screen bg-base-200">
        <Navbar />

        <!-- Page Heading -->
        <header class="bg-base-300 shadow">
            <div class="max-w-7xl mx-auto py-6">
                <div class="flex">
                    <div class="flex-1 gap-2">
                        <template v-if="$slots.title">
                            <div class="flex gap-2">
                                <h1 class="font-semibold text-2xl leading-tight">
                                    {{ title }}
                                </h1>
                                <slot name="title" />
                            </div>
                        </template>
                        <h1 v-else class="font-semibold text-2xl leading-tight">
                            {{ title }}
                        </h1>
                        <template v-if="$slots.subtitle">
                            <div class="mt-2">
                                <slot name="subtitle" />
                            </div>
                        </template>
                    </div>
                    <div
                        v-if="$page.props.auth.user && $slots.action"
                        class="flex-1 text-right"
                    >
                        <slot name="action" />
                    </div>
                </div>
            </div>
        </header>

        <!-- Page Content -->
        <main class="max-w-7xl mx-auto pt-6">
            <slot />
        </main>

        <Footer />
    </div>

    <Toast />
</template>
