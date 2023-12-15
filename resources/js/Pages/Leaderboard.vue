<script setup>
import {Head} from '@inertiajs/vue3';
import Card from "@/Components/Misc/Card.vue";
import Table from "@/Pages/Admin/Partials/Table.vue";
import PageLayout from "@/Layouts/PageLayout.vue";

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
    <PageLayout title="Classement">
        <div class="flex flex-col lg:flex-row gap-2 lg:gap-4 mb-4">
                <Card title="Nombre d'utilisateurs inscrits" :is-link="false">
                    {{ users.length }}
                </Card>
                <Card title="Nombre de médias" :is-link="false">
                    {{ medias.filter((media) => media.approved).length }}
                </Card>
        </div>

        <Table
            :headers="['Rang', `Nom d'utilisateur`, 'Nombre de médias postés']"
            :items="leaderboard"
            :properties="['increment', 'name', 'media_count']"
            has-background
        >
            <template #increment="item">
                <span class="font-bold text-blue-500 whitespace-nowrap dark:text-blue-600">
                    {{ item.key + 1 }}
                </span>
            </template>
            <template #name="{ username }">
                <a :href="route('user.show', username)">{{ username }}</a>
            </template>
        </Table>
    </PageLayout>
</template>
