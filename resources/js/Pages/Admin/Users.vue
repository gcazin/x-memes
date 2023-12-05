<script setup>
import PageLayout from '@/Layouts/PageLayout.vue';
import {Head, useForm} from '@inertiajs/vue3';
import DangerButton from "@/Components/DangerButton.vue";
import SecondaryButton from "@/Components/SecondaryButton.vue";
import Section from "@/Components/Section.vue";
import Text from "@/Components/Text.vue";
import AdminDashboardLayout from "@/Pages/Admin/Layout/AdminDashboardLayout.vue";
import Table from "@/Pages/Admin/Partials/Table.vue";
import Card from "@/Components/Card.vue";

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

    <AdminDashboardLayout title="Utilisateurs">
        <Card title="Nombres d'utilisateurs" :is-link="false" has-background>
            {{ users.length }}
        </Card>

        <Table
            :headers="['Nom', 'Adresse e-mail', 'Rôles', `Date d'inscription`]"
            :items="users"
            :properties="['name', 'email', 'role', 'created_at']"
            has-action
            has-background
        >
            <template #role="{ roles }">
                {{ roles.map((role) => role.name).join(', ') }}
            </template>
            <template #actions="{ id }">
                    <span
                        class="hover:text-red-500 cursor-pointer text-2xl transition"
                        @click="deleteUser(id)"
                    >
                        <ion-icon name="trash-outline"></ion-icon>
                    </span>
            </template>
        </Table>
    </AdminDashboardLayout>
</template>
