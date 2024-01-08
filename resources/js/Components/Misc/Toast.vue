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
import { computed, ref, watch } from 'vue'

const page = usePage()
const flash = page.props.flash
const show = ref(false)

const closeAlert = () => (show.value = false)

const iconColor = computed(() => {
    return {
        success: 'text-success',
        info: 'text-info',
        error: 'text-error',
    }[props.type ? props.type : flash.status.class]
})

watch(() => {
    if (page.props.flash.status || props.message) {
        show.value = true
        console.log('ici')
        setTimeout(() => {
            show.value = false
        }, 5000)
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
            v-if="(flash.status || message) && show"
            id="toast-success"
            class="fixed bottom-5 right-5 z-50 mb-4 flex max-w-md items-center justify-center rounded-lg bg-base-300 p-4 shadow"
            role="alert"
        >
            <div class="mr-2">
                <Icon name="checkmark-circle" size="2xl" :class="[iconColor]" />
            </div>
            <div class="mr-2">
                <Text type="sub">{{
                    message ? message : flash.status.message
                }}</Text>
            </div>
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
