<script setup>
import {useForm} from "@inertiajs/vue3";
import Card from "@/Components/Card.vue";

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
        <Card
            v-for="(media, index) in medias"
            :key="index"
            has-background
            has-media
            :title="media.name"
        >
            <template #media>
                <a :href="route('media.show', media.id)">
                    <video controls v-if="media.extension === 'mp4'" :src="`/storage/${media.name}`"></video>
                    <img v-else :src="`/storage/${media.filename}`" alt="">
                </a>
            </template>
            <div class="card-actions justify-end" v-if="media.tags">
                <div
                    class="badge badge-outline"
                    v-for="(tag, index) in media.tags.map((tag) => tag.name.en)"
                    :key="index"
                >
                    {{ tag }}
                </div>
            </div>
        </Card>
    </div>
    <div v-else>
        <h2 class="font-semibold text-lg text-gray-800 dark:text-gray-200 leading-tight mt-2">
            Aucune image à afficher
        </h2>
    </div>
</template>
