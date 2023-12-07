<script setup>
import {useForm} from "@inertiajs/vue3";
import Card from "@/Components/Misc/Card.vue";

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
        >
            <a :href="route('media.show', media.id)">
                <video controls v-if="media.extension === 'mp4'" :src="`/storage/${media.name}`"></video>
                <img v-else class="w-full rounded-lg" :src="`/storage/${media.filename}`" alt="">
            </a>
            <div class="card-actions justify-end" v-if="media.tags">
                <div
                    class="badge badge-outline"
                    v-for="(tag, index) in media.tags.map((tag) => tag.name.en)"
                    :key="index"
                >
                    {{ tag }}
                </div>
            </div>
        </div>
    </div>
    <h2 v-else class="font-semibold text-lg mb-4">
        Aucune image à afficher
    </h2>
</template>
