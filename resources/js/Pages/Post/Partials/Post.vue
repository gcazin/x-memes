<script setup>
import Stack from '@/Layouts/Partials/Stack.vue'
import Avatar from '@/Components/User/Avatar.vue'
import Card from '@/Components/Misc/Card.vue'
import Text from '@/Components/Misc/Text.vue'
import Tag from '@/Components/Misc/Tag.vue'

defineProps({
    post: {
        type: Array,
        required: true,
    }
})
</script>

<template>
    <Card
        :title="post.title"
        route-to="post.show"
        :route-parameter="post.slug"
    >
        <template #media>
            <img :src="`/storage/${post.image}`" class="w-full rounded" />
        </template>
        <Stack>
            <Tag v-if="post.is_draft" type="secondary" outline>brouillon</Tag>
            <Text type="sub" class="line-clamp-3">{{ post.summary }}</Text>
            <div class="flex items-center gap-4">
                <Avatar :user="post.user" size="sm" circle />
                <div>
                    <Text>{{ post.user.username }}</Text>
                    <Text type="xs">{{ post.created_at }}</Text>
                </div>
            </div>
        </Stack>
    </Card>
</template>

<style scoped>

</style>
