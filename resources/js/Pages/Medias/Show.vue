<script setup>
import LoadingButton from '@/Components/Elements/Button/LoadingButton.vue'
import Stack from '@/Components/Layout/Stack.vue'
import Avatar from '@/Components/Misc/Avatar.vue'
import Icon from '@/Components/Misc/Icon.vue'
import MediaItem from '@/Components/Misc/MediaItem.vue'
import Tag from '@/Components/Misc/Tag.vue'
import Text from '@/Components/Text.vue'
import PageLayout from '@/Layouts/PageLayout.vue'
import formService from '@/Services/form.service.js'
import { Head, router, useForm, usePage } from '@inertiajs/vue3'
import _ from 'lodash'
import { onMounted } from 'vue'

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

// TODO: put this in the method download directly
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
const auth = page.props.auth?.user

const getRelatedMedias = () => {
    router.visit(route('media.related', props.media.id), {
        only: ['related'],
        preserveState: true,
    })
}

const getTags = () => {
    return _.map(props.media.tags, _.partialRight(_.pick, 'name'))
}
</script>

<template>
    <Head :title="`${media.name} - ${_.map(getTags(), 'name').join(', ')}`" />

    <PageLayout>
        <Stack spacing="2">
            <Text type="subtitle" class="text-3xl">{{ media.name }}</Text>
            <div class="space-x-1">
                <Tag :key="index" v-for="(tag, index) in getTags()">
                    {{ tag.name }}
                </Tag>
            </div>
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
                <div class="flex-1 text-right">
                    <Stack spacing="1">
                        <div class="space-x-1">
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
                                              .includes(
                                                  $page.props.auth.user.id
                                              )
                                            ? 'btn-error'
                                            : ''
                                        : ''
                                "
                            >
                                <Icon size="xl" name="heart" />
                            </button>
                            <LoadingButton
                                @click="downloadItem(media)"
                                :disabled="form.processing || !auth"
                                class="btn btn-circle btn-primary"
                            >
                                <Icon size="xl" name="arrow-down" />
                            </LoadingButton>
                        </div>
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
                    </Stack>
                </div>
            </div>
            <div class="max-w-full">
                <video
                    controls
                    class="mx-auto h-full w-96 rounded-lg shadow"
                    v-if="media.extension === 'mp4'"
                    :src="`/storage/${media.path}`"
                ></video>
                <img
                    v-else
                    class="mx-auto h-96 w-full rounded-lg object-contain"
                    :src="`/storage/${media.path}`"
                    :alt="media.name"
                    loading="lazy"
                />
            </div>

            <div class="mt-8" v-if="related && related.length">
                <Stack>
                    <Text type="subtitle">Images similaires</Text>
                    <div class="grid grid-cols-1 gap-4 lg:grid-cols-4">
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
