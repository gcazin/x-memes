<script setup>
import Icon from '@/Components/Misc/Icon.vue'

defineProps({
    item: {
        type: Object,
        required: true,
    },
})
</script>
<template>
    <div
        class="join mx-auto my-6 grid w-1/4 grid-cols-2"
        v-if="item.total > item.per_page"
    >
        <a
            :href="item.prev_page_url"
            class="btn btn-outline join-item btn-neutral"
            :class="{ 'btn-disabled': !item.prev_page_url }"
        >
            <Icon name="chevron-back" />
        </a>
        <a
            class="btn btn-outline join-item btn-neutral"
            :href="item.next_page_url"
            :class="{ 'btn-disabled': !item.next_page_url }"
        >
            <Icon name="chevron-forward" />
        </a>
    </div>
</template>
