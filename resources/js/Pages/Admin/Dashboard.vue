<script setup>
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue';
import {Head, useForm} from '@inertiajs/vue3';
import DangerButton from "@/Components/DangerButton.vue";
import SecondaryButton from "@/Components/SecondaryButton.vue";
import Section from "@/Components/Section.vue";
import Text from "@/Components/Text.vue";
import AdminDashboardLayout from "@/Pages/Admin/Layout/AdminDashboardLayout.vue";

defineProps({
    users: {
        type: Array
    },
    medias: {
        type: Object
    },
    tags: {
        type: Object
    }
})

const form = useForm({})

const approveMedia = (id) => {
    form.patch(route('media.approve', id), {
        preserveScroll: true,
        // onSuccess: () => closeModal(),
        // onError: () => passwordInput.value.focus(),
        // onFinish: () => form.reset(),
    });
};
const deleteMedia = (id) => {
    form.delete(route('media.destroy', id), {
        preserveScroll: true,
        // onSuccess: () => closeModal(),
        // onError: () => passwordInput.value.focus(),
        // onFinish: () => form.reset(),
    });
};
</script>

<template>
    <Head title="Administration" />

    <AdminDashboardLayout>
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
                    <h5 class="mb-2 text-xl font-normal tracking-tight text-gray-900 dark:text-gray-400">Nombre de medias uploadés approuvés</h5>
                    <p class="text-2xl font-bold text-gray-700 dark:text-white">{{ medias.filter((media) => media.approved).length }}</p>
                </a>
            </div>
            <div class="flex-1 pb-6">
                <a
                    href="#"
                    class="block p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
                >
                    <h5 class="mb-2 text-xl font-normal tracking-tight text-gray-900 dark:text-gray-400">Nombre de medias uploadés en attente</h5>
                    <p class="text-2xl font-bold text-gray-700 dark:text-white">{{ medias.filter((media) => !media.approved).length }}</p>
                </a>
            </div>
            <div class="flex-1 pb-6">
                <a
                    href="#"
                    class="block p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
                >
                    <h5 class="mb-2 text-xl font-normal tracking-tight text-gray-900 dark:text-gray-400">Nombre de tags ajoutés</h5>
                    <p class="text-2xl font-bold text-gray-700 dark:text-white">{{ tags.length }}</p>
                </a>
            </div>
        </div>

        <div class="pb-6">
            <Section class="rounded-b-none">
                {{ medias.filter((media) => !media.approved).length }} médias à approuver
            </Section>
            <div class="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-b-lg">
                <div class="relative overflow-x-auto">
                    <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" class="px-6 py-3">
                                Titre
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Media
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Rôles
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Utilisateur
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Actions
                            </th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr
                            class="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                            v-for="(media, index) in medias.filter((m) => !m.approved)"
                            :key="index"
                        >
                            <th
                                scope="row"
                                class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                            >
                                {{ media.name }}
                            </th>
                            <td class="px-6 py-4">
                                <video controls class="h-full w-full" v-if="media.extension === 'mp4'" :src="`storage/${media.name}`"></video>
                                <img v-else class="w-48" :src="`/storage/${media.filename}`" alt="">
                            </td>
                            <td class="px-6 py-4">
                                {{ media.user.roles.map((role) => role.name).join(', ') }}
                            </td>
                            <td class="px-6 py-4">
                                {{ media.user.name }} ({{ media.user.email }})
                            </td>
                            <td class="px-6 py-4">
                                <SecondaryButton
                                    class="ms-3"
                                    @click="approveMedia(media.id)"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                                    </svg>
                                </SecondaryButton>
                                <DangerButton
                                    class="ms-3"
                                    @click="deleteMedia(media.id)"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </DangerButton>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

        <div class="bg-white dark:bg-gray-800 overflow-hidden shadow-sm rounded-t-lg">
            <div class="p-4 text-gray-900 dark:text-gray-100">
                {{ medias.filter((media) => media.approved).length }} médias approuvés
            </div>
        </div>
        <div class="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-b-lg">
            <div class="relative overflow-x-auto">
                <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" class="px-6 py-3">
                            Titre
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Media
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Rôles
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Utilisateur
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Actions
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr
                        class="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                        v-for="(media, index) in medias.filter((m) => m.approved)"
                        :key="index"
                    >
                        <th
                            scope="row"
                            class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                        >
                            {{ media.name }}
                        </th>
                        <td class="px-6 py-4">
                            <video controls class="h-full w-full" v-if="media.extension === 'mp4'" :src="`storage/${media.name}`"></video>
                            <img v-else :src="`storage/${media.filename}`" alt="">
                        </td>
                        <td class="px-6 py-4">
                            {{ media.user.roles.map((role) => role.name).join(', ') }}
                        </td>
                        <td class="px-6 py-4">
                            {{ media.user.name }} ({{ media.user.email }})
                        </td>
                        <td class="px-6 py-4">
                            <DangerButton
                                class="ms-3"
                                @click="deleteMedia(media.id)"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </DangerButton>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </AdminDashboardLayout>
</template>
