<script setup>
import Gallery from '@/Pages/Media/Partials/Gallery.vue'
import UserLayout from '@/Pages/User/UserLayout.vue'

defineProps({
    user: {
        type: Object,
    },
    medias: {
        type: Array,
    },
})
</script>
<template>
    <UserLayout :user="user" :medias="medias">
        <Gallery :medias="medias" />
    </UserLayout>
</template>

<style scoped></style>
