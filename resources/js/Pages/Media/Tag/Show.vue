<script setup>
import PageLayout from '@/Layouts/PageLayout.vue'
import MediaGallery from '@/Pages/Media/Partials/MediaGallery.vue'
import { Head, usePage } from '@inertiajs/vue3'

const props = defineProps({
    tag: {
        type: String,
    },
    medias: {
        type: Array,
    },
})

const page = usePage()
</script>

<template>
    <Head :title="page.props.seo.title" />

    <PageLayout :title="page.props.seo.title">
        <MediaGallery :medias="medias" />
    </PageLayout>
</template>

<style scoped></style>
