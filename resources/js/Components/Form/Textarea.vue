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
    value: {
        type: String,
    },
    disabled: {
        type: Boolean,
    },
    placeholder: {
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
    <label class="form-control mb-2">
        <div class="label">
            <span class="label-text">{{ $t(label) }}</span>
        </div>
        <textarea
            class="textarea textarea-bordered textarea-primary h-24 bg-base-300"
            :value="modelValue"
            @input="$emit('update:modelValue', $event.target.value)"
            ref="input"
            :disabled
            :placeholder="$t(placeholder)"
        ></textarea>
    </label>
</template>
