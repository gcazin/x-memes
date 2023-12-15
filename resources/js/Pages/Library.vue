<script setup>
import PageLayout from '@/Layouts/PageLayout.vue';
import {Head, useForm, usePage} from '@inertiajs/vue3';
import TextInput from "@/Components/Elements/Form/TextInput.vue";
import InputError from "@/Components/Elements/Form/InputError.vue";
import InputLabel from "@/Components/Elements/Form/InputLabel.vue";
import {computed, reactive, ref} from "vue";
import Modal from "@/Components/Elements/Modal/Modal.vue";
import axios from "axios";
import MediaGallery from "@/Pages/Medias/Partials/MediaGallery.vue";
import Multiselect from '@vueform/multiselect'
import Pagination from "@/Components/Misc/Pagination.vue";

const props = defineProps({
    medias: {
        type: Array
    },
    tags: {
        type: Array
    },
})

const page = usePage()

const tagsOptions = computed(() => {
    return props.tags.map((tag) => {
        return {
            value: tag.name.en,
            label: tag.name.en
        }
    })
})

const form = useForm({
    name: null,
    media_id: null,
    tags: []
})

const state = reactive({
    foundedImage: null,
})

const handleMedia = (event) => {
    form.media_id = event.target.files[0]

    axios.post(route('media.duplicate'), {
        media_id: form.media_id
    }, {
        headers: {
            'content-type': 'multipart/form-data'
        }
    }).then((response) => {
        if (response.data.foundedImage) {
            state.foundedImage = response.data.foundedImage
            return form.reset('media_id')
        } else {
            state.foundedImage = null
        }
    }).catch((e) => {
        console.log(e)
    })
}

const addMedia = () => {
    form.post(route('media.store'), {
        preserveScroll: true,
        onSuccess: () => closeModal(),
        onFinish: () => form.reset(),
    });
};

const closeModal = () => {
    document.querySelector('#addMediaModal').close()
};
</script>

<template>
    <PageLayout title="Bibliothèque d'images">
        <template #action>
            <button class="btn btn-primary" onclick="addMediaModal.showModal()">Ajouter un média</button>
        </template>

        <MediaGallery :medias="medias" />

        <Modal id="addMediaModal" title="Ajouter un média" max-width="3xl">
            <form enctype="multipart/form-data" @submit.prevent="addMedia" >
                <TextInput
                    label="Titre"
                    v-model="form.name"
                />

                <InputError :message="form.errors.name" />

                <InputLabel for="name" value="Image" />
                <input
                    type="file"
                    class="file-input file-input-bordered file-input-sm w-full max-w-xs"
                    id="media_id"
                    @input="handleMedia"
                />

                <InputError class="mt-2" :message="form.errors.media_id" />

                <InputLabel for="tags" value="Tags" class="my-2" />
                <Multiselect
                    id="tags"
                    v-model="form.tags"
                    mode="tags"
                    :close-on-select="false"
                    :searchable="true"
                    :create-option="true"
                    :options="tagsOptions"
                    :classes="{
                            container: 'dark:bg-gray-900 relative mx-auto w-full flex items-center justify-end box-border cursor-pointer border border-gray-900 rounded bg-white text-base leading-snug outline-none',
                            tag: 'bg-blue-500 dark:bg-blue-600 text-white text-sm font-semibold py-0.5 pl-2 rounded mr-1 mb-1 flex items-center whitespace-nowrap min-w-0 rtl:pl-0 rtl:pr-2 rtl:mr-0 rtl:ml-1',
                            containerActive: 'ring ring-blue-500 dark:ring-blue-600 ring-opacity-30',
                            tagsSearch: 'dark:bg-gray-900 text-white absolute inset-0 border-0 outline-none focus:ring-0 appearance-none p-0 text-base font-sans box-border w-full',
                        }"
                />
                <template v-if="state.foundedImage">
                    <div
                        role="alert"
                        class="alert alert-info"
                    >
                        <ion-icon class="text-xl" name="information-outline"></ion-icon>
                        <span>1 image similaire a été trouvé!</span>
                    </div>
                    <div class="my-2">
                        <img class="w-40 rounded-xl" :src="`/storage/${state.foundedImage.filename}`" alt="">
                    </div>
                </template>
                <div class="mt-4">
                    <button class="btn btn-primary" :disabled="form.processing || state.foundedImage">
                        <span v-if="form.processing" class="loading loading-spinner"></span>
                        {{ state.foundedImage ? `La poster quand même?` : 'Ajouter' }}
                    </button>
                </div>
            </form>
        </Modal>
    </PageLayout>
</template>
<style>
@import '@vueform/multiselect/themes/tailwind.css';
</style>
