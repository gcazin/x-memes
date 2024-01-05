<script setup>
import MediaGallery from '@/Pages/Medias/Partials/MediaGallery.vue'
import UserLayout from '@/Pages/User/UserLayout.vue'

defineProps({
    user: {
        type: Array,
    },
    medias: {
        type: Array,
    },
})
</script>
<template>
    <UserLayout :user="user" :medias="medias">
        <MediaGallery :medias="medias" />
    </UserLayout>
</template>

<style scoped></style>
