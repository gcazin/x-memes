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
})

const form = useForm({})

const deleteUser = (id) => {
    form.delete(route('user.destroy', id), {
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
        <div class="pb-6">
            <div class="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-b-lg">
                <div class="relative overflow-x-auto">
                    <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" class="px-6 py-3">
                                Nom
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Adresse e-mail
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Rôles
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Date d'inscription
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Actions
                            </th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr
                            class="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                            v-for="(user, index) in users"
                            :key="index"
                        >
                            <th
                                scope="row"
                                class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                            >
                                {{ user.name }}
                            </th>
                            <td class="px-6 py-4">
                                {{ user.email }}
                            </td>
                            <td class="px-6 py-4">
                                {{ user.roles.map((role) => role.name).join(', ') }}
                            </td>
                            <td class="px-6 py-4">
                                {{ user.created_at }}
                            </td>
                            <td class="px-6 py-4">
                                <DangerButton
                                    class="ms-3"
                                    @click="deleteUser(user.id)"
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
    </AdminDashboardLayout>
</template>
