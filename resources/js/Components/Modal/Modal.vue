<script setup>
import { computed, onMounted, onUnmounted, watchEffect } from 'vue'

const props = defineProps({
    show: {
        type: Boolean,
        default: false,
    },
    maxWidth: {
        type: String,
        default: '2xl',
    },
    closeable: {
        type: Boolean,
        default: true,
    },
    id: {
        type: String,
        required: true,
    },
    title: {
        type: String,
    },
    isClosable: {
        type: Boolean,
        default: true,
    },
})

const emit = defineEmits(['close'])

watchEffect(
    () => props.show,
    () => {
        if (props.show) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = null
        }
    }
)

const close = () => {
    if (props.closeable) {
        emit('close')
    }
}

const closeOnEscape = (e) => {
    if (e.key === 'Escape' && props.show) {
        close()
    }
}

onMounted(() => document.addEventListener('keydown', closeOnEscape))

onUnmounted(() => {
    document.removeEventListener('keydown', closeOnEscape)
    document.body.style.overflow = null
})

const maxWidthClass = computed(() => {
    return {
        sm: 'sm:max-w-sm',
        md: 'sm:max-w-md',
        lg: 'sm:max-w-lg',
        xl: 'sm:max-w-xl',
        '2xl': 'sm:max-w-2xl',
        '3xl': 'sm:max-w-3xl',
        '4xl': 'sm:max-w-4xl',
    }[props.maxWidth]
})
</script>

<template>
    <Teleport to="body">
        <Transition leave-active-class="duration-200">
            <dialog :id="id" class="modal">
                <div
                    class="modal-box border border-base-200 shadow-lg"
                    :class="[maxWidthClass]"
                >
                    <p v-if="title" class="mb-2 text-lg font-bold">
                        {{ $t(title) }}
                    </p>
                    <template v-if="$slots.description">
                        <p class="py-4">
                            <slot name="description"></slot>
                        </p>
                    </template>
                    <slot />
                </div>
                <form
                    v-if="isClosable"
                    method="dialog"
                    class="modal-backdrop"
                    @click="close"
                >
                    <button>close</button>
                </form>
            </dialog>
        </Transition>
    </Teleport>
</template>
