<script setup>
import Icon from '@/Components/Misc/Icon.vue'
import Tag from '@/Components/Misc/Tag.vue'
import Text from '@/Components/Misc/Text.vue'
import Avatar from '@/Components/User/Avatar.vue'
import RoleBadge from '@/Components/User/RoleBadge.vue'
import Stack from '@/Layouts/Partials/Stack.vue'
import formService from '@/Services/form.service.js'
import { useForm, usePage } from '@inertiajs/vue3'
import moment from 'moment'

const props = defineProps({
    media: {
        type: Object,
        required: true,
    },
})

const page = usePage()
const form = useForm({
    media_id: props.media.id,
})

const dateTime = (value) => {
    return moment(value).fromNow()
}
</script>

<template>
    <div>
        <div class="relative">
            <a :href="route('media.show', media.slug)">
                <img
                    class="h-96 w-full rounded-lg object-cover shadow"
                    :src="`/storage/${
                        media.type === 'video'
                            ? media.thumbnail_path
                            : media.path
                    }`"
                    :alt="media.name"
                    loading="lazy"
                />
            </a>
            <div class="absolute inset-x-2 top-1" v-if="media.type === 'video'">
                <Icon name="video" size="3xl" class="text-primary" />
            </div>
            <div
                class="to-slate-900/1 absolute inset-x-0 bottom-0 flex items-end bg-gradient-to-t from-slate-900/80 from-25% to-100% p-4"
            >
                <div class="flex-1">
                    <Stack spacing="2">
                        <Text class="font-bold">{{ media.name }}</Text>
                        <Text type="xs">{{ media.approved_at }}</Text>
                        <div class="space-x-1">
                            <a
                                :href="route('tag.show', tag.name)"
                                v-for="(tag, index) in media.tags"
                                :key="index"
                            >
                                <Tag type="secondary" outline>
                                    {{ tag.name }}
                                </Tag>
                            </a>
                        </div>
                    </Stack>
                </div>
            </div>
        </div>
        <div class="flex items-center pt-2">
            <a
                :href="route('user.show', media.user.username)"
                class="link flex items-center gap-x-2"
            >
                <Avatar size="sm" :user="media.user" />
                <Text type="xs">
                    {{ media.user.username }}
                </Text>
                <RoleBadge :user="media.user" />
            </a>
            <div class="flex-1">
                <div class="flex justify-end gap-x-2">
                    <div
                        class="flex items-center justify-end"
                        v-if="media.likers.length"
                    >
                        <Icon name="heart" size="xl" class="mr-0.5" />
                        <Text type="xs">{{ media.likers.length }}</Text>
                    </div>
                    <div
                        class="flex items-center justify-end"
                        v-if="media.comments_count > 0"
                    >
                        <Icon
                            name="comment-alt-lines"
                            size="xl"
                            class="mr-0.5"
                        />
                        <Text type="xs">{{ media.comments_count }}</Text>
                    </div>
                    <div class="flex items-center justify-end">
                        <Icon name="import" size="xl" class="mr-0.5" />
                        <Text type="xs">{{ media.download_count }}</Text>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped></style>
