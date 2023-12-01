<template>
    <p
        :class="{
          'text-blue-500 font-bold pb-2 uppercase': type === 'heading',
          'text-3xl lg:text-4xl font-bold leading-tight pb-2 dark:text-white': type === 'title',
          'text-2xl leading-tight text-gray-700 dark:text-gray-300 pb-2': type === 'subtitle',
          'text-lg leading-loose text-gray-800 dark:text-gray-200 pb-2': type === 'text',
        }"
    >
        <slot></slot>
    </p>
</template>

<script setup>

defineProps({
    type: {
        type: String,
        default: 'text'
    }
})
</script>

<style scoped>

</style>
