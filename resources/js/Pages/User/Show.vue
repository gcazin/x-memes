<script setup>
import PageLayout from '@/Layouts/PageLayout.vue'
import MediaGallery from '@/Pages/Medias/Partials/MediaGallery.vue'
import Text from '@/Components/Text.vue'
import Tag from '@/Components/Misc/Tag.vue'
import RoleBadge from '@/Components/Misc/RoleBadge.vue'
import Avatar from '@/Components/Misc/Avatar.vue'
import Section from '@/Components/Layout/Section.vue'
import Navbar from '@/Partials/Navbar.vue'
import { useForm, usePage } from '@inertiajs/vue3'
import Footer from '@/Partials/Footer.vue'
import Icon from '@/Components/Misc/Icon.vue'
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
