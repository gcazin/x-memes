<script setup>
import MediaGallery from '@/Pages/Media/Partials/MediaGallery.vue'
import UserLayout from '@/Pages/User/UserLayout.vue'

const props = defineProps({
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
        <MediaGallery :medias="medias" number-of-cols="4" />
    </UserLayout>
</template>
