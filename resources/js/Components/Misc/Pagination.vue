<script setup>
defineProps({
    item: {
        type: Object,
        required: true,
    }
})
</script>
<template>
    <div class="join grid grid-cols-2 my-6 w-1/2 mx-auto">
        <a
            :href="item.prev_page_url"
            class="join-item btn btn-primary btn-outline"
            :class="{'btn-disabled': ! item.prev_page_url}"
        >
            «
        </a>
        <a
            class="join-item btn btn-primary btn-outline"
            :href="item.next_page_url"
            :class="{'btn-disabled': ! item.next_page_url}"
        >
            »
        </a>
    </div>
</template>
