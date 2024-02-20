<script setup>
const props = defineProps({
    type: {
        type: String,
        required: false,
    },
    message: {
        type: String,
        required: false,
    },
})

import Icon from '@/Components/Misc/Icon.vue'
import Text from '@/Components/Misc/Text.vue'
import { usePage } from '@inertiajs/vue3'
import { computed, ref, watchEffect } from 'vue'

const page = usePage()
const flash = page.props.flash
const show = ref(false)

const closeAlert = () => (show.value = false)

const toastColor = computed(() => {
    return {
        success: 'alert-success',
        info: 'alert-info',
        error: 'alert-error',
    }[props.type ? props.type : flash.status.class]
})
const iconName = computed(() => {
    return {
        success: 'check-circle',
        info: 'info-circle',
        error: 'exclamation-triangle',
    }[props.type ? props.type : flash.status.class]
})

watchEffect(() => {
    if (page.props.flash?.status || props.message) {
        show.value = true
        setTimeout(() => {
            show.value = false
        }, 3000)
    }
})
</script>
<template>
    <transition
        enter-from-class="opacity-0"
        enter-active-class="transition duration-300"
        enter-to-class="opacity-100"
        leave-active-class="duration-200 ease-in"
        leave-from-class="opacity-100"
        leave-to-class="transform opacity-0"
    >
        <div
            v-if="show"
            class="alert fixed bottom-5 right-5 z-50 mb-4 flex max-w-md items-center justify-center"
            :class="[toastColor]"
            role="alert"
        >
            <Icon :name="iconName" size="2xl" />
            <Text type="sub">{{ message ? message : flash.status.message }}</Text>
            <button
                type="button"
                class="btn btn-ghost btn-xs ms-auto"
                @click="closeAlert"
                aria-label="Close"
            >
                <span class="sr-only">Fermer</span>
                <Icon name="close" size="xl" />
            </button>
        </div>
    </transition>
</template>
