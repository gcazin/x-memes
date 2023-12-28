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
    options: {
        type: Array,
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
        <select
            @input="$emit('update:modelValue', $event.target.value)"
            class="select select-bordered bg-base-300"
            :model-value="modelValue"
        >
            <option
                v-for="(option, index) in options"
                :key="index"
                :value="option.id"
            >
                {{ option.name }}
            </option>
        </select>
    </label>
</template>
