<script setup>
import { onMounted, ref } from 'vue'

defineProps({
    modelValue: {
        type: Array,
        required: true,
    },
    label: {
        type: String,
        required: false,
    },
    options: {
        type: Array,
    },
    multiple: {
        type: Boolean,
        required: false,
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
            :multiple="multiple"
            @input="$emit('update:modelValue', $event.target.value)"
            class="select select-bordered select-primary bg-base-300"
            :model-value="modelValue"
        >
            <option value="" :selected="!multiple && !modelValue">
                Choisir la valeur
            </option>
            <option
                v-for="(option, index) in options"
                :key="index"
                :value="option.id"
                :selected="
                    !multiple && modelValue && modelValue[0]?.id === option.id
                "
            >
                {{ option.name }}
            </option>
        </select>
    </label>
</template>
