<script setup>
import Button from '@/Components/Button/Button.vue'
import LoadingButton from '@/Components/Button/LoadingButton.vue'
import InputLabel from '@/Components/Form/InputLabel.vue'
import TextInput from '@/Components/Form/TextInput.vue'
import MediaItem from '@/Components/Media/MediaItem.vue'
import Icon from '@/Components/Misc/Icon.vue'
import ShouldRegisterModal from '@/Components/Misc/ShouldRegisterModal.vue'
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
import { Head, useForm, usePage } from '@inertiajs/vue3'
import Multiselect from '@vueform/multiselect'
import saveAs from 'file-saver'
import JSConfetti from 'js-confetti'
import moment from 'moment'
import { computed, ref } from 'vue'

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
const loading = ref(false)

const form = useForm({
    name: null,
    tags: [],
})

const downloadItem = async (item) => {
    loading.value = true
    const response = await axios.get(route('media.download', item.id), {
        responseType: 'blob',
    })

    const confetti = new JSConfetti()
    confetti.addConfetti()

    const media = props.media
    const path = `${moment().valueOf()}-${media.name
        .toLowerCase()
        .replaceAll(' ', '-')}-x-memes.${media.extension}`
    saveAs(response.data, path)
    loading.value = false
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

formService.setForm(form).setRouteName('media')
</script>

<template>
    <Head :title="page.props.seo.title" />

    <PageLayout>
        <Stack>
            <div class="flex flex-col gap-2 lg:flex-row lg:items-center">
                <Text type="subtitle" class="text-3xl">{{ media.name }}</Text>
                <div class="space-x-1">
                    <a
                        :key="index"
                        v-for="(tag, index) in media.tags"
                        :href="route('tag.show', tag.name)"
                    >
                        <Tag type="secondary" outline>
                            {{ tag.name }}
                        </Tag>
                    </a>
                </div>
            </div>
            <Stack>
                <div class="flex-1 text-right">
                    <Button
                        @click="downloadItem(media)"
                        :disabled="loading"
                        class="indicator btn-block md:w-max"
                    >
                        <Icon size="xl" name="import" />
                        {{ $t('Télécharger') }}
                        <span
                            v-if="media.download_count > 0"
                            class="badge indicator-item badge-sm"
                        >
                            {{ media.download_count }}
                        </span>
                    </Button>

                    <div v-if="canPerformAction" class="dropdown dropdown-end">
                        <div
                            tabindex="0"
                            role="button"
                            class="btn btn-ghost px-2"
                        >
                            <Icon name="ellipsis-v" size="xl" />
                        </div>
                        <ul
                            tabindex="0"
                            class="menu dropdown-content z-[1] w-52 rounded-box bg-base-100 p-2 shadow"
                        >
                            <li
                                @click="
                                    formService.openModal('editMedia', media)
                                "
                            >
                                <a>
                                    <Icon name="edit" size="xl" />
                                    <Text type="sub">
                                        {{ $t('Modifier') }}
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
                                <a class="font-bold text-error">
                                    <Icon name="trash" size="xl" />
                                    <Text type="sub">
                                        {{ $t('Supprimer') }}
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
                            <TextInput label="Titre" v-model="form.name" />

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
                                                Plus aucun élémént a afficher.
                                            </Text>
                                        </div>
                                    </template>
                                </Multiselect>
                                <div class="text-right">
                                    <Text type="xs">
                                        {{
                                            $t(
                                                'Les tags seront synchronisés après modification.'
                                            )
                                        }}
                                    </Text>
                                </div>
                            </div>

                            <LoadingButton
                                @click="formService.handle('update', media)"
                                :loading="form.processing"
                            >
                                {{ $t('Modifier ton mème') }}
                            </LoadingButton>
                        </Stack>
                    </Modal>
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
                            class="pointer-events-none mx-auto w-full rounded-lg object-contain md:h-96"
                            :src="`/storage/${media.path}`"
                            :alt="media.name"
                            loading="lazy"
                        />
                    </div>

                    <Section>
                        <div class="flex items-center gap-x-4">
                            <div>
                                <a
                                    v-if="media.user"
                                    :href="
                                        route('user.show', media.user.username)
                                    "
                                >
                                    <Avatar :user="media.user" size="md" />
                                </a>
                                <Avatar v-else size="md" />
                            </div>
                            <div class="flex flex-col gap-2">
                                <Text class="font-bold">
                                    Posté par
                                    <a
                                        v-if="media.user"
                                        class="link link-secondary"
                                        :href="
                                            route(
                                                'user.show',
                                                media.user.username
                                            )
                                        "
                                    >
                                        {{ media.user.username }}
                                        <RoleBadge
                                            class="!align-text-top"
                                            :user="media.user"
                                        />
                                    </a>
                                    <span v-else>Anonyme</span>
                                </Text>
                                <Text type="sub">{{ media.created_at }}</Text>
                            </div>
                        </div>
                    </Section>

                    <!-- Comments -->
                    <CommentForm v-if="auth.isConnected" :media />
                    <p v-if="comments.total > 0" class="text-2xl">
                        {{
                            $t('Commentaires (:count)', {
                                count: comments.total,
                            })
                        }}
                    </p>
                    <Section
                        v-else-if="comments.total === 0 && auth.isConnected"
                    >
                        <Text>{{ $t('Sois le premier à commenter !') }}</Text>
                    </Section>
                    <Comments :comments :media />
                    <Pagination :item="comments" />

                    <!-- Related medias -->
                    <div class="pt-8" v-if="related && related.length">
                        <Stack>
                            <Text type="subtitle">{{
                                $t('Images similaires')
                            }}</Text>
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

        <ShouldRegisterModal />
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
