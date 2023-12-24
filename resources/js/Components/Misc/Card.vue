<script setup>
defineProps({
    title: {
        type: String,
        required: false,
    },
    routeTo: {
        type: String,
        required: false,
    },
    isLink: {
        type: Boolean,
        default: true,
    },
    hasBackground: {
        type: Boolean,
        default: false,
    },
    hasMedia: {
        type: Boolean,
        default: false,
    },
})
</script>
<template>
    <div
        class="card w-full !rounded-lg bg-base-300 shadow"
        :class="{
            'bg-base-300': hasBackground,
            'card-compact': hasMedia,
        }"
    >
        <figure v-if="hasMedia">
            <slot name="media"></slot>
        </figure>
        <component
            :is="isLink ? 'a' : 'div'"
            :href="routeTo ? route(routeTo) : null"
            class="card-body"
        >
            <h5 v-if="title" class="card-title">{{ title }}</h5>
            <p class="text-2xl font-bold text-gray-700 dark:text-white">
                <slot />
            </p>
        </component>
    </div>
</template>
