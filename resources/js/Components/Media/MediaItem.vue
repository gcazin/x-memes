<script setup>
import Icon from '@/Components/Misc/Icon.vue'
import Text from '@/Components/Misc/Text.vue'
import Avatar from '@/Components/User/Avatar.vue'
import RoleBadge from '@/Components/User/RoleBadge.vue'
import formService from '@/Services/form.service.js'
import { useForm, usePage } from '@inertiajs/vue3'

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
            <div
                class="absolute inset-x-0 bottom-0 flex items-end bg-gradient-to-t from-slate-900/80 from-5% to-transparent p-4"
            >
                <div class="flex-1">
                    <Text class="font-bold">{{ media.name }}</Text>
                    <Text type="xs">publié {{ media.created_at }}</Text>
                </div>
                <div class="flex-1 text-right">
                    <button
                        class="btn btn-circle btn-sm w-10"
                        @click="
                        formService
                            .setForm(form)
                            .setRouteName('media')
                            .handle('like', media, 'get')
                    "
                        :disabled="form.processing || !page.props.auth?.user"
                        :class="
                        page.props.auth?.user
                            ? media.likers
                                  ?.map((liker) => liker.id)
                                  .includes($page.props.auth.user.id)
                                ? 'btn-outline btn-error'
                                : 'btn-ghost'
                            : ''
                    "
                    >
                        <Icon size="xl" name="heart" />
                    </button>
                </div>
            </div>
        </div>
        <div class="flex items-center pt-2">
            <Text
                type="link"
                to="user.show"
                :parameter="media.user.username"
                class="flex items-center gap-x-2"
            >
                <Avatar size="sm" :user="media.user" />
                <span>
                {{ media.user.username }}
            </span>
                <RoleBadge :user="media.user" />
            </Text>
            <div class="flex-1">
                <div class="flex justify-end gap-x-2">
                    <div
                        class="flex items-center justify-end"
                        v-if="media.likers.length"
                    >
                        <Icon name="heart" size="xl" class="mr-0.5" />
                        <Text type="xs">{{ media.likers.length }}</Text>
                    </div>
                    <div class="flex items-center justify-end">
                        <Icon name="download" size="xl" class="mr-0.5" />
                        <Text type="xs">{{ media.download_count }}</Text>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped></style>
