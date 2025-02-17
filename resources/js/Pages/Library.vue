<script setup>
import Button from '@/Components/Button/Button.vue'
import LoadingButton from '@/Components/Button/LoadingButton.vue'
import InputError from '@/Components/Form/InputError.vue'
import InputLabel from '@/Components/Form/InputLabel.vue'
import TextInput from '@/Components/Form/TextInput.vue'
import Text from '@/Components/Misc/Text.vue'
import Modal from '@/Components/Modal/Modal.vue'
import PageLayout from '@/Layouts/PageLayout.vue'
import Section from '@/Layouts/Partials/Section.vue'
import Stack from '@/Layouts/Partials/Stack.vue'
import Gallery from '@/Pages/Media/Partials/Gallery.vue'
import formService from '@/Services/form.service.js'
import { useForm } from '@inertiajs/vue3'
import Multiselect from '@vueform/multiselect'
import JSConfetti from 'js-confetti'
import { computed, ref } from 'vue'

const props = defineProps({
    title: {
        type: String,
    },
    medias: {
        type: Object,
    },
    tags: {
        type: Array,
    },
    sortBy: {
        type: Array,
    },
    defaultSort: {
        type: String,
    },
    duplicatedImage: {
        type: String,
    },
})

const tagsOptions = computed(() => {
    return props.tags.map((tag) => {
        return {
            value: tag.name,
            label: tag.name,
        }
    })
})

const form = useForm({
    name: null,
    media_id: null,
    tags: [],
})
const defaultProgressLabel = `Upload en cours...`
let progressLabel = defaultProgressLabel
const duplicated = ref(null)
const media_preview_url = ref(null)

const checkIfMediaIsDuplicated = async (event) => {
    form.media_id = event.target.files[0]
    if (form.media_id.type !== 'video/mp4') {
        media_preview_url.value = URL.createObjectURL(form.media_id)
    }
    duplicated.value = null

    if (form.media_id.type !== 'video/mp4') {
        progressLabel = 'Vérification des doublons...'
        form.post(route('media.duplicate', form.media_id), {
            onSuccess: (page) => {
                if (page.props.duplicatedImage) {
                    duplicated.value = page.props.duplicatedImage
                } else {
                    duplicated.value = null
                }
                progressLabel = defaultProgressLabel
            },
        })
    } else {
        progressLabel = defaultProgressLabel
        duplicated.value = null
    }
}

const uploadMedia = () => {
    form.post(route('media.store'), {
        onSuccess: () => {
            formService.closeModal()

            const confetti = new JSConfetti()
            confetti.addConfetti()

            // Can't use form.reset(), why? idk
            form.name = null
            form.media_id = null
            form.tags = []
            duplicated.value = null
        },
    })
}
</script>

<template>
    <PageLayout :title="title">
        <template #action>
            <Button @click="formService.openModal('addMedia')">{{
                $t('Ajouter un mème')
            }}</Button>
        </template>

        <Modal id="addMediaModal" title="Ajouter un mème" max-width="4xl">
            <form enctype="multipart/form-data" @submit.prevent="uploadMedia()">
                <Stack>
                    <div>
                        <TextInput
                            label="Titre"
                            v-model="form.name"
                            help-text="100 caractères maximum."
                            max-length="100"
                            required
                        />
                        <InputError :message="form.errors.name" />
                    </div>

                    <div class="form-control">
                        <Stack>
                            <InputLabel
                                for="file"
                                value="Image / Vidéo"
                                required
                            />
                            <img
                                class="mx-auto h-60 rounded"
                                v-if="media_preview_url"
                                :src="media_preview_url"
                            />
                            <input
                                name="file"
                                type="file"
                                class="file-input file-input-bordered file-input-primary w-full"
                                id="media_id"
                                @input="checkIfMediaIsDuplicated"
                            />
                        </Stack>
                        <div class="label ms-auto pb-0">
                            <span class="label-text-alt">
                                {{ $t('Types de fichier acceptés:') }}
                                <span class="font-bold"
                                    >.mp4, .jpg, .jpeg, .png, .gif, .webp</span
                                >
                                - {{ $t('Taille maximale:') }}
                                <span class="font-bold">25mo</span>
                            </span>
                        </div>
                        <InputError :message="form.errors.media_id" />
                    </div>

                    <div>
                        <InputLabel for="tags" value="Tags" class="my-2" />
                        <Multiselect
                            id="tags"
                            v-model="form.tags"
                            mode="tags"
                            close-on-select
                            searchable
                            :options="tagsOptions"
                            create-tag
                        >
                            <template #noresults>
                                <div class="p-2">
                                    <Text type="sub">
                                        Plus aucun élémént a afficher.
                                    </Text>
                                </div>
                            </template>
                        </Multiselect>
                    </div>
                    <template v-if="duplicated">
                        <div class="flex gap-4">
                            <div>
                                <img
                                    class="mx-auto w-40 rounded-xl"
                                    :src="`/storage/${duplicated}`"
                                    alt=""
                                />
                            </div>
                            <Section class="h-full w-full lg:flex lg:flex-col">
                                <Text class="font-bold text-info">
                                    {{ $t('1 image similaire a été trouvé!') }}
                                </Text>
                                <Text type="sub">
                                    {{
                                        $t(
                                            "S'il s'agit d'une erreur, " +
                                                'tu peux quand même la poster, ' +
                                                'elle sera vérifié dans tout les cas'
                                        )
                                    }}
                                </Text>
                            </Section>
                        </div>
                    </template>
                    <div class="flex flex-col text-center" v-if="form.progress">
                        <Stack>
                            <progress
                                class="progress progress-primary"
                                :value="form.progress.percentage"
                                max="100"
                            ></progress>
                            <Text type="sub">{{ progressLabel }}</Text>
                        </Stack>
                    </div>
                    <LoadingButton
                        class="btn"
                        :class="duplicated ? 'btn-warning' : 'btn-primary'"
                        :loading="form.processing"
                        :disabled="form.processing"
                    >
                        {{ $t(duplicated ? `Poster quand même?` : 'Ajouter') }}
                    </LoadingButton>
                    <div>
                        <Text class="fw-bold text-center">
                            Le mème sera en attente d'approbation par un administrateur avant d'être publié sur le site.
                            Les administrateurs du site se réserve le droit de refuser toute image qui ne serait pas conforme.
                        </Text>
                    </div>
                </Stack>
            </form>
        </Modal>

        <Gallery
            :medias="medias"
            :tags="tags"
            :sort-by="sortBy"
            :default-sort="defaultSort"
        />
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
