<script setup>
import PageLayout from "@/Layouts/PageLayout.vue";
import MediaGallery from "@/Pages/Medias/Partials/MediaGallery.vue";
import Text from "@/Components/Text.vue";
import Tag from "@/Components/Tag.vue";

defineProps({
    user: {
        type: Object
    },
})
</script>
<template>
    <PageLayout>
        <template #header>
            <div class="mb-4">
                <h1 class="font-semibold text-2xl text-gray-800 dark:text-gray-200 leading-tight">
                    Profil de {{ user.name }}
                </h1>
            </div>
            <div class="flex gap-1">
                <Tag size="sm" v-for="(badge, index) in user.badges" :key="index">
                    {{ badge.name }}
                </Tag>
            </div>
        </template>

        <Text>{{ user.medias.length }} médias postés</Text>

        <MediaGallery :medias="user.medias" number-of-cols="4" />
    </PageLayout>
</template>
