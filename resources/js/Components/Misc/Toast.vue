<script setup>
import {onBeforeUpdate, onMounted, onUnmounted, onUpdated, reactive, ref, watch} from "vue";
import {usePage} from "@inertiajs/vue3";

let show = ref(false)
/*onUpdated(() => {
    show.value = true
    console.log('ici?')
    setTimeout(() => {
        show.value = false
    }, 2000)
})*/
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
    {{ show }}
    <div class="toast toast-center" v-if="$page.props.flash.status && show">
        <div :class="`alert alert-${$page.props.flash.status.class}`">
            <span>
                {{ $page.props.flash.status.message }}
            </span>
        </div>
    </div>
</template>
