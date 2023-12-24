<script setup>
import PageLayout from '@/Layouts/PageLayout.vue'
import { useForm, usePage } from '@inertiajs/vue3'
import TextInput from '@/Components/Elements/Form/TextInput.vue'
import InputError from '@/Components/Elements/Form/InputError.vue'
import InputLabel from '@/Components/Elements/Form/InputLabel.vue'
import { computed, reactive } from 'vue'
import Modal from '@/Components/Elements/Modal/Modal.vue'
import axios from 'axios'
import MediaGallery from '@/Pages/Medias/Partials/MediaGallery.vue'
import Multiselect from '@vueform/multiselect'
import formService from '@/Services/form.service.js'
import Stack from '@/Components/Layout/Stack.vue'

const props = defineProps({
    medias: {
        type: Array,
    },
    tags: {
        type: Array,
    },
    sortBy: {
        type: Array,
    },
})

const page = usePage()

const tagsOptions = computed(() => {
    return props.tags.map((tag) => {
        return {
            value: tag.name.fr,
            label: tag.name.fr,
        }
    })
})

const form = useForm({
    name: null,
    media_id: null,
    tags: [],
})

const state = reactive({
    foundedImage: null,
})

const handleMedia = (event) => {
    form.media_id = event.target.files[0]

    axios
        .post(
            route('media.duplicate'),
            {
                media_id: form.media_id,
            },
            {
                headers: {
                    'content-type': 'multipart/form-data',
                },
            }
        )
        .then((response) => {
            if (response.data.foundedImage) {
                state.foundedImage = response.data.foundedImage
                return form.reset('media_id')
            } else {
                state.foundedImage = null
            }
        })
        .catch((e) => {
            console.log(e)
        })
}

formService.setForm(form).setRouteName('media')
</script>

<template>
    <PageLayout title="Bibliothèque d'images">
        <template #action>
            <button
                class="btn btn-primary"
                @click="formService.openModal('addMedia')"
            >
                Ajouter un média
            </button>
        </template>

        <MediaGallery :medias="medias" :tags="tags" :sort-by="sortBy" />

        <Modal id="addMediaModal" title="Ajouter un média" max-width="2xl">
            <form
                enctype="multipart/form-data"
                @submit.prevent="formService.handle('store')"
            >
                <Stack>
                    <div>
                        <TextInput
                            label="Titre"
                            v-model="form.name"
                            help-text="25 caractères maximum."
                        />
                        <InputError :message="form.errors.name" />
                    </div>

                    <div>
                        <InputLabel for="name" value="Image" />
                        <input
                            type="file"
                            class="file-input file-input-primary file-input-bordered w-full"
                            id="media_id"
                            @input="handleMedia"
                        />
                        <InputError
                            class="mt-2"
                            :message="form.errors.media_id"
                        />
                    </div>

                    <div>
                        <InputLabel for="tags" value="Tags" class="my-2" />
                        <Multiselect
                            id="tags"
                            v-model="form.tags"
                            mode="tags"
                            :close-on-select="false"
                            :searchable="true"
                            :create-option="true"
                            :options="tagsOptions"
                        />
                    </div>
                    <template v-if="state.foundedImage">
                        <div role="alert" class="alert alert-info">
                            <ion-icon
                                class="text-xl"
                                name="information-outline"
                            ></ion-icon>
                            <span>1 image similaire a été trouvé!</span>
                        </div>
                        <div class="my-2">
                            <img
                                class="w-40 rounded-xl"
                                :src="`/storage/${state.foundedImage.filename}`"
                                alt=""
                            />
                        </div>
                    </template>
                    <button
                        class="btn btn-primary"
                        :disabled="form.processing || state.foundedImage"
                    >
                        <span
                            v-if="form.processing"
                            class="loading loading-spinner"
                        ></span>
                        {{
                            state.foundedImage
                                ? `La poster quand même?`
                                : 'Ajouter'
                        }}
                    </button>
                </Stack>
            </form>
        </Modal>
    </PageLayout>
</template>
<style>
@import '@vueform/multiselect/themes/tailwind.css';

.multiselect,
.multiselect-tags-search,
.multiselect-dropdown,
.multiselect-no-options {
    background: oklch(var(--b3));
}
.multiselect {
    --tw-border-opacity: 1;
    border-color: oklch(var(--bc) / 0.2);
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
