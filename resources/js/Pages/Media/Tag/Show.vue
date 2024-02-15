<script setup>
import PageLayout from '@/Layouts/PageLayout.vue'
import Gallery from '@/Pages/Media/Partials/Gallery.vue'
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
        <Gallery :medias="medias" />
    </PageLayout>
</template>

<style scoped></style>
