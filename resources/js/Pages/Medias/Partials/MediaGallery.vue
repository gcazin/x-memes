<script setup>
import Text from "@/Components/Text.vue";
import Tag from "@/Components/Tag.vue";
import SecondaryButton from "@/Components/SecondaryButton.vue";
import DangerButton from "@/Components/DangerButton.vue";
import {useForm} from "@inertiajs/vue3";

defineProps({
    medias: {
        type: Object
    },
    numberOfCols: {
        type: Number,
        default: 3
    }
})

const form = useForm({})

const deleteMedia = (id) => {
    form.delete(route('media.destroy', id), {
        preserveScroll: true,
        // onSuccess: () => closeModal(),
        // onError: () => passwordInput.value.focus(),
        // onFinish: () => form.reset(),
    });
};
</script>
<template>
    <div
        v-if="medias.length"
        class="grid grid-cols-1 md:grid-cols-3 gap-4"
        :class="`grid-cols-1 md:grid-cols-${numberOfCols}`"
    >
        <div
            v-for="(media, index) in medias"
            :key="index"
            class="font-semibold text-lg text-gray-800 dark:text-gray-200 leading-tight mt-2">
            <div class="max-w-sm rounded overflow-hidden shadow-lg bg-gray-800">
                <a :href="route('media.show', media.id)">
                    <video class="w-full" controls v-if="media.extension === 'mp4'" :src="`/storage/${media.name}`"></video>
                    <img class="w-full" v-else :src="`/storage/${media.filename}`" alt="">
                </a>
                <div class="px-6 py-4">
                    <Text>{{ media.name }}</Text>
                </div>
                <div class="flex px-6 mb-4 gap-1" v-if="media.tags">
                    <Tag
                        size="xs"
                        v-for="(tag, index) in media.tags.map((tag) => tag.name.en)"
                        :key="index"
                    >
                        {{ tag }}
                    </Tag>
                </div>
                <div class="px-6 pb-2 text-right" @click="deleteMedia(media.id)">
                    <DangerButton>Supprimer</DangerButton>
                </div>
            </div>
        </div>
    </div>
    <div v-else>
        <h2 class="font-semibold text-lg text-gray-800 dark:text-gray-200 leading-tight mt-2">
            Aucune image à afficher
        </h2>
    </div>
</template>
