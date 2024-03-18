<script setup>
import PageLayout from '@/Layouts/PageLayout.vue'
import { marked } from 'marked'
import Text from '@/Components/Misc/Text.vue'
import Stack from '@/Layouts/Partials/Stack.vue'
import Container from '@/Layouts/Partials/Container.vue'
import { onMounted, ref } from 'vue'
import Avatar from '@/Components/User/Avatar.vue'
import Icon from '@/Components/Misc/Icon.vue'

defineProps({
    post: {
        type: Object,
    }
})

onMounted(() => {
    hljs.highlightAll()
    tableOfContents()
})

const summary = ref(null)
const renderer = new marked.Renderer();
const linkRenderer = renderer.link;
renderer.link = (href, title, text) => {
    const html = linkRenderer.call(renderer, href, title, text);
    return html.replace(/^<a /, '<a class="link link-primary" target="_blank" rel="nofollow" ');
};
renderer.heading = (text, level, raw) => {
    const escapedText = text.toLowerCase().replace(/[^\w]+/g, '-');
    return `<h${level} id="${escapedText}">
<a href="#${escapedText}"><span class="text-secondary/50">#</span> ${text}</a>
</h${level}>`;
}

const markdown = (markdown) => {
    return marked(markdown, { renderer })
};
</script>

<template>
    <PageLayout>
        <Container>
            <Stack spacing="2">
                <div class="text-sm breadcrumbs !py-0">
                    <ul>
                        <li><a :href="route('index')">Accueil</a></li>
                        <li><a :href="route('post.index')">Blog</a></li>
                        <li>{{ post.title }}</li>
                    </ul>
                </div>
                <Text>{{ post.created_at }} <Text type="sub" class="italic">(modifié {{ post.updated_at }})</Text></Text>
                <Text type="title">{{ post.title }}</Text>
                <a :href="route('user.show', post.user.username)" class="flex items-center gap-2 underline">
                    <div>
                        <Avatar :user="post.user" size="sm" circle />
                    </div>
                    <Text>{{ post.user.username }}</Text>
                </a>
                <div class="pb-4">
                    <img :src="`/storage/${post.image}`" class="w-full rounded-lg" />
                </div>
                <Text v-html="markdown(post.content)" />
                <div class="inline-flex items-center justify-center w-full">
                    <hr class="w-full h-0.5 my-8 border-0 rounded bg-primary-content">
                    <div class="absolute px-4 -translate-x-1/2 left-1/2 bg-gray-900">
                        <Icon name="user" size="3xl" />
                    </div>
                </div>
                <div class="flex items-center mt-8">
                    <div class="flex-1">
                        <Text>Écrit par
                            <a
                                :href="route('user.show', post.user.username)"
                                class="text-primary underline font-bold"
                            >
                                {{ post.user.username }}
                            </a>
                        </Text>
                        <Text class="text-xl text-primary-content">{{ post.user.description }}</Text>
                        <template v-if="post.user.x_username || post.user.github_username">
                            <Text>
                                Suivez {{ post.user.username }} sur:
                            </Text>
                            <ul class="text-lg">
                                <li v-if="post.user.x_username">
                                    <a class="flex items-center gap-2" :href="`https://twitter.com/@${post.user.x_username}`" target="_blank">
                                        X (anciennement Twitter)
                                    </a>
                                </li>
                                <li v-if="post.user.github_username">
                                    <a :href="`https://github.com/${post.user.github_username}`" target="_blank">
                                        GitHub
                                    </a>
                                </li>
                            </ul>
                        </template>
                    </div>
                    <div class="flex-1">
                        <Avatar :user="post.user" size="xl" class="mx-auto" />
                    </div>
                </div>
            </Stack>
        </Container>
    </PageLayout>
</template>

<style scoped>
:deep(p) {
    @apply my-4 leading-relaxed;
}
:deep(ul) {
    @apply my-4;
}
:deep(img):not(:deep(.avatar img)) {
    @apply w-full my-4 rounded-lg;
}
:deep(h1) {
    @apply text-5xl;
}
:deep(h2) {
    @apply text-4xl mb-4;
}
:deep(h3) {
    @apply text-3xl;
}
:deep(strong) {
    @apply text-primary-content;
}
:deep(code) {
    @apply rounded;
}
:deep(blockquote) {
    @apply text-xl italic font-semibold text-center text-primary-content;
}
</style>
