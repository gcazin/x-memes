<script setup>
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue';
import {Head, useForm} from '@inertiajs/vue3';
import TextInput from "@/Components/TextInput.vue";
import PrimaryButton from "@/Components/PrimaryButton.vue";
import InputError from "@/Components/InputError.vue";
import InputLabel from "@/Components/InputLabel.vue";
import {computed} from "vue";
import GuestLayout from "@/Layouts/GuestLayout.vue";
import Card from "@/Components/Card.vue";
import Table from "@/Pages/Admin/Partials/Table.vue";

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
                <Card title="Nombre d'utilisateurs inscrits" :is-link="false">
                    {{ users.length }}
                </Card>
                <Card title="Nombre de médias" :is-link="false">
                    {{ medias.filter((media) => media.approved).length }}
                </Card>
        </div>

        <Table
            :headers="['Rang', 'Pseudo', 'Nombre de médias postés']"
            :items="leaderboard"
            :properties="['increment', 'name', 'media_count']"
        >
            <template #increment="item">
                <span class="font-bold text-blue-500 whitespace-nowrap dark:text-blue-600">
                    {{ item.key + 1 }}
                </span>
            </template>
            <template #name="{ id, name }">
                <a :href="route('user.show', id)">{{ name }}</a>
            </template>
        </Table>
    </AuthenticatedLayout>
</template>
