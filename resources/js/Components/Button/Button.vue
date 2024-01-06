<script setup>
const props = defineProps({
    type: {
        type: String,
        default: 'primary',
        required: false,
    },
    outline: {
        type: Boolean,
        default: false,
        required: false,
    },
    size: {
        type: String,
        default: 'md',
        required: false,
    },
    disabled: {
        type: Boolean,
        default: false,
        required: false,
    },
    submit: {
        type: Boolean,
        default: false,
        required: false,
    },
})

const buttonColor = () => {
    return {
        primary: 'btn-primary',
        secondary: 'btn-secondary',
    }[props.type]
}
const buttonSize = () => {
    return {
        lg: 'btn-lg',
        md: '',
        sm: 'btn-sm',
    }[props.size]
}
</script>

<template>
    <button
        :type="submit ? 'submit' : 'button'"
        class="btn"
        :class="[
            buttonColor(),
            { 'btn-outline': outline, 'btn-disabled': disabled },
            buttonSize(),
        ]"
    >
        <slot />
    </button>
</template>
