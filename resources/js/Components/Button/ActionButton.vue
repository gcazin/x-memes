<script setup>
import Icon from 'resources/js/Components/Misc/Icon.vue'
import { computed } from 'vue'

const props = defineProps({
    type: {
        type: String,
        required: true,
    },
})

const iconName = computed(() => {
    return {
        // 'create': 'add',
        edit: 'create',
        show: 'eye',
        delete: 'trash',
    }[props.type]
})
const iconColor = computed(() => {
    return {
        edit: 'info',
        show: 'primary',
        delete: 'error',
    }[props.type]
})
</script>
<template>
    <span
        class="cursor-pointer px-1 transition"
        :class="`hover:text-${iconColor}`"
    >
        <Icon size="2xl" :name="iconName" />
    </span>
</template>
