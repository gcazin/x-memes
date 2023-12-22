<script setup>
import PageLayout from '@/Layouts/PageLayout.vue'
import { Head, useForm, usePage, router } from '@inertiajs/vue3'
import Text from '@/Components/Text.vue'
import Tag from '@/Components/Misc/Tag.vue'
import Card from '@/Components/Misc/Card.vue'
import axios from 'axios'
import LoadingButton from '@/Components/Elements/Button/LoadingButton.vue'
import Avatar from '@/Components/Misc/Avatar.vue'
import Stack from '@/Components/Layout/Stack.vue'
import Icon from '@/Components/Misc/Icon.vue'
import formService from '@/Services/form.service.js'
import { onMounted } from 'vue'
import MediaItem from '@/Components/Misc/MediaItem.vue'

const props = defineProps({
    media: {
        type: Object,
    },
    downloaded_file: {
        type: Array,
    },
    related: {
        type: Array,
    },
})

onMounted(() => {
    getRelatedMedias()
})

const form = useForm({
    media_id: props.media.id,
})

const downloadItem = (item) => {
    form.get(route('media.download', form.media_id), {
        onSuccess: (page) => {
            const blob = new Blob([page.props.downloaded_file])
            const link = document.createElement('a')
            link.href = URL.createObjectURL(blob)
            link.download = `${item.name}.${item.extension}`
            link.click()
            URL.revokeObjectURL(link.href)
        },
    })
}

const page = usePage()
const auth = page.auth?.user

const getRelatedMedias = () => {
    router.visit(route('media.related', props.media.id), {
        only: ['related'],
        preserveState: true,
    })
}
</script>

<template>
    <PageLayout>
        <Stack>
            <Text type="subtitle" class="text-3xl">{{ media.name }}</Text>
            <div class="flex items-center">
                <div class="flex-1">
                    <div class="flex items-center gap-x-4">
                        <div class="">
                            <a :href="route('user.show', media.user.username)"
                                ><Avatar :user="media.user"
                            /></a>
                        </div>
                        <div class="flex flex-col">
                            <a
                                :href="route('user.show', media.user.username)"
                                >{{ media.user.username }}</a
                            >
                            <a
                                v-if="auth"
                                class="link-primary font-bold"
                                href=""
                                >Suivre</a
                            >
                        </div>
                    </div>
                </div>
                <div class="space-x-1 flex-1 text-right">
                    <button
                        class="btn btn-circle btn-outline"
                        @click="
                            formService
                                .setForm(form)
                                .setRouteName('media')
                                .handle('like', media, 'get')
                        "
                        :disabled="form.processing || !auth"
                        :class="
                            auth
                                ? media.likers
                                      ?.map((liker) => liker.id)
                                      .includes($page.props.auth.user.id)
                                    ? 'btn-error'
                                    : ''
                                : ''
                        "
                    >
                        <Icon size="xl" name="heart" />
                    </button>
                    <LoadingButton
                        @click="downloadItem(media)"
                        :disabled="form.processing"
                        class="btn btn-circle btn-primary"
                    >
                        <Icon size="xl" name="arrow-down" />
                    </LoadingButton>
                    <Text>
                        {{ media.download_count }} téléchargement{{
                            media.download_count > 1 ? 's' : ''
                        }}
                    </Text>
                    <Text>
                        {{ media.likers.length }} j'aime{{
                            media.likers.length > 1 ? 's' : ''
                        }}
                    </Text>
                </div>
            </div>
            <div class="max-w-full">
                <img
                    class="object-contain mx-auto"
                    :src="`/storage/${media.filename}`"
                    alt=""
                />
            </div>

            <div class="mt-8" v-if="related">
                <Stack>
                    <Text type="subtitle">Images similaires</Text>
                    <div class="grid grid-cols-1 lg:grid-cols-4 gap-4">
                        <MediaItem
                            v-for="(related, index) in related"
                            :key="index"
                            :media="related"
                        />
                    </div>
                </Stack>
            </div>

            <!--            <div class="flex flex-col lg:flex-row gap-4 pb-6">
                            <div class="lg:w-2/4">
                            </div>

                            <Card class="!mb-0">
                                <Text type="subtitle">{{ media.name }}</Text>
                                <Text>
                                    Posté par
                                    <a class="link-primary font-bold" :href="route('user.show', media.user.username)">{{ media.user.username }}</a>
                                    le {{ new Date(media.created_at).toLocaleDateString() }}
                                    à {{ new Date(media.created_at).toLocaleTimeString() }}
                                </Text>

                                <div
                                    class="flex gap-1"
                                >
                                    <Tag
                                        size="sm"
                                        v-for="(tag, index) in media.tags.map((tag) => tag.name.fr)"
                                        :key="index"
                                    >
                                        {{ tag }}
                                    </Tag>
                                </div>
                            </Card>
                        </div>-->
        </Stack>
    </PageLayout>
</template>
