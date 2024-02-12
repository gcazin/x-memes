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
    circle: {
        type: Boolean,
        default: false,
        required: false,
    },
    ghost: {
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
        error: 'btn-error',
        info: 'btn-info',
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
            {
                'btn-outline': outline,
                'btn-disabled': disabled,
                'btn-circle': circle,
                'btn-ghost': ghost,
            },
            buttonSize(),
        ]"
    >
        <slot />
    </button>
</template>
