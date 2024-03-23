<script setup>
import Pagination from '@/Components/Table/Pagination.vue'
import PageLayout from '@/Layouts/PageLayout.vue'
import BlogLayout from '@/Pages/Post/Partials/BlogLayout.vue'
import Post from '@/Pages/Post/Partials/Post.vue'
import { marked } from 'marked'

defineProps({
    posts: {
        type: Array,
    },
})

const markdown = (value) => {
    return marked(value)
}
</script>

<template>
    <PageLayout title="Articles">
        <BlogLayout>
            <template v-for="(post, index) in posts.data" :key="index">
                <Post :post />
            </template>
        </BlogLayout>
        <Pagination :item="posts" />
    </PageLayout>
</template>

<style scoped></style>
