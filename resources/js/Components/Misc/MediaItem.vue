<script setup>
defineProps({
    media: {
        type: Object,
        required: true,
    }
})
</script>

<template>
    <a :href="route('media.show', media.id)">
        <video controls v-if="media.extension === 'mp4'" :src="`/storage/${media.name}`"></video>
        <img
            v-else
            class="w-full h-full object-cover shadow"
            :src="`/storage/${media.filename}`"
            :alt="media.name"
            loading="lazy"
        >
    </a>
</template>

<style scoped>

</style>
