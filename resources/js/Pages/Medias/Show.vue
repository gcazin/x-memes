<script setup>
import Button from '@/Components/Button/Button.vue'
import FollowButton from '@/Components/Button/FollowButton.vue'
import LoadingButton from '@/Components/Button/LoadingButton.vue'
import InputLabel from '@/Components/Form/InputLabel.vue'
import TextInput from '@/Components/Form/TextInput.vue'
import MediaItem from '@/Components/Media/MediaItem.vue'
import Icon from '@/Components/Misc/Icon.vue'
import Tag from '@/Components/Misc/Tag.vue'
import Text from '@/Components/Misc/Text.vue'
import Modal from '@/Components/Modal/Modal.vue'
import Avatar from '@/Components/User/Avatar.vue'
import RoleBadge from '@/Components/User/RoleBadge.vue'
import PageLayout from '@/Layouts/PageLayout.vue'
import Stack from '@/Layouts/Partials/Stack.vue'
import formService from '@/Services/form.service.js'
import helperService from '@/Services/helper.service.js'
import { Head, useForm, usePage } from '@inertiajs/vue3'
import Multiselect from '@vueform/multiselect'
import saveAs from 'file-saver'
import _ from 'lodash'
import { computed } from 'vue'

const props = defineProps({
    media: {
        type: Object,
    },
    tags: {
        type: Array,
    },
    downloadedFile: {
        type: Array,
    },
    related: {
        type: Array,
    },
})

const page = usePage()
const auth = page.props.auth?.user

const form = useForm({
    name: null,
    tags: [],
    media_id: props.media.id,
})

const downloadItem = async (item) => {
    const response = await axios.get(route('media.download', item.id), {
        responseType: 'blob',
    })

    saveAs(response.data, item.path)
}

const canPerformAction =
    helperService.checkRoles('super-admin', 'admin') ||
    (auth && auth.id === props.media.user_id)

const tagsOptions = computed(() => {
    return props.tags.map((tag) => {
        return {
            value: tag.name,
            label: tag.name,
        }
    })
})

const getTags = () => {
    return _.map(props.media.tags, _.partialRight(_.pick, ['id', 'name']))
}

formService.setForm(form).setRouteName('media')
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
                            <a :href="route('user.show', media.user.username)">
                                <Avatar :user="media.user" />
                            </a>
                        </div>
                        <div class="flex flex-col gap-2">
                            <a :href="route('user.show', media.user.username)">
                                {{ media.user.username }}
                                <RoleBadge
                                    class="!align-text-top"
                                    :user="media.user"
                                />
                            </a>
                            <FollowButton size="sm" :user="media.user">
                                Suivre
                            </FollowButton>
                        </div>
                    </div>
                </div>
                <div class="flex-1 text-right">
                    <Stack spacing="1">
                        <div class="space-x-1">
                            <Button
                                outline
                                circle
                                @click="
                                    formService.handle('like', media, 'get')
                                "
                                :disabled="form.processing || !auth"
                                :type="
                                    auth
                                        ? media.likers
                                              ?.map((liker) => liker.id)
                                              .includes(
                                                  $page.props.auth.user.id
                                              )
                                            ? 'error'
                                            : ''
                                        : ''
                                "
                            >
                                <Icon size="xl" name="heart" />
                            </Button>

                            <LoadingButton
                                @click="downloadItem(media)"
                                :disabled="form.processing || !auth"
                                class="btn btn-circle btn-primary"
                            >
                                <Icon size="xl" name="arrow-down" />
                            </LoadingButton>

                            <Button
                                circle
                                type="info"
                                v-if="canPerformAction"
                                @click="
                                    formService.openModal('editMedia', media)
                                "
                                :disabled="form.processing || !auth"
                            >
                                <Icon size="xl" name="create" />
                            </Button>

                            <Modal
                                :id="`editMediaModal${media.id}`"
                                title="Modification de ton mème"
                            >
                                <Stack>
                                    <TextInput
                                        label="Nouveau titre"
                                        v-model="form.name"
                                    />

                                    <div>
                                        <InputLabel
                                            for="tags"
                                            value="Tags"
                                            class="my-2"
                                        />
                                        <Multiselect
                                            id="tags"
                                            v-model="form.tags"
                                            mode="tags"
                                            :close-on-select="false"
                                            :searchable="true"
                                            :create-option="true"
                                            :options="tagsOptions"
                                        >
                                            <template #noresults>
                                                <div class="p-2">
                                                    <Text type="sub">
                                                        Plus aucun élémént a
                                                        afficher.
                                                    </Text>
                                                </div>
                                            </template>
                                        </Multiselect>
                                        <div class="text-right">
                                            <Text type="xs"
                                                >Les tags seront synchronisés
                                                après modification.</Text
                                            >
                                        </div>
                                    </div>

                                    <LoadingButton
                                        @click="
                                            formService.handle('update', media)
                                        "
                                        :loading="form.processing"
                                    >
                                        Modifier ton mème
                                    </LoadingButton>
                                </Stack>
                            </Modal>

                            <LoadingButton
                                v-if="canPerformAction"
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
                    controlsList="nodownload"
                    oncontextmenu="return false;"
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
                        <template
                            v-for="(related, index) in related"
                            :key="index"
                        >
                            <MediaItem :media="related" />
                        </template>
                    </div>
                </Stack>
            </div>
        </Stack>
    </PageLayout>
</template>

<style>
@import '@vueform/multiselect/themes/tailwind.css';

.multiselect,
.multiselect-tags-search,
.multiselect-dropdown,
.multiselect-no-options,
.multiselect-no-results {
    background: oklch(var(--b3));
}
.multiselect-dropdown {
    border-color: oklch(var(--b2));
    border-radius: var(--rounded-btn, 0.5rem);
}
.multiselect-option.is-pointed {
    background: oklch(var(--p));
    color: oklch(var(--white));
}
.multiselect-no-results {
    color: oklch(var(--white));
}
.multiselect {
    height: 3rem;
    --tw-border-opacity: 1;
    border-color: var(--fallback-p, oklch(var(--p) / var(--tw-border-opacity)));
    border-radius: var(--rounded-btn, 0.5rem);
}
.multiselect-tag {
    background: oklch(var(--p));
}
.multiselect.is-active {
    --tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0
        var(--tw-ring-offset-width) oklch(var(--p) / 0.3);
    --tw-ring-shadow: var(--tw-ring-inset) 0 0 0
        calc(3px + var(--tw-ring-offset-width)) oklch(var(--p) / 0.3);
    box-shadow: var(--tw-ring-offset-shadow), var(--tw-ring-shadow),
        var(--tw-shadow, 0 0 #0000);
    --tw-ring-color: oklch(var(--p) / 0.2);
    --tw-ring-opacity: 0.3;
}
</style>
