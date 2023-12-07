<script setup>
import PageLayout from "@/Layouts/PageLayout.vue";
import MediaGallery from "@/Pages/Medias/Partials/MediaGallery.vue";
import Text from "@/Components/Text.vue";
import Tag from "@/Components/Misc/Tag.vue";
import RoleBadge from "@/Components/Misc/RoleBadge.vue";
import Avatar from "@/Components/Misc/Avatar.vue";

defineProps({
    user: {
        type: Object
    },
})
</script>
<template>
    <PageLayout>
        <template #title>
            <Avatar size="xl" />
            Profil de {{ user.name }}
            <RoleBadge />
        </template>
        <template #subtitle>
            <Tag v-for="(badge, index) in user.badges" :key="index">
                {{ badge.name }}
            </Tag>
        </template>


        <Text>{{ user.medias.length }} médias postés</Text>

        <MediaGallery :medias="user.medias" number-of-cols="4" />
    </PageLayout>
</template>
