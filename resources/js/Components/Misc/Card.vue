<script setup>
import Text from '@/Components/Misc/Text.vue'

defineProps({
    title: {
        type: String,
        required: false,
    },
    routeTo: {
        type: String,
        required: false,
    },
    routeParameter: {
        type: String,
        required: false,
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
    <component
        :is="routeTo ? 'a' : 'div'"
        :href="routeTo ? route(routeTo, routeParameter) : null"
        class="card w-full !rounded-lg bg-base-300 shadow"
        :class="{
            'bg-base-300': hasBackground,
            'card-compact': hasMedia,
        }"
    >
        <figure v-if="hasMedia || $slots.media">
            <slot name="media"></slot>
        </figure>
        <div class="card-body">
            <Text type="subtitle" v-if="title">{{ title }}</Text>
            <Text class="font-bold">
                <slot />
            </Text>
            <template v-if="$slots.action">
                <div class="card-actions justify-end">
                    <slot name="action" />
                </div>
            </template>
        </div>
    </component>
</template>
