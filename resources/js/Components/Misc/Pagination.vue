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
        class="join grid grid-cols-2 my-6 w-1/4 mx-auto"
        v-if="item.total > item.per_page"
    >
        <a
            :href="item.prev_page_url"
            class="join-item btn btn-neutral btn-outline"
            :class="{ 'btn-disabled': !item.prev_page_url }"
        >
            <Icon name="chevron-back" />
        </a>
        <a
            class="join-item btn btn-neutral btn-outline"
            :href="item.next_page_url"
            :class="{ 'btn-disabled': !item.next_page_url }"
        >
            <Icon name="chevron-forward" />
        </a>
    </div>
</template>
