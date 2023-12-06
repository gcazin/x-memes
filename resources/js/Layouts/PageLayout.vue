<script setup>
import Navbar from "@/Partials/Navbar.vue";
import Toast from "@/Components/Toast.vue";

defineProps({
    title: {
        type: String,
        required: false
    }
})
</script>

<template>
    <div>
        <div class="min-h-screen bg-base-200">
            <Navbar />

            <!-- Page Heading -->
            <header class="bg-base-300 shadow">
                <div class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                    <div class="flex">
                        <div class="flex-1">
                            <h1 class="font-semibold text-2xl text-gray-800 dark:text-gray-200 leading-tight">
                                {{ title }}
                            </h1>
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
            <main>
                <div class="pt-6">
                    <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
                        <slot />
                    </div>
                </div>
            </main>
        </div>
    </div>

    <Toast />
</template>
