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
            <Text type="subtitle" v-if="title">{{ title }}</Text>
            <Text class="font-bold">
                <slot />
            </Text>
            <template v-if="$slots.action">
                <div class="card-actions justify-end">
                    <slot name="action" />
                </div>
            </template>
        </component>
    </div>
</template>
