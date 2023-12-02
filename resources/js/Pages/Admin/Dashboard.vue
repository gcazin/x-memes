<script setup>
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue';
import {Head, useForm} from '@inertiajs/vue3';
import DangerButton from "@/Components/DangerButton.vue";
import SecondaryButton from "@/Components/SecondaryButton.vue";
import Section from "@/Components/Section.vue";
import Text from "@/Components/Text.vue";
import AdminDashboardLayout from "@/Pages/Admin/Layout/AdminDashboardLayout.vue";
import Card from "@/Components/Card.vue";
import helperService from "@/Services/helper.service.js";

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
            <Card title="Nombre d'utilisateurs inscrits" route-to="admin.users">
                {{ users.length }}
            </Card>
            <Card title="Nombre de medias uploadés approuvés" route-to="admin.medias">
                {{ medias.filter((media) => media.approved).length }}
            </Card>
            <Card title="Nombre de medias uploadés en attente" route-to="admin.medias">
                {{ medias.filter((media) => !media.approved).length }}
            </Card>
        </div>
        <Card title="Nombre de tags ajoutés" route-to="admin.tags" :is-link="false">
            {{ tags.length }}
        </Card>
    </AdminDashboardLayout>
</template>
