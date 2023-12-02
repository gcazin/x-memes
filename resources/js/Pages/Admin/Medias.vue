<script setup>
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue';
import {Head, useForm} from '@inertiajs/vue3';
import DangerButton from "@/Components/DangerButton.vue";
import SecondaryButton from "@/Components/SecondaryButton.vue";
import Section from "@/Components/Section.vue";
import Text from "@/Components/Text.vue";
import AdminDashboardLayout from "@/Pages/Admin/Layout/AdminDashboardLayout.vue";
import Table from "@/Pages/Admin/Partials/Table.vue";

defineProps({
    users: {
        type: Array
    },
    medias: {
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
        <div class="flex mb-4">
            <div class="flex-1">
                <Text type="subtitle">Médias</Text>
            </div>
        </div>

        <Section has-background>
            <div class="mb-2">
                <Text type="subtitle">
                    Médias approuvés ({{ medias.filter((media) => media.approved).length }})
                </Text>
            </div>
            <Table
                :headers="['Titre', 'Media', 'Rôles', 'Utilisateur']"
                :items="medias.filter((m) => m.approved)"
                :properties="['name', 'media', 'role', 'user']"
                has-action
            >
                <template #role="{ user }">
                    {{ user.roles.map((role) => role.name).join(', ') }}
                </template>
                <template #user="{ user }">
                    {{ user.name }} ({{ user.email }})
                </template>
                <template #media="{ extension, filename, name }">
                    <video controls class="h-full w-full" v-if="extension === 'mp4'" :src="`storage/${name}`"></video>
                    <img v-else class="w-40" :src="`/storage/${filename}`" alt="">
                </template>
                <template #actions="{ id }">
                    <span
                        class="hover:text-red-500 cursor-pointer text-2xl transition"
                        @click="deleteMedia(id)"
                    >
                        <ion-icon name="trash-outline"></ion-icon>
                    </span>
                </template>
            </Table>
        </Section>

        <Section has-background>
            <div class="mb-2">
                <Text type="subtitle">
                    Médias en attente ({{ medias.filter((media) => !media.approved).length }})
                </Text>
            </div>
            <Table
                :headers="['Titre', 'Media', 'Rôles', 'Utilisateur']"
                :items="medias.filter((m) => !m.approved)"
                :properties="['name', 'media', 'role', 'user']"
                has-action
            >
                <template #role="{ user }">
                    {{ user.roles.map((role) => role.name).join(', ') }}
                </template>
                <template #user="{ user }">
                    {{ user.name }} ({{ user.email }})
                </template>
                <template #media="{ extension, filename, name }">
                    <video controls class="h-full w-full" v-if="extension === 'mp4'" :src="`storage/${name}`"></video>
                    <img v-else class="w-40" :src="`/storage/${filename}`" alt="">
                </template>
                <template #actions="{ id }">
                    <SecondaryButton
                        class="ms-3"
                        @click="approveMedia(id)"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                        </svg>
                    </SecondaryButton>
                    <DangerButton
                        class="ms-3"
                        @click="deleteMedia(id)"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </DangerButton>
                </template>
            </Table>
        </Section>
    </AdminDashboardLayout>
</template>
