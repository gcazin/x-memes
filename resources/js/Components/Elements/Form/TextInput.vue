<script setup>
import { onMounted, ref } from 'vue';

defineProps({
    modelValue: {
        type: String,
        required: true,
    },
    label: {
        type: String,
        required: false
    },
    type: {
        type: String,
        default: 'text'
    }
});

defineEmits(['update:modelValue']);

const input = ref(null);

onMounted(() => {
    if (input.value.hasAttribute('autofocus')) {
        input.value.focus();
    }
});

defineExpose({ focus: () => input.value.focus() });
</script>
<template>
    <label class="form-control w-full mb-2">
        <div class="label">
            <span class="label-text">{{ label }}</span>
        </div>
        <input
            :type="type"
            class="input input-bordered w-full"
            :class="{'file-input file-input-sm w-full': type === 'file'}"
            :value="modelValue"
            @input="$emit('update:modelValue', $event.target.value)"
            ref="input"
        />
    </label>
</template>
