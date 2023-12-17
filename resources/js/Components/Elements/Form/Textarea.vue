<script setup>
import {onMounted, ref, watch} from 'vue';

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
    <label class="form-control mb-2">
        <div class="label">
            <span class="label-text">{{ label }}</span>
        </div>
        <textarea
            class="textarea textarea-bordered bg-base-300 h-24"
            :value="modelValue"
            @input="$emit('update:modelValue', $event.target.value)"
            ref="input"
        ></textarea>
    </label>
</template>
