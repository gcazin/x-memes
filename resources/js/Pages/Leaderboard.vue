<script setup>
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue';
import {Head, useForm} from '@inertiajs/vue3';
import TextInput from "@/Components/TextInput.vue";
import PrimaryButton from "@/Components/PrimaryButton.vue";
import InputError from "@/Components/InputError.vue";
import InputLabel from "@/Components/InputLabel.vue";
import {computed} from "vue";
import GuestLayout from "@/Layouts/GuestLayout.vue";

defineProps({
    leaderboard: {
        type: Array
    },
    users: {
        type: Object
    },
    medias: {
        type: Object
    }
})
</script>

<template>
    <Head title="Dashboard" />

    <AuthenticatedLayout>
        <template #header>
            <h1 class="font-semibold text-2xl text-gray-800 dark:text-gray-200 leading-tight">
                Classement
            </h1>
        </template>

        <div class="flex gap-4">
            <div class="flex-1 pb-6">
                <a
                    href="#"
                    class="block p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
                >
                    <h5 class="mb-2 text-xl font-normal tracking-tight text-gray-900 dark:text-gray-400">Nombre d'utilisateurs inscrits</h5>
                    <p class="text-2xl font-bold text-gray-700 dark:text-white">{{ users.length }}</p>
                </a>
            </div>
            <div class="flex-1 pb-6">
                <a
                    href="#"
                    class="block p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
                >
                    <h5 class="mb-2 text-xl font-normal tracking-tight text-gray-900 dark:text-gray-400">Nombre de medias</h5>
                    <p class="text-2xl font-bold text-gray-700 dark:text-white">{{ medias.filter((media) => media.approved).length }}</p>
                </a>
            </div>
        </div>

        <Section class="dark:bg-gray-900">
            <div class="pb-6">
                <div class="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                    <div class="relative overflow-x-auto">
                        <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" class="px-6 py-3">
                                    Rang
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    Pseudo
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    Nombre de médias postés
                                </th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr
                                class="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                                v-for="(player, index) in leaderboard"
                                :key="index"
                            >
                                <th
                                    scope="row"
                                    class="px-6 py-4 font-bold text-blue-500 whitespace-nowrap dark:text-blue-600"
                                >
                                    {{ index + 1}}
                                </th>
                                <th
                                    scope="row"
                                    class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                >
                                    <a :href="route('user.show', player.id)">{{ player.name }}</a>
                                </th>
                                <th
                                    scope="row"
                                    class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                >
                                    {{ player.media_count }}
                                </th>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </Section>
    </AuthenticatedLayout>
</template>
