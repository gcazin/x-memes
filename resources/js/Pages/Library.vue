<script setup>
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue';
import {Head, useForm, usePage} from '@inertiajs/vue3';
import TextInput from "@/Components/TextInput.vue";
import PrimaryButton from "@/Components/PrimaryButton.vue";
import InputError from "@/Components/InputError.vue";
import InputLabel from "@/Components/InputLabel.vue";
import {computed, reactive, ref} from "vue";
import Modal from "@/Components/Modal.vue";
import axios from "axios";
import MediaGallery from "@/Pages/Medias/Partials/MediaGallery.vue";
import Multiselect from '@vueform/multiselect'

defineProps({
    medias: {
        type: Array
    },
    tags: {
        type: Array
    }
})

const page = usePage()

const tagsOptions = computed(() => {
    return page.props.tags.map((tag) => {
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

const creatingMediaModal = ref(false);

const createMediaModal = () => {
    creatingMediaModal.value = true;
};

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
    form.post(route('media.create'), {
        preserveScroll: true,
        onSuccess: () => closeModal(),
        onFinish: () => form.reset(),
    });
};

const deleteTag = (id) => {
    form.delete(route('admin.tag.destroy', id), {
        preserveScroll: true,
        // onSuccess: () => closeModal(),
        // onError: () => passwordInput.value.focus(),
        // onFinish: () => form.reset(),
    });
};

const closeModal = () => {
    creatingMediaModal.value = false;

    form.reset();
};
</script>

<template>
    <Head title="Dashboard" />

    <AuthenticatedLayout>
        <template #header>
            <div class="flex">
                <div class="flex-1">
                    <h1 class="font-semibold text-2xl text-gray-800 dark:text-gray-200 leading-tight">
                        Bibliothèque d'images
                    </h1>
                </div>
                <div class="flex-1 text-right" v-if="$page.props.auth.user">
                    <PrimaryButton @click="createMediaModal">Ajouter un média</PrimaryButton>
                </div>
            </div>
        </template>

        <MediaGallery :medias="medias" />

        <Modal :show="creatingMediaModal" @close="closeModal" max-width="3xl">
            <div class="p-6">
                <h2 class="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4">
                    Ajouter un média
                </h2>

                <form enctype="multipart/form-data" @submit.prevent="addMedia" >
                    <InputLabel for="name" value="Titre" />
                    <TextInput
                        v-model="form.name"
                    />

                    <InputError :message="form.errors.name" />

                    <div class="mt-2">
                        <InputLabel for="name" value="Image" />
                        <input
                            class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                            aria-describedby="user_avatar_help"
                            id="media_id"
                            type="file"
                            @input="handleMedia"
                        >
                    </div>

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

                    <progress v-if="form.progress" :value="form.progress.percentage" max="100">
                        {{ form.progress.percentage }}%
                    </progress>
                    <div v-if="state.foundedImage" class="my-2">
                        <p class="text-white mb-1">1 image similaire a été trouvé</p>
                        <img class="w-80" :src="`/storage/${state.foundedImage.filename}`" alt="">
                    </div>
                    <div class="mt-4">
                        <PrimaryButton :disabled="form.processing || state.foundedImage">
                            {{ state.foundedImage ? `Veuillez réessayer en changeant d'image` : 'Ajouter' }}
                        </PrimaryButton>
                    </div>
                </form>
            </div>
        </Modal>
    </AuthenticatedLayout>
</template>
<style>
@import '@vueform/multiselect/themes/tailwind.css';
</style>
