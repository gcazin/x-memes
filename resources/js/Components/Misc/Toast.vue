<script setup>
import { usePage } from '@inertiajs/vue3'
import { ref, watch } from 'vue'

let show = ref(false)

watch(() => {
    if (usePage().props.flash.status) {
        show.value = true
        setTimeout(() => {
            show.value = false
        }, 4000)
    }
})
</script>
<template>
    <div class="toast toast-center" v-if="$page.props.flash.status && show">
        <div :class="`alert alert-${$page.props.flash.status.class}`">
            <span>
                {{ $page.props.flash.status.message }}
            </span>
        </div>
    </div>
</template>
