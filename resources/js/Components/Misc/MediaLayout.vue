<script setup>
import MediaItem from "@/Components/Misc/MediaItem.vue";

defineProps({
    numberOfCols: {
        type: Number,
        default: 3
    },
    medias: {
        type: Array,
        required: true,
    }
})
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
            class="animate-[pulse_0.5s_ease-in-out]"
        >
            <MediaItem :item="media" />
        </div>
    </div>
    <div v-else>
        Rien a afficher ici pour l'instant...
    </div>
</template>

<style scoped>

</style>
