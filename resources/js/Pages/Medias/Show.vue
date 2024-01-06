<script setup>
import FollowButton from '@/Components/Button/FollowButton.vue'
import LoadingButton from '@/Components/Button/LoadingButton.vue'
import MediaItem from '@/Components/Media/MediaItem.vue'
import Icon from '@/Components/Misc/Icon.vue'
import Tag from '@/Components/Misc/Tag.vue'
import Text from '@/Components/Misc/Text.vue'
import Avatar from '@/Components/User/Avatar.vue'
import PageLayout from '@/Layouts/PageLayout.vue'
import Stack from '@/Layouts/Partials/Stack.vue'
import formService from '@/Services/form.service.js'
import helperService from '@/Services/helper.service.js'
import { Head, router, useForm, usePage } from '@inertiajs/vue3'
import { saveAs } from 'file-saver'
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
const downloadItem = async (item) => {
    const response = await axios.get(route('media.download', item.id), {
        responseType: 'blob',
    })

    saveAs(response.data, item.path)
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
    return _.map(props.media.tags, _.partialRight(_.pick, ['id', 'name']))
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
                            <FollowButton inline :user="media.user"
                                >Suivre</FollowButton
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
                            <LoadingButton
                                v-if="helperService.checkRoles('super-admin')"
                                @click="
                                    formService
                                        .setForm(form)
                                        .setRouteName('media')
                                        .handle('destroy', media)
                                "
                                class="btn btn-circle btn-error"
                            >
                                <Icon size="xl" name="trash" />
                            </LoadingButton>
                        </div>
                        <Text>
                            {{
                                helperService.plural(
                                    media.download_count,
                                    'téléchargement'
                                )
                            }}
                        </Text>
                        <Text>
                            {{
                                helperService.plural(
                                    media.likers.length,
                                    "j'aime"
                                )
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
        </Stack>
    </PageLayout>
</template>
