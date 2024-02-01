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
import Pagination from '@/Components/Table/Pagination.vue'
import Avatar from '@/Components/User/Avatar.vue'
import RoleBadge from '@/Components/User/RoleBadge.vue'
import PageLayout from '@/Layouts/PageLayout.vue'
import Section from '@/Layouts/Partials/Section.vue'
import Stack from '@/Layouts/Partials/Stack.vue'
import CommentForm from '@/Pages/Media/Partials/Comment/CommentForm.vue'
import Comments from '@/Pages/Media/Partials/Comment/Comments.vue'
import formService from '@/Services/form.service.js'
import helperService from '@/Services/helper.service.js'
import { Head, router, useForm, usePage } from '@inertiajs/vue3'
import Multiselect from '@vueform/multiselect'
import saveAs from 'file-saver'
import _ from 'lodash'
import moment from 'moment'
import { computed } from 'vue'

const props = defineProps({
    media: {
        type: Object,
    },
    tags: {
        type: Array,
    },
    comments: {
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
const auth = page.props.auth

const form = useForm({
    name: null,
    tags: [],
})

const downloadItem = async (item) => {
    if (!auth.isConnected) {
        router.visit(route('login'))
    }

    const response = await axios.get(route('media.download', item.id), {
        responseType: 'blob',
    })

    const media = props.media
    const path = `${moment().valueOf()}-${media.name
        .toLowerCase()
        .replaceAll(' ', '-')}-x-memes.${media.extension}`
    saveAs(response.data, path)
}

const canPerformAction =
    helperService.checkRoles('super-admin', 'admin') ||
    (auth && auth?.user?.id === props.media.user_id)

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
    {{ props.seo }}
    <Head :title="`${media.name} - ${_.map(getTags(), 'name').join(', ')}`" />

    <PageLayout>
        <Stack>
            <Text type="subtitle" class="text-3xl">{{ media.name }}</Text>
            <div class="space-x-1">
                <Tag :key="index" v-for="(tag, index) in getTags()" outline>
                    {{ tag.name }}
                </Tag>
            </div>
            <Stack>
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
                            <div class="space-x-2">
                                <div class="indicator">
                                <span class="indicator-item badge badge-sm badge-secondary">
                                    {{ media.likers.length }}
                                </span>
                                    <Button
                                        outline
                                        circle
                                        @click="
                                    formService.handle('like', media, 'get')
                                "
                                        :type="
                                    auth.isConnected
                                        ? media.likers
                                              ?.map((liker) => liker.id)
                                              .includes(auth.user.id)
                                            ? 'error'
                                            : ''
                                        : ''
                                "
                                    >
                                        <Icon size="xl" name="heart" />
                                    </Button>
                                </div>

                                <div class="indicator">
                                <span class="indicator-item badge badge-sm badge-secondary">
                                    {{ media.download_count }}
                                </span>
                                    <LoadingButton
                                        @click="downloadItem(media)"
                                        class="btn btn-circle btn-primary"
                                    >
                                        <Icon size="xl" name="import" />
                                    </LoadingButton>
                                </div>

                                <div v-if="canPerformAction" class="dropdown dropdown-end">
                                    <div tabindex="0" role="button" class="btn px-2 btn-ghost">
                                        <Icon name="ellipsis-v" size="xl" />
                                    </div>
                                    <ul tabindex="0" class="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                                        <li
                                            @click="formService.openModal('editMedia', media)"
                                        >
                                            <a>
                                                <Text type="sub">
                                                    <Icon name="edit" size="xl" />
                                                    Modifier
                                                </Text>
                                            </a>
                                        </li>
                                        <li
                                            @click="
                                    formService
                                        .setForm(form)
                                        .setRouteName('media')
                                        .handle('destroy', media)
                                "
                                        >
                                            <a class="text-error font-bold">
                                                <Text type="sub">
                                                    <Icon name="trash" size="xl" />
                                                    Supprimer
                                                </Text>
                                            </a>
                                        </li>
                                    </ul>
                                </div>

                                <Modal
                                    v-if="canPerformAction"
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
                            </div>
                        </Stack>
                    </div>
                </div>
                <Stack>
                    <div class="max-w-full">
                        <video
                            v-if="media.extension === 'mp4'"
                            controlsList="nodownload"
                            oncontextmenu="return false;"
                            controls
                            class="mx-auto h-full w-96 rounded-lg shadow"
                            :poster="`/storage/${media.thumbnail_path}`"
                            :src="`/storage/${media.path}`"
                        ></video>
                        <img
                            v-else
                            class="pointer-events-none mx-auto h-96 w-full rounded-lg object-contain"
                            :src="`/storage/${media.path}`"
                            :alt="media.name"
                            loading="lazy"
                        />
                    </div>

                    <!-- Comments -->
                    <CommentForm v-if="auth.isConnected" :media />
                    <Text v-if="comments.total > 0" type="subtitle"
                    >Commentaires ({{ comments.total }})</Text
                    >
                    <Section v-else> Aucun commentaire pour l'instant. </Section>
                    <Comments :comments :media />
                    <Pagination :item="comments" />

                    <!-- Related medias -->
                    <div class="mt-8" v-if="related && related.length">
                        <Stack>
                            <Text type="subtitle">Images similaires</Text>
                            <div class="grid grid-cols-1 gap-4 lg:grid-cols-3">
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
            </Stack>
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
