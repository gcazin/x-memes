<script setup>
import { onMounted, ref } from 'vue'

defineProps({
    modelValue: {
        type: String,
        required: true,
    },
    label: {
        type: String,
        required: false,
    },
    type: {
        type: String,
        default: 'text',
    },
    placeholder: {
        type: String,
    },
    helpText: {
        type: String,
    },
})

defineEmits(['update:modelValue'])

const input = ref(null)

onMounted(() => {
    if (input.value.hasAttribute('autofocus')) {
        input.value.focus()
    }
})

defineExpose({ focus: () => input.value.focus() })
</script>
<template>
    <label class="form-control w-full">
        <div v-if="label" class="label">
            <span class="label-text">{{ label }}</span>
        </div>
        <input
            :type="type"
            class="input input-bordered input-primary w-full bg-base-300"
            :class="{ 'file-input file-input-primary w-full': type === 'file' }"
            :value="modelValue"
            @input="$emit('update:modelValue', $event.target.value)"
            ref="input"
            :placeholder="placeholder"
        />
        <div v-if="helpText" class="label ms-auto pb-0">
            <span class="label-text-alt">{{ helpText }}</span>
        </div>
    </label>
</template>
<style></style>
