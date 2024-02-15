<script setup>
import Gallery from '@/Pages/Media/Partials/Gallery.vue'
import UserLayout from '@/Pages/User/UserLayout.vue'

const props = defineProps({
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
        <Gallery :medias="medias" number-of-cols="4" />
    </UserLayout>
</template>
